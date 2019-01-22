/**
 * Created by Razvan Dinita on 01/11/2016.
 */
 
app.service(
  'ProfileService', [
    '$localStorage', 'LoginService', function ($localStorage, LoginService) {
      
      // service feature container
      var svc = {},
          // current logged in user container
          user;
      
      // run every time a new user logs in
      svc.UpdateLoggedInUser = function () {
        
        // update user variable
        user = LoginService.GetLoggedInUser();
        
        // if current logged in user doesn't have a set of preferences
        if (!$localStorage.userDB.userDB[user.position].preferences) {
        
          // create the preferences container for them
          $localStorage.userDB.userDB[user.position].preferences = {};
          
        }
        
      };
      
      // generic function used in storing user preferences
      svc.SetPreference = function (preference, value) {
        
        // save this preference
        // ex:
        // initially, preferences JSON object looks like:
        /*
          {
            // empty
          }
          
          then, once we try to set a preference like this:
          $localStorage.userDB.userDB[user.position].preferences[preference] = value;
          
          it will turn into:
          {
            preference: value
          }
          
          more specifically:
          $localStorage.userDB.userDB[user.position].preferences["appFontColour"] = "red";
          
          ==>
          
          {
            "appFontColour": "red"
          }
          
        */
        $localStorage.userDB.userDB[user.position].preferences[preference] = value;
        
      };
      
      // retrieve the value for a specified preference
      svc.GetPreference = function (preference) {
        
        // return the value
        return $localStorage.userDB.userDB[user.position].preferences[preference];
        
      };
      
      // return container so Angular can use it
      return svc;
      
    }
  ]
);