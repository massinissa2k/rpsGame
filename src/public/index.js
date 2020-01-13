!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,s){function a(e){try{c(r.next(e))}catch(e){s(e)}}function o(e){try{c(r.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,o)}c((r=r.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(1)),a=i(n(4)),o=n(5),c=n(6),d=n(7);n(8),n(12),console.log(o);class l{constructor(){this.computerWinCount=0,this.playerWinCount=0,this.handsManager=new s.default,this.webService=new a.default,this.playerHasPlayed=this.playerHasPlayed.bind(this),this.computerWinCountElement=document.querySelector(".computer-win-count span"),this.playerWinCountElement=document.querySelector(".player-win-count span"),this.randomBtnElement=document.querySelector(".random-btn")}init(){return r(this,void 0,void 0,(function*(){return yield this.handsManager.init(),this.handsManager.createHands(),this.handsManager.events.add("handSelect",this.playerHasPlayed),this.handsManager.events.add("onContinue",()=>{this.handsManager.toggleToResult(!1),this.randomBtnElement.classList.add("visible")}),this.randomBtnElement.addEventListener("click",()=>{const e=Math.floor(Math.random()*Math.floor(3));this.handsManager.events.fire("handSelect",{handType:l.handsList[e]})}),this}))}playerHasPlayed(e){return r(this,void 0,void 0,(function*(){let t="Draw !";const n=yield this.webService.playerHasPlayed(e.detail.data);this.randomBtnElement.classList.remove("visible");const r=[n.gameResult.player,n.gameResult.enemy];this.handsManager.displayHandsResult(r),1===n.gameResult.win?(t="You win :)",this.playerWinCount++):-1===n.gameResult.win&&(t="You lose :(",this.computerWinCount++),this.handsManager.toggleToResult(!0,t),this.playerWinCountElement.textContent=this.playerWinCount.toString(),this.computerWinCountElement.textContent=this.computerWinCount.toString()}))}}t.default=l,l.config={wsPath:"../",svgHands:{paper:o,rock:c,scissors:d}},l.handsList=["paper","rock","scissors"],(new l).init()},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,s){function a(e){try{c(r.next(e))}catch(e){s(e)}}function o(e){try{c(r.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,o)}c((r=r.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(2)),a=i(n(3)),o=i(n(0));class c extends s.default{constructor(){super(o.default.config.svgHands),this.handsElement={},this.handClick=this.handClick.bind(this),this.events=new a.default,this.handsContainer=document.querySelector(".hands"),this.handsResultContainer=document.querySelector(".hands-result-container"),this.continueBtn=this.handsResultContainer.querySelector(".continue-btn"),this.handsResult=this.handsResultContainer.querySelector(".hands-result"),this.gameResult=this.handsResultContainer.querySelector(".game-result")}init(){const e=Object.create(null,{init:{get:()=>super.init}});return r(this,void 0,void 0,(function*(){return yield e.init.call(this),this.continueBtn.addEventListener("click",()=>{this.events.fire("onContinue",{})}),this}))}toggleToResult(e,t=""){if(!0===e)return this.gameResult.textContent=t,this.handsContainer.classList.remove("visible"),void setTimeout(()=>{this.handsContainer.classList.remove("displayed"),this.handsResultContainer.classList.add("displayed"),setTimeout(()=>{this.handsResultContainer.classList.add("visible")},20)},400);this.handsResultContainer.classList.remove("visible"),setTimeout(()=>{this.handsResultContainer.classList.remove("displayed"),this.handsContainer.classList.add("displayed"),setTimeout(()=>{this.handsContainer.classList.add("visible")},20)},400)}displayHandsResult(e){for(;this.handsResult.hasChildNodes();)this.handsResult.removeChild(this.handsResult.firstChild);for(let t=0,n=e.length;t<n;t++){const n=e[t],r=document.createElement("div");r.setAttribute("title",n.toUpperCase()),r.setAttribute("data-hand",n),r.classList.add("hand",n),r.appendChild(this.provideByName(n)),this.handsResult.appendChild(r)}}createHands(){this.createHandByName("rock"),this.createHandByName("paper"),this.createHandByName("scissors")}removeHands(){this.removeHandByName("rock"),this.removeHandByName("paper"),this.removeHandByName("scissors")}createHandByName(e){const t=document.createElement("div");this.handsElement[e]=t,t.setAttribute("title",e.toUpperCase()),t.setAttribute("data-hand",e),t.classList.add("hand",e),t.appendChild(this.provideByName(e)),this.handsContainer.appendChild(t),t.addEventListener("click",this.handClick)}removeHandByName(e){this.handsElement[e].removeEventListener("click",this.handClick);try{this.handsElement[e].parentElement.removeChild(this.handsElement[e])}catch(e){}}handClick(e){e.preventDefault();const t=e.currentTarget.getAttribute("data-hand");this.events.fire("handSelect",{handType:t})}}t.default=c},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,s){function a(e){try{c(r.next(e))}catch(e){s(e)}}function o(e){try{c(r.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,o)}c((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e){this.svgFilePaths=e,this.strSvgs={}}init(){return r(this,void 0,void 0,(function*(){return yield this.fetchAll(),this}))}fetchAll(){return r(this,void 0,void 0,(function*(){const e=[];for(const t in this.svgFilePaths){const n=new Request(this.svgFilePaths[t]),r=fetch(n).then(e=>e.text()).then(e=>(this.strSvgs[t]=e,e));e.push(r)}return Promise.all(e)}))}svgParse(e){const t=document.createElement("div");return t.innerHTML=e,t.childNodes[0]}provideByName(e){return this.svgParse(this.strSvgs[e])}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(){this.events=this.events||{}}buildContext(e){this.events[e]=this.events[e]||new CustomEvent(e,{detail:{data:null}}),this.hiddenElement=this.hiddenElement||document.createElement("div")}add(e,t){this.buildContext(e),this.hiddenElement.addEventListener(e,t)}remove(e,t){this.buildContext(e),this.hiddenElement.removeEventListener(e,t)}fire(e,t){this.buildContext(e),this.events[e].detail.data=t,this.hiddenElement.dispatchEvent(this.events[e])}}},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,s){function a(e){try{c(r.next(e))}catch(e){s(e)}}function o(e){try{c(r.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,o)}c((r=r.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(0));class a{constructor(){return a.instance instanceof a||(a.instance=this),a.instance}getInstance(){return a.instance}fetchGet(e){return r(this,void 0,void 0,(function*(){const t={method:"POST",body:JSON.stringify(e)};return(yield fetch(s.default.config.wsPath,t)).json()}))}playerHasPlayed(e){return r(this,void 0,void 0,(function*(){const t=Object.assign({webservice:!0,method:"playerHasPlayed"},e);return yield this.fetchGet(t)}))}}t.default=a},function(e,t,n){e.exports=n.p+"45c068f5be745a2650b9e2cbb42a8b18.svg"},function(e,t,n){e.exports=n.p+"ad41667bece63a4839949285ccde01ae.svg"},function(e,t,n){e.exports=n.p+"0a3678668ca291984a38fef590dc5b41.svg"},function(e,t,n){var r=n(9),i=n(10);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[e.i,i,""]]);var s={insert:"head",singleton:!1},a=(r(e.i,i,s),i.locals?i.locals:{});e.exports=a},function(e,t,n){"use strict";var r,i=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},s=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),a={};function o(e,t,n){for(var r=0;r<t.length;r++){var i={css:t[r][1],media:t[r][2],sourceMap:t[r][3]};a[e][r]?a[e][r](i):a[e].push(v(i,n))}}function c(e){var t=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var i=n.nc;i&&(r.nonce=i)}if(Object.keys(r).forEach((function(e){t.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(t);else{var a=s(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var d,l=(d=[],function(e,t){return d[e]=t,d.filter(Boolean).join("\n")});function u(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=l(t,i);else{var s=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(s,a[t]):e.appendChild(s)}}function h(e,t,n){var r=n.css,i=n.media,s=n.sourceMap;if(i?e.setAttribute("media",i):e.removeAttribute("media"),s&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var f=null,p=0;function v(e,t){var n,r,i;if(t.singleton){var s=p++;n=f||(f=c(t)),r=u.bind(null,n,s,!1),i=u.bind(null,n,s,!0)}else n=c(t),r=h.bind(null,n,t),i=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else i()}}e.exports=function(e,t,n){return(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=i()),e=n.base?e+n.base:e,t=t||[],a[e]||(a[e]=[]),o(e,t,n),function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){a[e]||(a[e]=[]),o(e,t,n);for(var r=t.length;r<a[e].length;r++)a[e][r]();a[e].length=t.length,0===a[e].length&&delete a[e]}}}},function(e,t,n){(t=n(11)(!1)).push([e.i,"html, body {\r\n    height: 100%;\r\n    margin: 0;\r\n    padding: 0;\r\n    font-family: Arial, Helvetica, sans-serif;\r\n}\r\n\r\n.title {\r\n    font-size: 20px;\r\n    padding-top: 10px;\r\n}\r\n\r\n.player {\r\n    display: flex;\r\n    height: 100%;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: flex-start;\r\n}\r\n\r\n.hands, .hands-result-container {\r\n    display: none;\r\n    max-height: 100%;\r\n    opacity: 0;\r\n    transition: opacity 300ms ease-in-out;\r\n    pointer-events: none;\r\n}\r\n\r\n.hands.visible, .hands-result-container.visible {\r\n    opacity: 1;\r\n    pointer-events: all;\r\n}\r\n\r\n.hands.displayed, .hands-result-container.displayed {\r\n    display: flex;\r\n}\r\n\r\n.hands-result-container {\r\n    flex-direction: column;\r\n}\r\n\r\n.hands-result-container .hands-result {\r\n    display: flex;\r\n    box-sizing: border-box;\r\n    border: 4px solid rgba(0,0,0,1);\r\n    border-radius: 250px;\r\n    margin: 0 5px;\r\n    max-height: 100%;\r\n    max-width: 100%;\r\n}\r\n\r\n.hands-result-container .game-result {\r\n    font-size: 20px;\r\n    text-align: center;\r\n    margin: 10px 0;\r\n}\r\n\r\n.hands-result-container .continue-btn, .random-btn {\r\n    font-size: 25px;\r\n    text-align: center;\r\n    margin: 10px 0;\r\n    padding: 6px 15px;\r\n    cursor: pointer;    \r\n}\r\n\r\n.random-btn {\r\n    pointer-events: none;\r\n    opacity: 0;\r\n}\r\n\r\n.random-btn.visible {\r\n    pointer-events: all;\r\n    opacity: 1;\r\n}\r\n\r\n.hands .hand {\r\n    cursor: pointer;\r\n    box-sizing: border-box;\r\n    border: 4px solid rgba(0,0,0,1);\r\n    border-radius: 250px;\r\n    margin: 0 5px;\r\n}\r\n\r\n.hands .hand:hover {\r\n    background-color: rgba(72, 0, 254, 0.2);\r\n}\r\n\r\n.hands .hand svg, .hands-result .hand svg {\r\n    width: 100%;\r\n    height: 100%;\r\n    max-width: 250px;\r\n}\r\n\r\n.game-vs-player {\r\n    display: flex;\r\n    flex-direction: row;\r\n    flex: 0.5;\r\n    padding-top: 5px;\r\n}\r\n\r\n.game-vs-player .counter {\r\n    margin: 0 20px;\r\n}",""]),e.exports=t},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var i=(a=r,o=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),"/*# ".concat(c," */")),s=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[n].concat(s).concat([i]).join("\n")}var a,o,c;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var i={};if(r)for(var s=0;s<this.length;s++){var a=this[s][0];null!=a&&(i[a]=!0)}for(var o=0;o<e.length;o++){var c=[].concat(e[o]);r&&i[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}},function(e,t,n){e.exports=n.p+"index.html"}]);