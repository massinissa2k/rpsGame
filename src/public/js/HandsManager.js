class HandsManager extends SVGLoader {
    
    constructor() {
        super([
            "paper",
            "rock",
            "scissors",
        ]);

        this.handClick = this.handClick.bind(this);
        this.events = new ProjectCustomEvent();
        this.handsContainer = document.querySelector(".hands");
        this.handsResultContainer = document.querySelector(".hands-result-container");
        this.continueBtn = this.handsResultContainer.querySelector(".continue-btn");
        this.handsResult = this.handsResultContainer.querySelector(".hands-result");
        this.gameResult = this.handsResultContainer.querySelector(".game-result");
        
        /**
         * @type {Object.<string, HTMLDivElement>}
         */
        this.handsElement = {};
    }

    /**
     * @public
     */
    async init() {
        await super.init();
        this.continueBtn.addEventListener("click", () => {
            this.events.fire("onContinue", {});
        });
        return this;
    }

    /**
     * @public
     * @param {boolean} visible 
     * @param {string} textContent 
     */
    toggleToResult(visible, textContent) {
        if(visible === true) {
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

    /**
     * @public
     * @param {string[]} hands 
     */
    displayHandsResult(hands) {
        while(this.handsResult.hasChildNodes()) {
            this.handsResult.removeChild(this.handsResult.firstChild);
        }

        for(let i = 0, len = hands.length; i < len; i++) {
            const name = hands[i];
            const container = document.createElement("div");
            container.setAttribute("title", name.toUpperCase());
            container.setAttribute("data-hand", name);
            container.classList.add("hand", name);
            container.appendChild(this.provideByName(name));
            this.handsResult.appendChild(container);
        }
    }

    /**
     * @public
     */
    createHands() {
        this.createHandByName("rock");
        this.createHandByName("paper");
        this.createHandByName("scissors");
    }

    /**
     * @public
     */
    removeHands() {
        this.removeHandByName("rock");
        this.removeHandByName("paper");
        this.removeHandByName("scissors");
    }

    /**
     * @public
     * @param {string} name 
     */
    createHandByName(name) {
        const container = document.createElement("div");
        this.handsElement[name] = container;
        container.setAttribute("title", name.toUpperCase());
        container.setAttribute("data-hand", name);
        container.classList.add("hand", name);
        container.appendChild(this.provideByName(name));
        this.handsContainer.appendChild(container);
        container.addEventListener("click", this.handClick);
    }

    /**
     * @public
     * @param {string} name 
     */
    removeHandByName(name) {
        this.handsElement[name].removeEventListener("click", this.handClick);
        try {
            this.handsElement[name].parentElement.removeChild(this.handsElement[name]);
        } catch(e) {
            //no parentElement
        }
    }

    /**
     * @private
     * @param {MouseEvent} e 
     */
    handClick(e) {
        e.preventDefault();
        const handType = e.currentTarget.getAttribute("data-hand");
        this.events.fire("handSelect", {handType: handType});
    }
}