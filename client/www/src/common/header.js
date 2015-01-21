starterControllers
.controller('HeaderCtrl', function ($scope, $rootScope, fireBaseData, $ionicPopover, $ionicHistory, $state) {
  //authentication
  $rootScope.authData = fireBaseData.ref().getAuth();
  $rootScope.getUserDisplayName = function () {
    if ($rootScope.authData === null) {
      return null;
    }
    else if ($rootScope.authData.provider === 'google') {
      return $rootScope.authData.google.displayName.split(' ')[0];
    }
    else if ($rootScope.authData.provider === 'facebook') {
      return $rootScope.userDisplayName = $rootScope.authData.facebook.displayName.split(' ')[0];
    }
    else if ($rootScope.authData.provider === 'twitter') {
      return $rootScope.authData.twitter.displayName.split(' ')[0];
    }
    else if ($rootScope.authData.provider === 'password') {
      if ($rootScope.authData.user == null) {
        return '';
      }
      return $rootScope.authData.user.firstname;
    }
  };
  $rootScope.getReputationIcon = function () {
    var number = Math.round($rootScope.authData.reputation);
    if(number <10){
      number = '0' + number;
    }
    return 'http://google-maps-icons.googlecode.com/files/red' + number + '.png'
  };
  //console.log($rootScope.authData);
  $ionicPopover.fromTemplateUrl('src/auth/popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
  /* LOGOUT BUTTON */
  $rootScope.logout = function () {
    $ionicHistory.clearCache();
    fireBaseData.ref().unauth();
    $rootScope.checkSession();
    $rootScope.notify("Logged out successfully!");
    $scope.popover.hide();
  };

  $rootScope.checkSession = function () {
    $rootScope.authData = fireBaseData.ref().getAuth();
    $rootScope.hide();
    $state.go('home');

  };
});
