(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ShoppingListToBuyController', shoppingListToBuyController)
.controller('ShoppingListAlreadyBoughtController', shoppingListAlreadyBoughtController)
.service('ShoppingListCheckOffService', shoppingListCheckOffService);

function shoppingListCheckOffService() {

  var toBuyItems = [
    {name: 'Creamy Cookies', quantity: 10},
    {name: 'Dark Brown Cookies', quantity: 15},
    {name: 'Light Sugary Cookies', quantity: 5},
    {name: 'Salty Cookies', quantity: 35},
    {name: 'Crunchy Cookies', quantity: 56}
  ];

  var alreadyBoughtItems = [];

  this.buyItem = function (itemIndex) {
    alreadyBoughtItems.push(toBuyItems[itemIndex]);
    toBuyItems.splice(itemIndex, 1);
  };

  this.getToBuyItems = function () {
    return toBuyItems;
  };

  this.getAlreadyBoughtItems = function () {
    return alreadyBoughtItems;
  };

}

shoppingListToBuyController.$inject = ['ShoppingListCheckOffService'];
function shoppingListToBuyController(ShoppingListCheckOffService) {
  this.items = ShoppingListCheckOffService.getToBuyItems();
  this.buyItem = ShoppingListCheckOffService.buyItem;
}

shoppingListAlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function shoppingListAlreadyBoughtController(ShoppingListCheckOffService) {
  this.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
}

})();
