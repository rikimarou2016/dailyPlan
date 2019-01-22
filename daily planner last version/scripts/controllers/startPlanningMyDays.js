app.controller(
  'StartPlanningMyDaysController', [
    '$scope','$localStorage', 'startPlanningMyDaysService',
    function($scope, $localStorage, startPlanningMyDaysService ) {

      angular.element("#Date").datepicker();
       
       $(document).ready(function() {
                    // create TimePicker from input HTML element
                    angular.element("#timepicker").kendoTimePicker();
                });
		$(function() {
        angular.element('#duration').timeDurationPicker({
          onSelect: function(element, seconds, duration) {
            $('#seconds').val(seconds);
            $('#duration').val(duration);
          }
        });
      });
      
      
      
      
		  var activityDB;
		
		  var showEvent = function() {
        $scope.event ;
      };
      
      
		  // check if DB exists, or create if not
		  startPlanningMyDaysService.CheckIfDBExists();
		  
		  // fetch the database for use within this controller
		  activityDB = startPlanningMyDaysService.GetDB();
		  
			// feedback message - empty at start
			$scope.message = "";
			
			// allow the View to check if event exists
		
			
			
			$scope.CheckStartPlanningMyDays = function () {
				
				// variables
				var userObject, // will hold the new user information that needs to go in the DB
				  action,date,time,duration, // will hold the Form values
					//e,d, // temporary - will hold the usernames as we iterate through the database
					found = false; // boolean - will indicate whether the user has been found in the database
				
				// get the Form values
				date=$scope.Date;
        time=$scope.timepicker;
			  action = $scope.event;
			  duration=$scope.duration;
			  
			  // create event
			  userObject = {
			   
			    "Date": $scope.Date,
			    "Time":$scope.timepicker,
			    "Duration":$scope.duration,
				  "Action": action,
			  };
			  
			  // add it to the DB
			  activityDB.activityDB.push(userObject);
			  
			  // update localStorage
			  $localStorage.activityDB = activityDB;
			  
			  
			};
			
				$scope.CheckLoginEvents = function () {
				
				// variables
			 // will hold the Form values
				var DateSelected,	
				d, 
				// get the Form values
				DateSelected =  $scope.Date;
			
				
				// go through each database entry
				for (var i = 0; i < activityDB.activityDB.length; i++) {
					
					// fetch the date of the current database record
					d = activityDB.activityDB[i].DateSelected;
				
					
					// if Form values are within the database
					if (DateSelected === d ) {
						
						// HURRAY! we found the user, log them in and redirect
						startPlanningMyDaysService.LoginUserEvents(d, i);
						
						// update profile service
					//	ProfileService.UpdateLoggedInUser();
						
						// stop the function
						return;
						
					}
				  
				}
				  
	 	};
			
		}
	]
);
