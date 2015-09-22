// Type definitions for Numeral.js
// Project: https://github.com/adamwdraper/Numeral-js
// Definitions by: Vincent Bortone <https://github.com/vbortone/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface ScreenFull {
	isFullscreen: boolean;
	enabled: boolean;	
	element: Element;
	request(elem: Element): void;
	toggle(elem: Element): void;
	exit(): void;
}

declare var screenfull: ScreenFull;

declare module "screenfull" {

    export = screenfull;

}
