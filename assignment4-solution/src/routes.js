(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig)
.run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('index', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/categories.template.html',
    controller: 'Categories',
    controllerAs: 'CategoriesList',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Items page
  .state('items', {
    url: "/items/{categoryName}/{category}",
    templateUrl: 'src/menuapp/templates/items.template.html',
    controller: 'Items',
    controllerAs: 'ItemsList',
    resolve: {
      items: ["$stateParams", "MenuDataService", function ($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.categoryName);
      }],
      category: ["$stateParams", function ($stateParams) {
        return $stateParams.category;
      }]
    }
  });

}

})();
