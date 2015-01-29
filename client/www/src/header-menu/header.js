starterControllers
.controller('HeaderCtrl', function ($scope, $rootScope, fireBaseData, $ionicPopover, $ionicHistory, $state, $mdSidenav, $location) {
  var updateAuth = function () {
    var authData = fireBaseData.ref().getAuth();
    if (authData) {
      var ref = fireBaseData.refUsers().child(authData.uid);
      ref.on("value", function (snap) {
        $rootScope.authData = snap.val();
        $rootScope.authData.userDisplayName = fireBaseData.getUserDisplayName($rootScope.authData);
        $rootScope.authData.userProfilePicture = fireBaseData.getUserProfilePicture($rootScope.authData);
      });
    }
  };
  $scope.$on('updateauth', function () {
    updateAuth();
  });
  fireBaseData.ref().onAuth(function() {
    updateAuth();
  });
  $rootScope.getReputationIcon = function () {
    var number = Math.round($rootScope.authData.reputation);
    if (number < 10) {
      number = '0' + number;
    }
    return 'http://google-maps-icons.googlecode.com/files/red' + number + '.png'
  };

  $ionicPopover.fromTemplateUrl('src/auth/popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });
  /* LOGOUT BUTTON */
  $rootScope.logout = function () {
    $ionicHistory.clearCache();
    fireBaseData.ref().unauth();
    $scope.checkSession();
    $rootScope.notify("Logged out successfully!");
    $scope.popover.hide();
  };

  $scope.checkSession = function () {
    $rootScope.authData = fireBaseData.ref().getAuth();
    $rootScope.hide();

  };
  $scope.toggleLeftMenu = function () {
    $mdSidenav('left').toggle();
  };
  //workaround to avoid reloading HomeCtrl
  $scope.displayHome = function(homeID) {
      $state.go('home').then(function() {
        $state.go('home.display', {'id': homeID});
      });
  }
  $state.go('home');
});

