(function() {
	/*
	 * TODO: Add CSS animation to the focused input box.
	 */

	var scriptName = "FindNextSearchBox";
	var guid = 'B080AF99-0574-426C-AB40-F1F7BA98AFF8';

	var elementTypes = ['text', 'search'];	// the element types to be included
	var attributesToSearch = ['id', 'name', 'title', 'value', 'class', 'placeholder'];	// the attributes to be searched
	var patterns = [/search/i, /keyword/i, /query/i, /lookup/i, /^q$/i, /^s$/i];	// the paaterns used to search
	var _ = {};	// the exported object

	// Rate the given element. [return] the rating from 0 to paterns.length, higher is more likely to be the search box.
	function rate(element) {
		var max = patterns.length;

		for (var attrI in attributesToSearch) {
			var attr = attributesToSearch[attrI];

			for (var i = 0; i < max; i++) {
				if (patterns[i].test(element[attr])) {
					if ((max = i) === 0) {
						return patterns.length;
					} else {
						break;
					}
				}
			}
		}

		var rating = patterns.length - max;

		return patterns.length - max;
	}

	// Sort function decides which one is more likely to be the search box.
	function sortByRating(a, b) {
		if (a.rating > b.rating) {
			return 1;
		} else if (a.rating < b.rating) {
			return -1;
		}

		if (a.offsetTop < b.offsetTop) {
			return 1;
		} else if (a.offsetTop > b.offsetTop) {
			return -1;
		}

		if (a.offsetLeft < b.offsetLeft) {
			return 1;
		} else if (a.offsetLeft > b.offsetLeft) {
			return -1;
		}

		return 0;
	}

	function filter(element, index, array) {
		if (elementTypes.indexOf(element.type) < 0 ||
			element.disabled ||
			element.clientWidth <= 0 ||
			element.clientHeight <= 0
		) {
			return false;
		}

		var rating = rate(element);

		if (rating <= 0) {
			return false;
		}

		element.rating = rating;

		return true;
	}

	if (window[guid]) {	// if this script has been launched before
		_ = window[guid];

		if (++_.index >= _.list.length) {
			_.index = 0;
		}
	} else {
		_ = window[guid] = {
			scriptName: scriptName,
			elementTypes: elementTypes,
			attributesToSearch: attributesToSearch,
			patterns: patterns,
			list: [],
			index: 0
		};

		nodeList = document.querySelectorAll('input');
		var list = [];

		for (var i = 0, len = nodeList.length; i < len; i++) {
			list.push(nodeList[i]);
		}

		_.list = list.sort(sortByRating).filter(filter);
	}

	if (_.list.length > 0) {
		var element = _.list[_.index];
		element.focus();
		element.select();

		console.log("Search input (" + (_.index + 1) + "/" + _.list.length + ") selected:", element);
	} else {
		console.log('No search input box was found');
	}
}).call(this);
