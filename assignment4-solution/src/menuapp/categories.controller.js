(function () {
'use strict';

angular.module('MenuApp')
.controller('Categories', CategoriesController);

CategoriesController.$inject = ['categories'];
function CategoriesController(categories) {
  var controller = this;

  controller.categories = categories;
}

})();
