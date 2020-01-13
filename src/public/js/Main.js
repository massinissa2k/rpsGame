class Main {
    constructor() {
        this.handsList = [
            "paper",
            "rock",
            "scissors",
        ];
        this.handsManager = new HandsManager();
        this.webService = new WebService();
        this.playerHasPlayed = this.playerHasPlayed.bind(this);
        this.computerWinCount = 0;
        this.playerWinCount = 0;

        this.computerWinCountElement = document.querySelector(".computer-win-count span");
        this.playerWinCountElement = document.querySelector(".player-win-count span");
        this.randomBtnElement = document.querySelector(".random-btn");
    }

    /**
     * @private
     */
    async init() {
        await this.handsManager.init();
        this.handsManager.createHands();
        this.handsManager.events.add("handSelect", this.playerHasPlayed);
        this.handsManager.events.add("onContinue", () => {
            this.handsManager.toggleToResult(false);
            this.randomBtnElement.classList.add("visible");
        });

        this.randomBtnElement.addEventListener("click", () => {
            const handIndex = Math.floor(Math.random() * Math.floor(3));
            this.handsManager.events.fire("handSelect", {handType: this.handsList[handIndex]});
        });
        return this;
    }

    /**
     * @private
     * @param {{detail: {data: *}}} e 
     */
    async playerHasPlayed(e) {
        let message = "Draw !";
        const res = await this.webService.playerHasPlayed(e.detail.data);
        this.randomBtnElement.classList.remove("visible");
        const hands = [res.gameResult.player, res.gameResult.enemy];
        this.handsManager.displayHandsResult(hands);
        
        if(res.gameResult.win === 1) {
            message = "You win :)";
            this.playerWinCount++;
        } else if(res.gameResult.win === -1) {
            message = "You lose :(";
            this.computerWinCount++;
        }

        this.handsManager.toggleToResult(true, message);
        this.playerWinCountElement.textContent = this.playerWinCount.toString();
        this.computerWinCountElement.textContent = this.computerWinCount.toString();
    }
}

new Main().init();