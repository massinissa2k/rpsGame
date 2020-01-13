export default class SVGLoader {
    private readonly strSvgs: { [key: string]: string } = {};

    constructor(private svgFilePaths: { [key: string]: string }) { }

    public async init(): Promise<SVGLoader> {
        await this.fetchAll();
        return this;
    }

    protected async fetchAll(): Promise<string[]> {
        const prms: Promise<string>[] = [];

        for (const key in this.svgFilePaths) {
            const rq = new Request(this.svgFilePaths[key]);
            const prm = fetch(rq).then((r) => {
                return r.text();
            }).then((text) => {
                this.strSvgs[key] = text;
                return text;
            });
            prms.push(prm);
        }

        return Promise.all(prms);
    }

    /**
     * svgStr to SVGElement
     */
    protected svgParse(str: string): SVGElement {
        const parser = document.createElement("div");
        parser.innerHTML = str;
        return parser.childNodes[0] as SVGElement;
    }

    /**
     * return the svg element as a new one
     */
    protected provideByName(name: string): SVGElement {
        return this.svgParse(this.strSvgs[name]);
    }
}