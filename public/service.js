(function(){

	var wrigleyApp = angular.module('wrigley-service',[]);

	wrigleyApp.factory('VideoService',function($http){
		return {	
			listAll : function(){
				return $http.get('/api/videos')
				.success(function(data, status, config, headers){
					return data
				}).error(function(data, status, config, headers){
					alert("couldn't fetch data, status: " + status)
				})
			}
		}
	});

	wrigleyApp.factory('ImageService',function($http){
		return {	
			listAll : function(){
				return $http.get('/api/images')
				.success(function(data, status, config, headers){
					return data
				}).error(function(data, status, config, headers){
					alert("couldn't fetch data, status: " + status)
				})
			}
		}
	});


	
})();