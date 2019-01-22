app.service(
  'startPlanningMyDaysService', [
    '$localStorage','$location', function ($localStorage,$location) {
      
      var svc = {};
      
      svc.GetDB = function () {
        
        return $localStorage.activityDB;
        
      };
      
      svc.CheckIfDBExists = function () {
        
        
        if (!$localStorage.activityDB) {
			
    			// create a test database to use while developing the code
    			activityDB = {
    				"activityDB": [
    				
    				]
    			};
    			
    			$localStorage.activityDB = activityDB;
    		
  		  }
        
      };
      
      
      
       // check DB if a event exists
      svc.CheckIfeventExists = function (event) {
        
        // use the method from above to get access to the database
        var activityDB = svc.GetDB(),
            e; // temporary variable
        
        // check if user already exists go through each database entry
				for (var i = 0; i < activityDB.activityDB.length; i++) {
					
					// fetch the event of the current database record
					e = activityDB.activityDB[i].event;
					

					
					
				}
				svc.LoginUserEvents = function (Date, index) {
        
        // container for current logged in user
        var userObj = {
          "date": $scope.Date,
          "position": index,
       
        };
        
        // make it persistent!
        $localStorage.loggedInUserEvents = userObj;
        
        // redirect
        svc.RedirectTo("/viewMySchedule");
        
      };
				// return false to indicate that we haven't found the username
				return false;
        
      };
     
      
      return svc;
      
    }
  ]
);