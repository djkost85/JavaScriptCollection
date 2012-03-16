prompt('Random GUID', 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) ->
		rand = Math.random() * 16 | 0 # Get a random integer between 0 to 15.
		num = if c == 'y' then (rand & 0x3 | 0x8) else rand # Get then number on the particular position.
		num.toString(16).toUpperCase() # Return the character.
	)
)