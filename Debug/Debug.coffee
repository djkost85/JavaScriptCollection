# Debug
window.log = (msg) ->
	console.log msg
window.err = (msg) ->
	console.error msg
window.warn = (msg) ->
	console.warn msg

window.LogMode = {
  None: 0x0
  String: 0x1
  Function: 0x2
  Null: 0x4
  Warn: 0x8
  All: 0xF
}
enumIs = (testedMode, testingMode) ->
	(testedMode & testingMode) is testingMode

window.loga = (obj, mode = LogMode.String) ->
	for key of obj
		if obj[key]
			try
				if typeof obj[key] is 'function'
					if enumIs(mode, LogMode.Function)
						console.log "#{key} ->\t" + obj[key]
				else if enumIs(mode, LogMode.String)
					console.log "#{key}:\t" + obj[key]
			catch error
				if enumIs(mode, LogMode.Warn)
					warn "#{key} cannot be converted to string"
		else if enumIs(mode, LogMode.Null)
			console.log "#{key} is null"
	return

console.log 'Debug scrip loaded at ' + (new Date()).toISOString()
console.log navigator.userAgent