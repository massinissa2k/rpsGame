interface IEvent {
    [key: string]: CustomEvent
}

interface IDetail {
    data: any
}

/**
 * ProjectCustomEvent is an events manager
 */
export default class ProjectCustomEvent {

    private events: IEvent;
    private hiddenElement: HTMLDivElement;

    constructor() {
        this.events = this.events || {};
    }

    buildContext(evtName: string) {
        this.events[evtName] = this.events[evtName] || new CustomEvent<IDetail>(evtName, { detail: { data: null } });
        this.hiddenElement = this.hiddenElement || document.createElement("div");
    }

    add(evtName: string, callback: (e: CustomEvent<IDetail>) => void) {
        this.buildContext(evtName);
        this.hiddenElement.addEventListener(evtName, callback as EventListener);
    }

    remove(evtName: string, callback: (e: CustomEvent<IDetail>) => void) {
        this.buildContext(evtName);
        this.hiddenElement.removeEventListener(evtName, callback as EventListener);
    }

    fire(evtName: string, data: any) {
        this.buildContext(evtName);
        this.events[evtName].detail.data = data;
        this.hiddenElement.dispatchEvent(this.events[evtName]);
    }
}