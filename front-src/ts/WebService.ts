import Main from "../Main";

type THandsType = "paper" | "rock" | "scissors";
type TMethodsType = "playerHasPlayed";

interface IServiceData {
    message: string;
    gameResult: {
        win: number;
        player: THandsType;
        enemy: THandsType;
    }
}

export default class WebService {

    private static instance: WebService;

    constructor() {
        if (!(WebService.instance instanceof WebService)) {
            WebService.instance = this;
        }

        return WebService.instance;
    }

    public getInstance(): WebService {
        return WebService.instance;
    }

    private async fetchGet<T>(opts: {}): Promise<T> {
        const init = {
            method: "POST",
            body: JSON.stringify(opts)
        };

        const response = await fetch(Main.config.wsPath, init);
        return response.json();
    }

    public async playerHasPlayed(data: any): Promise<IServiceData> {
        const opts: {
            webservice: boolean;
            mathod: TMethodsType;
            [key: string]: any;
        } = {
            webservice: true,
            method: "playerHasPlayed",
            ...data,
        };

        return await this.fetchGet<IServiceData>(opts);
    }
}

export { THandsType, TMethodsType };