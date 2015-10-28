// public/js/app.js
angular.module('sampleApp', 
	['ngRoute', 
	'appRoutes',
	'creepyweb.popularcontroller', 
	'creepyweb.maincontroller',
	'creepyweb.searchcontroller',
	'MainService', 
	'creepyweb.latestcontroller', 
	'CreepyWeb.CreepypastaService', 
	'creepyweb.creepypastacontrollers',
	'creepyweb.usercontroller',
	'creepyweb.userservice',
	'creepyweb.localstorage',
	'ui.bootstrap'])

.constant('SERVER', {
  // local server
  url: 'http://localhost:8080'

  // external server
  //url: 'http://sacredcowgaming.com:3001'
});
