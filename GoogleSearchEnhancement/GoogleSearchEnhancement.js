var numberLinksToOpen = 5;
var anchorElements = document.querySelectorAll('#ires h3 a');

for (var i = 0; i < numberLinksToOpen; i++) {
    var anchorElement = anchorElements[i];
    console.log(anchorElement);
    rightClickOnElement(anchorElement);
}

function rightClickOnElement(element) {
    var rightClickEvent = document.createEvent('MouseEvents');
    rightClickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 1, null);
    element.dispatchEvent(rightClickEvent);
}
