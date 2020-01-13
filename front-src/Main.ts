import HandsManager from "./ts/HandsManager";
import WebService from "./ts/WebService";

const paperSvg = require("./img/paper.svg");
const rockSvg = require("./img/rock.svg");
const scissorsSvg = require("./img/scissors.svg");

require('./css/style.css');
require('file-loader?name=[name].[ext]!./index.html');


console.log(paperSvg);

export default class Main {

    public static readonly config = {
        wsPath: "../",
        svgHands: {
            paper: paperSvg,
            rock: rockSvg,
            scissors: scissorsSvg,
        }
    };

    private handsManager: HandsManager;
    private webService: WebService;
    private computerWinCount = 0;
    private playerWinCount = 0;
    private static readonly handsList = [
        "paper",
        "rock",
        "scissors",
    ];

    private computerWinCountElement: HTMLSpanElement;
    private playerWinCountElement: HTMLSpanElement;
    private randomBtnElement: HTMLButtonElement;

    constructor() {

        this.handsManager = new HandsManager();
        this.webService = new WebService();
        this.playerHasPlayed = this.playerHasPlayed.bind(this);

        this.computerWinCountElement = document.querySelector(".computer-win-count span") as HTMLSpanElement;
        this.playerWinCountElement = document.querySelector(".player-win-count span") as HTMLSpanElement;
        this.randomBtnElement = document.querySelector(".random-btn") as HTMLButtonElement;
    }

    public async init(): Promise<Main> {
        await this.handsManager.init();
        this.handsManager.createHands();
        this.handsManager.events.add("handSelect", this.playerHasPlayed);
        this.handsManager.events.add("onContinue", () => {
            this.handsManager.toggleToResult(false);
            this.randomBtnElement.classList.add("visible");
        });

        this.randomBtnElement.addEventListener("click", () => {
            const handIndex = Math.floor(Math.random() * Math.floor(3));
            this.handsManager.events.fire("handSelect", { handType: Main.handsList[handIndex] });
        });
        return this;
    }

    private async playerHasPlayed(e: CustomEvent) {
        let message = "Draw !";
        const res = await this.webService.playerHasPlayed(e.detail.data);
        this.randomBtnElement.classList.remove("visible");
        const hands = [res.gameResult.player, res.gameResult.enemy];
        this.handsManager.displayHandsResult(hands);

        if (res.gameResult.win === 1) {
            message = "You win :)";
            this.playerWinCount++;
        } else if (res.gameResult.win === -1) {
            message = "You lose :(";
            this.computerWinCount++;
        }

        this.handsManager.toggleToResult(true, message);
        this.playerWinCountElement.textContent = this.playerWinCount.toString();
        this.computerWinCountElement.textContent = this.computerWinCount.toString();
    }
}

new Main().init();