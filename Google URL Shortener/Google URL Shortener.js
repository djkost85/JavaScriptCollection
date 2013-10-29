(function () {
	if (!window.GoogleShortener) {
		window.GoogleShortener = {
			shortenedUrlPatten: /(http:\/\/)?goo.gl\//i,
			xhr: new XMLHttpRequest(),
			callback: null,

			onXhrReadyStateChanged: function () {
				if (this.readyState === 4) {
					if (this.status !== 200) {
						alert('The server returned bad status: ' + this.status);
						return;
					}

					var data = {};

					try {
						data = JSON.parse(this.response);
					} catch (e) {
						alert('Error on parse response data', e.message, e);
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

		GoogleShortener.xhr.addEventListener('readystatechange', GoogleShortener.onXhrReadyStateChanged);
	}

	var currentUrl = location.href;
	GoogleShortener.processUrl(currentUrl, function (data) {
		if (data.error) {
			alert('Error in server response.\n' + data);
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

		var url = prompt('Enter your URL to process', data.id);
		if (url == null || url === '') {
			return;
		}

		GoogleShortener.processUrl(url, function (data) {
			if (data.error) {
				alert('Error in server response.\n' + data);
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
	});
})();