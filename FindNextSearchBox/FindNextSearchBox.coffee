# The name of this script
scriptName = "FindNextSearchBox"

# The element types to be included
elementTypes = [ 'text', 'search', ]
# The attributes to concern
attributesToSearch = [ 'id', 'name', 'title', 'value', 'class', 'placeholder' ]
# The paaterns considered as a search box
patterns = [ /search/i, /keyword/i, /query/i, /lookup/i, /^q$/i, /^s$/i, ]

rate = (e) ->
  max = patterns.length
  for attr in attributesToSearch
    for i in [0..(max - 1)]
      if patterns[i].test e[attr]
        if (max = i) == 0
          return patterns.length
        else
          break
  return patterns.length - max

sort = (a, b) ->
  aRating = a.dataset.rating
  bRating = b.dataset.rating

  if aRating > bRating
    return 1
  else if aRating < bRating
    return -1

  if a.offsetTop < b.offsetTop
    return 1
  else if a.offsetTop > b.offsetTop
    return -1

  if a.offsetLeft < b.offsetLeft
    return 1
  else if a.offsetLeft > b.offsetLeft
    return -1

  return 0

filter = (element, index, array) ->
  if !(element.type in elementTypes) || element.disabled || element.clientWidth == 0 || element.clientHeight == 0
    return false

  if (rating = rate element) <= 0
    return false

  element.dataset.rating = rate element

  return true

# Entry point.
if window[scriptName]? # if the script has been launched before
  _ = window[scriptName];

  if ++_.index >= _.list.length
    _.index = 0
else
  _ = window[scriptName] = {
    elementTypes: elementTypes
    attributesToSearch: attributesToSearch
    patterns: patterns
    list: []
    index: 0
  }

  # Generate an array of elements from nodelist
  nodeList = document.querySelectorAll 'input'
  list = []
  i = 0

  for node in nodeList
    list[i++] = node

  _.list = list = list.filter filter

  list.sort sort

console.log "#{scriptName}:", _

if _.list.length > 0
  document.body.focus()
  (element = _.list[_.index]).focus()
  element.select()

  console.log "Element (#{_.index + 1}/#{_.list.length}) selected:", element
else
  console.log 'No item found'