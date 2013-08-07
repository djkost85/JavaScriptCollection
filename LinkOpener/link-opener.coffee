(->
	SCRIPT_NAME = 'LinkOpener'
	GUID = '294A1387-0EF8-4084-9881-26FF1E6D93EA'

	if window[GUID]
		console.info SCRIPT_NAME + ' has been launched.'
		return

	window[GUID] = SCRIPT_NAME
	console.info SCRIPT_NAME + ' is launched'

	SELECTED_BORDER_STYLE = '2px dashed orange'
	CTRL_KEYCODE = 17
	elementsToOpen = []

	mark = (e) ->
		return if e.marked			
		e.marked = true
		e.styleBorderOld = e.style.border
		e.style.border = SELECTED_BORDER_STYLE
	unmark = (e) ->
		return unless e.marked			
		delete e.marked
		e.style.border = e.styleBorderOld
		delete e.styleBorderOld
	onKeyUp = (e) ->
		return unless e.keyCode is CTRL_KEYCODE
		elementsToOpen.forEach (element) ->
			unmark element
		elementsToOpen.length = 0
	onMouseMove = (e) ->
		return unless e.ctrlKey

		element = e.currentTarget
		return unless element.tagName is 'A'

		return if element.marked
		
		mark element
		elementsToOpen.push element

		rightClickEvent = document.createEvent 'MouseEvents'
		rightClickEvent.initMouseEvent 'click', true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null
		element.dispatchEvent rightClickEvent

	window.addEventListener 'keyup', onKeyUp

	anchorNodeList = document.querySelectorAll 'a'
	for anchorNode in anchorNodeList
		anchorNode.addEventListener 'mousemove', onMouseMove
).call @