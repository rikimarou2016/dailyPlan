/**
 * Created by Razvan Dinita on 26/09/2016.
 */

app.controller (
	'LoginController', [
		'$scope', '$localStorage', 'LoginService', 'ProfileService', function ( $scope, $localStorage, LoginService, ProfileService )
		{
		  
		  var userDB;
		  
		  // check if DB exists, or create if not
		  LoginService.CheckIfDBExists();
		  
		  // fetch the database for use within this controller
		  userDB = LoginService.GetDB();
			
			// feedback message - empty at start
			$scope.message = "";
			
			// performs user login on login form submit
			$scope.CheckLogin = function () {
				
				// variables
				var uname, pass, // will hold the Form values
					u, p; // temporary - will hold the usernames and passwords as we iterate through the database
					
				// get the Form values
				uname = $scope.username;
				pass = btoa($scope.password); // btoa - BASE64 encode string
				
				// go through each database entry
				for (var i = 0; i < userDB.userDB.length; i++) {
					
					// fetch the username and password of the current database record
					u = userDB.userDB[i].uname;
					p = userDB.userDB[i].pass;
					
					// if Form values are within the database
					if (uname === u && pass === p) {
						
						// HURRAY! we found the user, log them in and redirect
						LoginService.LoginUser(uname, i);
						
						// update profile service
						ProfileService.UpdateLoggedInUser();
						
						// stop the function
						return;
						
					}
					
				}
				
				// prepare feedback message
				$scope.message = "INCORRECT!!";
				
			};
			
		}
	]
);
