// template for the main form
// will hold the main UI that is not related to the subject
// but it is important as it would hold the form with fields
const mainTemplate = data => `
<div>
    <div class="form">
    </div>
    <pre class="model-state">
    </pre>
</div>
`;

// template for the form
// assist user input. UI that will participate with databinding
const formTemplate = data => `
<div class="form-item"><label>Enter your name: <input type="text" class="name" value="" size="40"/></label></div>
<div class="form-item"><label>Base64 code name: <input type="text" class="output" value="" size="40"/></label></div>
<div class="form-item"><span class="current-time">&nbsp;</span></div>
`;

function dispatcher() {

    const handlers = [];

    return {
        add(handler) {
            if (!handler) {
                throw new Error('Can\'t attach to empty handler');
            }
            handlers.push(handler);

            return function () {
                const index = handlers.indexOf(handler);
                if (~index) {
                    return handlers.splice(index, 1);
                }
                throw new Error('Ohm! Something went wrong with detaching unexisting event handler');
            };
        },

        notify() {
            const args = [].slice.call(arguments, 0);
            for (const handler of handlers) {
                handler.apply(null, args);
            }
        }
    }
}

function initEvents() {
    const args = [].slice.call(arguments, 0);
    const events = {};
    for (const key of args) {
        events[key] = dispatcher();
    }
    return {
        on(eventName, handler) {
            return events[eventName].add(handler);
        },
        trigger(eventName) {
            events[eventName].notify();
        }
    };
}

// keeps tools that usually repeated many times in the code
// and can be extracted into the separate namespace
const utils = {
    // renders HTML from template to UI
    html(el, html) {
        // one line of implementation. For production would not be enough.
        // Looks perfect for our example.
        el.innerHTML = html;
    },
    // locates element to keep on a form object
    // the method is based on the modern Web API
    // with the best practice from jQuery
    el(selector, inst = document) {
        // it is expected that there could be passed null or undefined
        if (!selector) {
            return null;
        }
        // it is expected selector can be a string or element instance
        if ('string' === typeof selector) {
            return inst.querySelector(selector);
        }
        // if selector is instance lets just return it
        return selector;
    },
    // attach and detach event handler to/from DOM element
    // that method will return another function to remove event handler
    // I have a long thought about what would give small code and ended up with this solution
    on(inst, selector, eventName, fn) {
        // makes anonymous function. Smells like a potential memory leak and not convenient to use
        const handler = function (evnt) {
            // there is a catch. With this condition it would be possible to use event bubble feature
            // though, event handler can be attached to the parent element
            // attaching event handlers to parent element will allow to re-render internal html
            //  of the view many times without re-attaching event handlers to child elements
            if (evnt.target.matches(selector)) {
                fn(evnt);
            }
        }
        // definitely it can leak memory
        inst.addEventListener(eventName, handler);
        // Let's fix inconvenience. Lets return another method that would help to deal with detach
        // now the "on" method is going to be used more conveniently. But with certain approach.
        // remove event handler from the event listener element
        return function () {
            inst.removeEventListener(eventName, handler);
        }
    },
    // this is tool to evaluate method
    // if method exists on the object, it will be evaluated
    // to avoid "ifs" in the code implementation
    getResult(inst, getFn) {
        const fnOrAny = getFn && getFn();
        if (typeof fnOrAny === 'function') {
            return fnOrAny.call(inst);
        }
        return fnOrAny;
    }
};

// the first participant
// will read UI and pass data to a model
class FormView {
    // as usual it would keep the most needed part to run Form UI
    // make events, attach event handlers
    constructor(selector) {
        this.el = utils.el(selector);
    }

    getName() {
        return this.name.value;
    }

    setName(val) {
        if (val !== this.name.value) {
            this.name.value = val;
            this.name.dispatchEvent(new Event('input'));
        }
    }

    getOutput() {
        return this.output.value;
    }

    setOutput(val) {
        if (val !== this.output.value) {
            this.output.value = val;
            this.output.dispatchEvent(new Event('input'));
        }
    }

