(function(app) {

	var Component = ng.core.Component;
	var TimeService = app.TimeService;

	app.CurrentTimeComponent = Component({
		selector: 'current-time',
		template: '<em>{{currentTime}}</em>'
	})
	.Class({
		constructor: [TimeService, function CurrentTimeComponent(timeService) {
			var self = this;

			// setInterval(function () {
			// 	self.currentTime = timeService.getCurrentTime();
			// }, 1000);
			timeService.getCurrentTime(function(currentTime) {
				self.currentTime = currentTime.toLocaleTimeString();
			});
		}]
	});

})( window.app || (window.app = {}));
