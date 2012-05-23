linkOpener = window.linkOpener =
  isCtrlDown: false
  elements: []

styleBorderSelected = "1px dashed orange"

applyStyle = (e) ->
  e.dataset.styleBorderOld = e.style.border
  e.style.border = styleBorderSelected

restoreStyle = (e) ->
  e.style.border = e.dataset.styleBorderOld
  e.dataset.styleBorderOld = null

keydownHandler = ->
  if event.keyCode is 17
    linkOpener.isCtrlDown = true

  if typeof window.onkeydownOld is "function" then window.onkeydownOld()

onKeyDown = ->
  if event.keyCode is 17
    linkOpener.isCtrlDown = false
    hashedListLinks = {}
    i = 0

    while i < linkOpener.elements.length
      restoreStyle linkOpener.elements[i]
      hashedListLinks[linkOpener.elements[i].href] = true
      i++

    linkOpener.elements = []
    for j of hashedListLinks
      open j
  window.onkeyupOld() if typeof window.onkeyupOld is "function"

onMouseOver = (e) ->
  if e.shiftKey
    if @attributes.styleBorderOld or @attributes.styleBorderOld is ""
      restoreStyle this
      index = linkOpener.elements.indexOf(this)
      linkOpener.elements.splice index, 1  if index >= 0
    else
      linkOpener.elements.push this
      applyStyle this
  if typeof @onmouseoverOld is "function" then @onmouseoverOld()

window.addEventHandler 'keydown', onKeyDown
window.addEventHandler 'mouseover', onMouseOver