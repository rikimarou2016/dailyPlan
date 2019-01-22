/**
 * Created by Razvan Dinita on 26/09/2016.
 */

app.controller (
	'NavigationController', [
		'$scope', 'LoginService', '$location', '$filter', 'GlobalConfig', function ( $scope, LoginService, $location, $filter, GlobalConfig )
		{

			// JSON notation
			$scope.navItems = [
				{
					link : '/viewMySchedule',
					title: 'View my schedule',
					isPrivate: true
				},
				{
					link : '/login',
					title: 'Login',
					hideWhenLoggedIn: true
				},
				{
					link : '/register',
					title: 'Register',
					hideWhenLoggedIn: true
				},
				{
				  link: '/startPlanningMyDays',
				  title: 'Start planning my days',
				  isPrivate: true
				},
				{
				  link: '/logout',
				  title: 'Logout',
				  isPrivate: true
				}
			];
			
			// default page to load
			var defaultRoute = GlobalConfig.defaultRoute;
			
			// this construct will "watch" the value of $location.path()
			// when it detects a change, it runs the 2nd function, passing it both the new and old values
			$scope.$watch (
				function () { return $location.path (); }, function ( newValue /*, oldValue*/ )
				{
					// e.g.: newValue = '/dashboard'
					// extract navigation item object from the navItems array
					// when looking through an array, the $filter returns an array containing 0 or more items matching the filter
					// so, hopefully every time it'll give us an array with just one element, so we access it right away with [0]
					// if the array is empty, accessing the first element will give us 'undefined', which evaluates to FALSE for the purposes of the next if statement
					var requestedRoute = $filter ( 'filter' ) ( $scope.navItems, { link: newValue }, true ) [ 0 ];

          console.log("DEBUG: Route array information as returned by filter: ", requestedRoute);

					// no point going forward with the if statements if there is no route information available
					if ( !requestedRoute )
					{
					  console.log("DEBUG: Route array information is not available. Potentially first page load.");
						return;
					}

					// check whether requested route is private and if current user is indeed logged in
					if (
						// the route has the flag and is true
					  requestedRoute.isPrivate &&
						// currentUser is not set
						!LoginService.GetLoggedInUser ()
					)
					{
            
            console.log("DEBUG: User is not logged in, Route is private. Redirecting to /login...");

						// redirect to login page if not
						$location.path ( '/login' );
						
						// stop function
						return;

					}
					// if requested route should be hidden while user is logged in and the user is indeed logged in
					else if (
						// the route has the flag and is true
					  requestedRoute.hideWhenLoggedIn &&
					  // currentUser object exists in local storage
					  LoginService.GetLoggedInUser ()
					)
					{

            console.log("DEBUG: User is already logged in. Route is hidden when logged in. Redirecting to " + defaultRoute + "...");
  
						// redirect them to a default page
						$location.path ( defaultRoute );
						
						// stop function
						return;

					}
					
					// otherwise don't touch the route request, allow it

				}
			);
			
			// method to be used by the navigation part of index.html to determine whether a navigation item should appear in the View
			// navItem - an item as defined within the $scope.navItems array
			$scope.ShowMenuItem = function ( navItem )
			{

        // assume the item needs to be hidden
				var outcome = false;

				// case 1: item is only visible to logged in users
				if (
					navItem.isPrivate && LoginService.GetLoggedInUser ()
				)
				{ outcome = true; }
				// case 2: item is only visible to guest users
				else if (
					navItem.hideWhenLoggedIn && !LoginService.GetLoggedInUser ()
				)
				{ outcome = true; }
				// case 3: item has no flag or both are false, just display it
				else if (
					!navItem.isPrivate && !navItem.hideWhenLoggedIn
				)
				{ outcome = true; }

				// return the result
				return outcome;

			};

		}
	]
);
