import SVGLoader from "./SVGLoader";
import ProjectCustomEvent from "./ProjectCustomEvent";
import Main from "../Main";

export default class HandsManager extends SVGLoader {

    public events: ProjectCustomEvent;
    private handsContainer: HTMLDivElement;
    private handsResultContainer: HTMLDivElement;
    private continueBtn: HTMLButtonElement;
    private handsResult: HTMLDivElement;
    private gameResult: HTMLDivElement;
    private readonly handsElement: { [key: string]: HTMLDivElement } = {};

    constructor() {
        super(Main.config.svgHands);

        this.handClick = this.handClick.bind(this);
        this.events = new ProjectCustomEvent();
        this.handsContainer = document.querySelector(".hands") as HTMLDivElement;
        this.handsResultContainer = document.querySelector(".hands-result-container") as HTMLDivElement;
        this.continueBtn = this.handsResultContainer.querySelector(".continue-btn") as HTMLButtonElement;
        this.handsResult = this.handsResultContainer.querySelector(".hands-result") as HTMLDivElement;
        this.gameResult = this.handsResultContainer.querySelector(".game-result") as HTMLDivElement;
    }

    public async init(): Promise<HandsManager> {
        await super.init();
        this.continueBtn.addEventListener("click", () => {
            this.events.fire("onContinue", {});
        });
        return this;
    }

    public toggleToResult(visible: boolean, textContent: string = ""): void {
        if (visible === true) {
            this.gameResult.textContent = textContent;
            this.handsContainer.classList.remove("visible");
            setTimeout(() => {
                this.handsContainer.classList.remove("displayed");
                this.handsResultContainer.classList.add("displayed");
                setTimeout(() => {
                    this.handsResultContainer.classList.add("visible");
                }, 20);
            }, 400);
            return;
        }

        this.handsResultContainer.classList.remove("visible");
        setTimeout(() => {
            this.handsResultContainer.classList.remove("displayed");
            this.handsContainer.classList.add("displayed");
            setTimeout(() => {
                this.handsContainer.classList.add("visible");
            }, 20);
        }, 400);
    }

    public displayHandsResult(hands: string[]): void {
        while (this.handsResult.hasChildNodes()) {
            this.handsResult.removeChild(this.handsResult.firstChild as HTMLElement);
        }

        for (let i = 0, len = hands.length; i < len; i++) {
            const name = hands[i];
            const container = document.createElement("div");
            container.setAttribute("title", name.toUpperCase());
            container.setAttribute("data-hand", name);
            container.classList.add("hand", name);
            container.appendChild(this.provideByName(name));
            this.handsResult.appendChild(container);
        }
    }

    public createHands(): void {
        this.createHandByName("rock");
        this.createHandByName("paper");
        this.createHandByName("scissors");
    }

    //@ts-ignore
    private removeHands(): void {
        this.removeHandByName("rock");
        this.removeHandByName("paper");
        this.removeHandByName("scissors");
    }

    private createHandByName(name: string): void {
        const container = document.createElement("div");
        this.handsElement[name] = container;
        container.setAttribute("title", name.toUpperCase());
        container.setAttribute("data-hand", name);
        container.classList.add("hand", name);
        container.appendChild(this.provideByName(name));
        this.handsContainer.appendChild(container);
        container.addEventListener("click", this.handClick);
    }

    private removeHandByName(name: string): void {
        this.handsElement[name].removeEventListener("click", this.handClick);
        try {
            (this.handsElement[name].parentElement as HTMLElement).removeChild(this.handsElement[name]);
        } catch (e) {
            //no parentElement
        }
    }

    private handClick(e: MouseEvent): void {
        e.preventDefault();
        const handType = (e.currentTarget as HTMLElement).getAttribute("data-hand");
        this.events.fire("handSelect", { handType: handType });
    }
}