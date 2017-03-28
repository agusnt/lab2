var app = angular.module('myApp', []);
app.controller('lab0Ctrl', function($scope) {
	//Connect to STOMP over WS
	var socket = new SockJS('/twitter');
	client = Stomp.over(socket);
	client.connect({}, function(frame) {console.log(frame)}, function(err) {console.log(err);});

	sub = undefined;
    $scope.tweets= [];
    // New search
    this.tweets = function (){
		if(sub !== undefined){
			//Unsuscribe
			sub.unsubscribe();
			$scope.tweets=[];
		}

		//Get value and sent it
		var q_ = $("#q").val();
		//Subscribe
		client.send("/app/search", {}, q_);
		sub = client.subscribe("/queue/search/" + q_, function(m) {
            $scope.tweets.unshift(JSON.parse(m.body));
            $scope.$apply();
		});
      };
});
