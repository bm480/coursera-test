(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;

  service.getAllCategories = function () {
    var request = {
      method: "GET",
      url: (ApiBasePath +"/categories.json")
    };

    return $http(request).then(function (result) {
      return result.data;
    });
  }

  service.getItemsForCategory = function (categoryShortName) {
    var request = {
      method: "GET",
      url: (ApiBasePath +"/menu_items.json?category=" + categoryShortName)
    };

    return $http(request).then(function (result) {
      return result.data.menu_items;
    });
  }

}

})();
