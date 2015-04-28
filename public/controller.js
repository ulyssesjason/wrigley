(function(){

	var wrigleyApp = angular.module('wrigley-controller',[]);

	var videoController = wrigleyApp.controller('VideoController',function($scope, VideoService){
		$scope.videos = [];
		if(navigator.onLine){
			VideoService.listAll().then(function(response){
				var result = response.data;
				for(var i=0;i<result.length;i++){

					$scope.videos.push({
						address : result[i],
						name  : result[i],
						index : i
					});
				}
			});
		};
	});


	var imageController = wrigleyApp.controller('ImageController',function($scope, ImageService){
		$scope.images = [];
		if(navigator.onLine){
			ImageService.listAll().then(function(response){
				var result = response.data;
				for(var i=0;i<result.length;i++){

					$scope.images.push({
						address : result[i],
						name  : result[i],
						index : i
					});
				}
			});
		};
	});

})();