/**
 * Created by Razvan Dinita on 25/10/2016.
 */
 
app.service(
  'LoginService', [
    '$localStorage', '$location', function ($localStorage, $location) {
      
      // service feature container
      var svc = {};
      
      // give access to the existing database
      svc.GetDB = function () {
        
        return $localStorage.userDB;
        
      };
      
      // if DB doesn't exist, create it 
      svc.CheckIfDBExists = function () {
        
        if (!$localStorage.userDB) {
			
    			// create a test database to use while developing the code
    			userDB = {
    				"userDB": [
    					{
    						"uname": "John",
    						"pass": btoa("password1") // btoa - BASE64 encode string
    					},
    					{
    						"uname": "Mike",
    						"pass": btoa("password2")
    					}
    				]
    			};
    			
    			// make it persistent
    			$localStorage.userDB = userDB;
    			
  		  }
        
      };
      
      // check DB if a userName exists
      svc.CheckIfUserExists = function (userName) {
        
        // use the method from above to get access to the database
        var userDB = svc.GetDB(),
            u; // temporary variable
        
        // check if user already exists go through each database entry
				for (var i = 0; i < userDB.userDB.length; i++) {
					
					// fetch the username of the current database record
					u = userDB.userDB[i].uname;
					
					// if username Form value is the same as current DB record
					// compare the lower case values for case insensitive checks
					if (userName.toLowerCase() === u.toLowerCase()) {
						
						// OH NO! we found the user, prepare feedback message
						// return true to reflect the result
						return true;
						
					}
					
				}
				
				// return false to indicate that we haven't found the username
				return false;
        
      };
      
      // login a user
      svc.LoginUser = function (username, index) {
        
        // container for current logged in user
        var userObj = {
          "username": username,
          "position": index,
          "time": new Date()
        };
        
        // make it persistent!
        $localStorage.loggedInUser = userObj;
        
        // redirect
        svc.RedirectTo("/viewMySchedule");
        
      };
      
      // get the current logged in user
      svc.GetLoggedInUser = function () {
        
        // if exists
        if ($localStorage.loggedInUser) {
          
          // return the logged in user object from local storage
				  return $localStorage.loggedInUser;
			  
        }
        
        // no logged in user exists!
        return undefined;
        
      };
      
      // redirect user
      svc.RedirectTo = function (location) {
        
        // redirect user
        $location.path(location);
        
      };
      
      // give AngularJS the ability to use this service's features
      return svc;
      
    }
  ]
);