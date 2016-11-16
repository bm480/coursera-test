(function () {
'use strict';

angular.module('solution1', [])
.controller('solution1Controller', solution1Controller);

solution1Controller.$inject = ['$scope'];
function solution1Controller($scope) {
  $scope.message = "";
  $scope.lunchMenu = "";

  $scope.checkIfTooMuch = function () {
    console.log($scope.lunchMenu)
    // check if value entered is not empty
    if ($scope.lunchMenu == "") {
      $scope.message = "Please enter data first";
    }
    // check if comma separated list of menu-items does not exceed the maximum, only counting non-empty items
    else if ($scope.lunchMenu.split(",").filter(removeEmptyItems).length <= 3) {
      $scope.message = "Enjoy!";
    }
    // maximum has been reached
    else {
      $scope.message = "Too much!";
    }
  }

  function removeEmptyItems(item) {
    return item.trim() != "";
  }

}

})();
