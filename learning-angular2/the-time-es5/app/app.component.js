(function(app) {

	var Component = ng.core.Component;
	var TimeService = app.TimeService;
	var CurrentTimeComponent = app.CurrentTimeComponent;

	app.AppComponent = Component({
		selector: 'my-app',
		directives: [CurrentTimeComponent],
		providers: [TimeService],
		template:
			'<h1>Current time</h1>' +
			'<p><current-time></current-time></p>'
	})
	.Class({
		constructor: function AppComponent() {

		}
	});


})( window.app || (window.app = {}));
