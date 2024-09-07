// Ducktyping FTW

// Opera 8.0+
let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
let isFirefox = typeof InstallTrigger !== 'undefined' || /Firefox|FxiOS/.test(navigator.userAgent);

// Safari 3.0+ "[object HTMLElementConstructor]" 
let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

// Internet Explorer 6-11
let isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
let isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 79
let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Edge (based on chromium) detection
let isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

// Blink engine detection
let isBlink = (isChrome || isOpera) && !!window.CSS;


let browser = "chrome";
if (isFirefox){
    browser = "firefox";
}
else if (isChrome){
    browser = "chrome";
}
else if (isSafari){
    browser = "safari";
}
else if (isOpera){
    browser = "opera";
}
else if (isIE){
    browser = "IE";
}
else if (isEdge){
    browser = "edge";
}
else if (isEdgeChromium || isBlink){
    browser = "chromium";
}
else{
    browser = "chrome";
}

