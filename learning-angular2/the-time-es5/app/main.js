(function(app) {

	var bootstrap = ng.platformBrowserDynamic.bootstrap;
	var AppComponent = app.AppComponent;

	document.addEventListener('DOMContentLoaded', function () {
		bootstrap(AppComponent);
	});


})( window.app || (window.app = {}));
