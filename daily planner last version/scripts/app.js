/**
 * Created by Razvan Dinita on 26/09/2016.
 */

var app = angular.module ( 'MobileTech', [ 'ngRoute', 'ngStorage' ] );

app.constant(
  'GlobalConfig',
  {
    defaultRoute: '/viewMySchedule'
  }
);

app.config (
	[
		'$routeProvider', 'GlobalConfig',
		function ( $routeProvider, GlobalConfig )
		{

			// DEFAULT APP PAGE
			var defaultRoute = GlobalConfig.defaultRoute;

			// ROUTE / PAGE CONFIGURATION - WHEN USER ACCESSES THE FOLLOWING LINKS, LOAD THE APPROPRIATE VIEWS / PAGES
			$routeProvider
				.when (
					'/viewMySchedule', {
						templateUrl: 'views/viewMySchedule.html'
					}
				)
				.when (
					'/login', {
						templateUrl: 'views/login.html'
					}
				)
				.when (
					'/register', {
						templateUrl: 'views/register.html'
					}
				)
				.when (
					'/startPlanningMyDays', {
						templateUrl: 'views/startPlanningMyDays.html'
					}
				)
				.when (
				  '/logout', {
				    // this route / page will use this Controller, rather than have it linked through the View template
				    controller: 'LogoutController',
				    // any route requires a template, so instead of assigning a URL,
				    // we can just give it an empty template string to satisfy the AngularJS requirements
				    template: ''
				  }
				)
				// IF THE USER REQUESTS AN UNRECOGNISED LINK, REDIRECT THEM TO THE DEFAULT ONE
				.otherwise (
					{
						redirectTo: defaultRoute
					}
				);
		}
	]
);
