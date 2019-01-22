/**
 * Created by Razvan Dinita on 26/09/2016.
 */

app.controller(
  'viewMyScheduleController', [
    '$scope', '$interval', '$localStorage','LoginService',
    function($scope, $interval, $localStorage,LoginService)
    {
      
      	var user = LoginService.GetLoggedInUser();
      	 $scope.user = user;
      // creating a digital Clock
      var giveTime = function() {
        $scope.myClock = new Date();
      };
      
      // run the above immediately
      giveTime();
      // then run it every second starting with 1 second from now
      $interval(giveTime, 1000);
      
      $scope.firstName = $localStorage.userDB.userDB[0].fname;

      //funtion to find today's date
      $scope.calendar = new Date();

      //  create Analogue clock
      var $hands = angular.element('#liveclock div.hand');

      window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(f) {
        setTimeout(f, 60);
      };

      function updateclock() {
        var curdate = new Date();
        var hour_as_degree = (curdate.getHours() + curdate.getMinutes() / 60) / 12 * 360;
        var minute_as_degree = curdate.getMinutes() / 60 * 360;
        var second_as_degree = (curdate.getSeconds() + curdate.getMilliseconds() / 1000) / 60 * 360;
        $hands.filter('.hour').css({
          transform: 'rotate(' + hour_as_degree + 'deg)'
        });
        $hands.filter('.minute').css({
          transform: 'rotate(' + minute_as_degree + 'deg)'
        });
        $hands.filter('.second').css({
          transform: 'rotate(' + second_as_degree + 'deg)'
        });
        requestAnimationFrame(updateclock);
      }

      requestAnimationFrame(updateclock);

    }

  ]
);