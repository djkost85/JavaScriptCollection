(function () {
    var id = "C4365D9F-F7E8-4D17-84E4-E351FD1B640A";
    var styleElement = null;

    console.log('window[id]', window[id]);

    if (window[id]) {
        if (document.getElementById(window[id].id)) {
            document.body.removeChild(window[id]);
        } else {
            document.body.appendChild(window[id]);
        }
    } else {
        styleElement = document.createElement('style');
        styleElement.id = "2F569819-CF80-44D3-87D7-406A02334818";
        styleElement.innerHTML = "* {font-family: Calibri !important; font-size: 150%;} body {max-width: 61.80339887498948% !important; margin: 0 auto !important; min-width: 600px !important;}";

        window[id] = styleElement;
        document.body.appendChild(styleElement);
    }
})();
