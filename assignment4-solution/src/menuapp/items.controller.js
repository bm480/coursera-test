(function () {
'use strict';

angular.module('MenuApp')
.controller('Items', ItemsController);

ItemsController.$inject = ['items', 'category'];
function ItemsController(items, category) {
  var controller = this;

  controller.items = items;
  controller.category = category;
}

})();
