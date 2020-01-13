class SVGLoader {
    
    /**
     * @param {string[]} svgsName - name without extension
     */
    constructor(svgsName) {
        this.fileList = [...svgsName];
        this.strSvgs = {};
    }

    /**
     * @public
     */
    async init() {
        await this.fetchAll();
        return this;
    }

    /**
     * @protected
     */
    async fetchAll() {
        const prms = [];

        for(const hand of this.fileList) {
            // TODO should be in config file 
            const rq = new Request(`./img/${hand}.svg`);
            const prm = fetch(rq).then((r) => {
                return r.text();
            }).then((text) => {
                this.strSvgs[hand] = text;
                return text;
            });
            prms.push(prm);
        }

        return Promise.all(prms);
    }

    /**
     * svgStr to SVGElement
     * @protected
     * @param {string} str 
     * @returns SVGElement
     */
    svgParse(str) {
        const parser = document.createElement("div");
        parser.innerHTML = str;
        return parser.childNodes[0];
    }

    /**
     * return the svg element as a new one
     * @protected
     * @param {string} name
     * @returns {SVGElement}
     */
    provideByName(name) {
        return this.svgParse(this.strSvgs[name]);
    }
}