    setCurrentTime(val) {
        if (val != this.currentTime.innerText) {
            this.currentTime.innerText = val;
        }
    }

    setModel(model) {
        this.unbind();
        if (!model) {
            return;
        }
        this.setName(model.prop('name'));
        this.setOutput(model.prop('output'));
        model && this.bind(model);
    }

    // make properties that are needed from the beginning
    // build UI
    initialize() {
        utils.html(this.el, formTemplate({}));
        this.initialize$FormView(this.el);
    }

    // this part will make properties that are part of the UI
    initialize$FormView(el) {
        this.name = utils.el('.name', el);
        this.output = utils.el('.output', el);
        this.currentTime = utils.el('.current-time', el);
    }

    // will bind UI to properties over events
    bind(model) {
        // update data from DOM to model
        this.onInputNameRemove = utils.on(this.el, '.name', 'input', () => model.prop('name', this.getName()));
        this.onInputOutputRemove = utils.on(this.el, '.output', 'input', () => model.prop('output', this.getOutput()));
        // update data from model to DOM
        this.syncNameRemove = model.on('change:name', () => this.setName(model.prop('name')));
        this.syncOutputRemove = model.on('change:output', () => this.setOutput(model.prop('output')));
        this.syncCurrentTimeRemove = model.on('change:time', () => this.setCurrentTime(model.prop('time')));
    }

    // will remove properties form events
    unbind() {
        utils.getResult(this, () => this.onInputNameRemove);
        utils.getResult(this, () => this.onInputOutputRemove);
        utils.getResult(this, () => this.syncNameRemove);
        utils.getResult(this, () => this.syncOutputRemove);
        utils.getResult(this, () => this.syncCurrentTimeRemove);
    }
    // clean up everything what was produced by initialize method
    remove() {
    }
}

// the second participant
// This will hold some busines logic along with databinding
class TimerModel {
    constructor() {
        const { on, trigger } = initEvents(this,
            'change:name',
            'change:output',
            'change:time'
        );
        this.on = on;
        this.trigger = trigger;
        this.state = {
            name: 'initial value',
            output: '',
            time: new Date()
        };
        this.initialize();
    }

    initialize() {
        this.timer = setInterval(() => this.prop('time', new Date()), 1000);
        this.processFormRemove = this.on('change:name', () => this.processForm());
    }

    prop(propName, val) {
        if (arguments.length > 1 && this.state.val !== val) {
            this.state[propName] = val;
            this.trigger('change:' + propName);
        }
        return this.state[propName];
    }

    processForm() {
        setTimeout(() => {
            this.prop('output', btoa(this.prop('name')));
        });
    }

    remove() {
        utils.getResult(this, () => this.processFormRemove);
        clearInterval(this.timer);
    }
}


class App {
    // will keep the most needed part to run an application
    constructor(selector) {
        this.el = utils.el(selector);
    }

    // will make properties that are needed just from the begining
    // but not a part of the constructor
    initialize() {
        utils.html(this.el, mainTemplate({}));
        this.initialize$App(this.el);
        this.form.initialize();
    }

    // will make more properties to initialize
    // can be used several times or just to easy locate when read code
    initialize$App(el) {
        this.form = new FormView(utils.el('.form', el));
        this.modelState = utils.el('.model-state', el);
    }

    // this is helper method.
    // it would show useful information to understand the process
    logModelState(model) {
    }

    // there we will keep stuf related to databinding
    bind(formModel) {
        this.form.setModel(formModel);
    }

    // clean up everything what was produced by initialize method
    remove() {

    }
}

// application entry point
setTimeout(() => {
    // there is no working code yet
    // but the is a clue how it could be used
    // the actual application with "body" element
    const app = new App('body');
    // some models. For this example just one.
    const model = new TimerModel();
    // this is a part to initialize the application
    app.initialize();
    // this is a prat that would give application ability to read input from UI
    app.bind(model);
});