if (!window.GoogleShortener) {
	window.GoogleShortener = {
		shortenedUrlPatten: /(http:\/\/)?goo.gl\//i,
		xhr: new XMLHttpRequest(),
		callback: null,

		onXhrReadyStateChanged: function () {
			if (this.readyState === 4) {
				this.removeEventListener('readystatechange', GoogleShortener.onXhrReadyStateChanged);

				if (this.status !== 200) {
					console.error('The server returned bad status: ' + this.status);
					return;
				}

				var data = {};

				try {
					data = JSON.parse(this.response);
				} catch (e) {
					console.error('Error on parse response data', e.message, e);
					return;
				}

				if (GoogleShortener.callback) {
					GoogleShortener.callback(data);
				}
			}
		},

		processUrl: function (url, callback) {
			url = decodeURIComponent(url);
			this.callback = callback;

			this.xhr.addEventListener('readystatechange', this.onXhrReadyStateChanged);

			if (this.shortenedUrlPatten.test(url)) {
				this.xhr.open('GET', 'https://www.googleapis.com/urlshortener/v1/url?shortUrl=' + url);
				this.xhr.send();
			} else {
				this.xhr.open('POST', 'https://www.googleapis.com/urlshortener/v1/url');
				this.xhr.setRequestHeader('Content-Type', 'application/json');

				var json = '';

				try {
					json = JSON.stringify({ 'longUrl': url });
				} catch (e) {
					console.error('Error on parsing request data\n', e.message, e);
					return;
				}

				this.xhr.send(json);
			}
		}
	};
}

var url = prompt('Enter your URL to process');

GoogleShortener.processUrl(url, function (data) {
	if (data.error) {
		console.error('Error in server response.\n', data);
		return;
	}

	var message = '';

	switch (data.status) {
		case 'OK':
		case undefined:
			break;
		case 'MALWARE':
		case 'REMOVE':
			message = 'The link is marked as ' + data.status;
			break;
		default:
			alert('Unexpected status: ' + data.status);
	}

	prompt(message, (data.status) ? data.longUrl : data.id);
});