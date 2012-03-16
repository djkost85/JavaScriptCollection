while (text = prompt("Enter the text"))?
	code = ''
	literal = ''

	for c in text
		num = c.charCodeAt() - 96 # The ASCII code of the first alphabet characters 'a' is 97.
		code += num
		literal += num + ', '

	if !prompt("#{text} = #{literal}", code)?
		break