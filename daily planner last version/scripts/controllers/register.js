/**
 * Created by Razvan Dinita on 25/10/2016.
 */

app.controller (
	'RegisterController', [
		'$scope', '$localStorage', 'LoginService', function ( $scope, $localStorage, LoginService )
		{
		  
		  var userDB;
		  
		  // check if DB exists, or create if not
		  LoginService.CheckIfDBExists();
		  
		  // fetch the database for use within this controller
		  userDB = LoginService.GetDB();
		  
			// feedback message - empty at start
			$scope.message = "";
			
			// allow the View to check if username exists
			// will be run when the username input value changes
			$scope.CheckIfUserExists = function () {
			  
			  // fetch the value
			  var uname = $scope.username;
			  
			  // check if username exists
			  if (LoginService.CheckIfUserExists(uname) === true) {
			    
			    // if so, set this so the View can react
			    $scope.registerForm.uName.$setValidity("usernameTaken", false);
			  
			  } else {
			    
			    // otherwise, inform the View just the same
			    $scope.registerForm.uName.$setValidity("usernameTaken", true);
			    
			  }
			  
			};
			
			// performs user login on login form submit
			$scope.CheckRegister = function () {
				
				// variables
				var userObject, // will hold the new user information that needs to go in the DB
				  uname, pass, passConfirm, // will hold the Form values
					u, // temporary - will hold the usernames as we iterate through the database
					found = false; // boolean - will indicate whether the user has been found in the database
				
				// get the Form values
				uname = $scope.username;
				pass = $scope.password;
				passConfirm = $scope.passwordConfirm;
				
				// check passwords - if they are NOT the same
				if (pass !== passConfirm) {
				  
				  // prepare feedback message
					$scope.message = "PASSWORDS NOT THE SAME, TRY AGAIN!";
					
					// stop the rest of the code from running
					return;
				  
				}
				  
			  // create user
			  userObject = {
			    "uname": uname,
					"pass": btoa(pass) // btoa - BASE64 encode string
			  };
			  
			  // add it to the DB
			  userDB.userDB.push(userObject);
			  
			  // update localStorage
			  $localStorage.userDB = userDB;
			  
			  //log them in and redirect
				LoginService.LoginUser(uname, userDB.userDB.length - 1);
				
			};
			
		}
	]
);
