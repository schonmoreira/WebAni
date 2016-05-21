/**
 * Webaniversario app
 * by Arthur Annibal
 * v 0.0.0
 */


var app = angular.module('webaniversario', ['ngRoute']);

scotchApp.config(function($routeProvider) {
	$routeProvider

		// Login page
		.when('/login', {
			templateUrl : 'views/login.html',
			controller  : 'loginController'
		})
		
		// Admin dashboard
		.when('/admin/', {
			templateUrl : 'views/elements.html',
			controller  : 'mainController'
		})

		// Party edit page
		.when('/admin/festa', {
			templateUrl : 'views/party.html',
			controller  : 'festaController'
		})

		// User edit page
		.when('/admin/usuario', {
			templateUrl : 'views/user.html',
			controller  : 'userController'
		})
});