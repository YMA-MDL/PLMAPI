var accountApp = angular.module('accountmanagement', ['ngRoute' ]);

accountApp.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/templates/accounts.html',
      controller: 'accountCtrl'
    }).otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }]);
  

accountApp.controller('accountCtrl', ['$scope','$http',function($scope, $http){
    
    $scope.selectedAccount = '0';
    $scope.selectAccount = function(account){
        console.log(account.id);
        $scope.selectedAccount= account.id;
    }
    $scope.addUser = function(newuser){
        newuser.createdSince = Date.now();
        newuser.account = $scope.selectedAccount;
            console.log(newuser);
        $http.post('/user', newuser).then(function successCallback(response) {
            $scope.users.push(response.data);
        }, function errorCallback(response) {
            console.log(response);
        });
        
        $scope.newaccount={};
    };
    $scope.addAccount = function(newaccount){
        newaccount.createdSince = Date.now();
        $http.post('/account', newaccount).then(function successCallback(response) {
            $scope.accounts.push(response.data);
        }, function errorCallback(response) {
        console.log(response);
        });
        
        $scope.newaccount={};
    };
    
    $scope.accounts = [];
    $http.get('/account').then(function successCallback(response) {
        $scope.accounts = response.data;
    }, function errorCallback(response) {
        console.log(response);
    });
    
    $scope.users = [];
    $http.get('/user').then(function successCallback(response) {
        $scope.users = response.data;
        console.log($scope.users);
    }, function errorCallback(response) {
        console.log(response);
    });
    
        
}]);

