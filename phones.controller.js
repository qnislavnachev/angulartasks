var myModule = angular.module("PhoneList", ['ngRoute']);

myModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/',{
		template: '<phone-list></phone-list>'
	}).when('/:phoneId',{
		template: '<view-details></view-details>'
	}).otherwise('/');
}]);

myModule.controller('PhoneController', function PhoneController($http) {
	var self = this;
	self.sort = 'name';

	$http.get('phoneList.json').then(function(response) {
		self.phoneList = response.data;
	});
});

myModule.component('viewDetails', {
	templateUrl: 'details.template.html',
	controller: ['$routeParams', function ViewDetails($routeParams) {
		this.phone = $routeParams.phoneId;
	}]
});

myModule.component("phoneList", {
	templateUrl: 'phones.template.html',
	controller: 'PhoneController'
});