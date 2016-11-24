(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.directive('foundItems', FoundItems)
.controller('FoundItemsController', FoundItemsController)
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      foundItems: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: FoundItemsController,
    controllerAs: 'list',
    bindToController: true,
    restrict: 'E'
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService']
function NarrowItDownController(MenuSearchService) {
  var controller = this;

  controller.found = [];

  controller.removeItem = function(index) {
    controller.found.splice(index, 1);
  }

  controller.searchButtonClickHandler = function() {
    controller.found = [];
    if (!controller.searchTerm) {
      controller.message = "Nothing found!"; // "Search term must not be empty!";
    }
    else {
      controller.loading = true;
      MenuSearchService.getMatchedMenuItems(controller.searchTerm).then(function (foundItems) {
          controller.message = foundItems.length == 0 ? "Nothing found!" : "";
          controller.found = foundItems;
          controller.searchTerm = "";
          controller.loading = false;
      });
    }
  }

}

function FoundItemsController() {

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    var request = {
      method: "GET",
      url: (ApiBasePath +"/menu_items.json")
    };

    return $http(request).then(function (result) {
      // process result and only keep items that match
      searchTerm = searchTerm.toLowerCase();
      var foundItems = result.data.menu_items.filter(function (item) {
        return item.description.toLowerCase().indexOf(searchTerm) >= 0; // || item.name.toLowerCase().indexOf(searchTerm) >= 0
      });
      // return processed items
      return foundItems;
    });

  }

}

})()
