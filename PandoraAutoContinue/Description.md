<hr />
# Introduction
This userscript enhances your [Pandora.com](http://www.pandora.com/) experience by automatically clicking "still listening" and "reload" buttons.

<hr />
# Requirement
Only [Google Chrome](http://en.wikipedia.org/wiki/Google_chrome) is supported for now.

To have the best performance, this script uses [DOM4 MutationObserver](http://www.w3.org/TR/dom/#mutation-observers) to track the change of document. Unfortunately, most browsers still use [DOM3 deprecated methods](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMAttrModified), such as DOMAttrModified or DOMNodeInserted, as the way to detect changes in the DOM tree.

If you are looking for Firefox-compatible userscript, please check [Pandora Unlimited](http://userscripts.org/scripts/show/126773) instead.

<hr />
# Maintenance
Please submit your questions, suggestions or bug reports to [the GitHub repository](https://github.com/masonaxcte/JavaScriptCollection/issues). Thank you.

<hr />
# Changelog

##2012-06-25

[+] Logging

The script will now save logs in localStorage['logs'], limited to 100 logs.

[+] Auto-click reload button

The script will now also click the reload button(link) automatically.