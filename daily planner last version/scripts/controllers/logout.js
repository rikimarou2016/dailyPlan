/**
 * Created by Razvan Dinita on 08/11/2016.
 */

app.controller (
	'LogoutController', [
		'$localStorage', '$location', function ( $localStorage, $location )
		{
		  
		  // logout the user
		  // delete their logged in info from the local storage
		  delete $localStorage.loggedInUser;
		  
		  // redirect user to login
		  $location.path('/login');
		  
		}
	]
);