/**
 * ProjectCustomEvent is an events manager
 */
class ProjectCustomEvent {
    constructor() {
        /**
         * @type {Object.<string, CustomEvent>}
         */
        this.events = this.events || {};
    }

    /**
     * @param {string} evtName 
     */
    buildContext(evtName) {
        this.events[evtName] = this.events[evtName] || new CustomEvent(evtName, {detail: {data: null}});
        /**
         * @type HTMLDivElement
         */
        this.hiddenElement = this.hiddenElement || document.createElement("div");
    }

    /**
     * @param {string} evtName 
     * @param {(e: CustomEvent) => void} callback 
     */ 
    add(evtName, callback) {
        this.buildContext(evtName);
        this.hiddenElement.addEventListener(evtName, callback);
    }

    /**
     * @param {string} evtName 
     * @param {(e: CustomEvent) => void} callback 
     */
    remove(evtName, callback) {
        this.buildContext(evtName);
        this.hiddenElement.removeEventListener(evtName, callback);
    }

    /**
     * @param {string} evtName 
     * @param {*} data 
     */
    fire(evtName, data) {
        this.buildContext(evtName);
        this.events[evtName].detail.data = data;
        this.hiddenElement.dispatchEvent(this.events[evtName]);
    }
}