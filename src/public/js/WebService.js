class WebService {
    constructor() {
        if(!(WebService.prototype.instance instanceof WebService)) {     
            WebService.prototype.instance = this;
        }

        return WebService.prototype.instance;
    }

    /**
     * @public
     * @returns WebService
     */
    getInstance() {
        return WebService.prototype.instance;
    }

    /**
     * @private
     * @param {{}} opts 
     */
    async fetchGet(opts) {
        const wsPath = WebService.prototype.config.wsPath;
        const init = {
            method: "POST",
            body: JSON.stringify(opts)
        };

        const response = await fetch(WebService.prototype.config.wsPath, init);
        return response.json();
    }

    /**
     * @public
     * @param {string} handName 
     */
    async playerHasPlayed(data) {
        return await this.fetchGet({
            webservice: true,
            method: "playerHasPlayed",
            ...data,
        });
    }
}

WebService.prototype.config = {
    wsPath: "../",
};