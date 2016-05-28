angular.module('starter')
	.controller('mainCtrl', function($scope, $ionicPopup) {

		//
		// Array to store all clipz
		//
		$scope.allNoteClipz = [];

		// window.localStorage.setItem("noteClipz", JSON.stringify($scope.allNoteClipz));

		if (window.localStorage.getItem("noteClipz") !== undefined
				&& JSON.parse(window.localStorage.getItem("noteClipz")) !== "") {
			$scope.allNoteClipz = JSON.parse(window.localStorage.getItem("noteClipz"));
		}
		//
		// Prompt user to enter input
		//
		$scope.addToClipz = function() {
			$scope.data = {};

			// An elaborate, custom popup
			var myPopup = $ionicPopup.show({
				template: '<input type="text" ng-model="data.tag" placeholder=" Tag"><br>' +
				'<textarea ng-model="data.content" rows="4" placeholder=" Content"></textarea>',
				title: 'Enter Tag and content',
				scope: $scope,
				buttons: [
					{ text: 'Cancel' },
					{
						text: '<b>Save</b>',
						type: 'button-positive',
						onTap: function(e) {
							if (!$scope.data.tag && !$scope.data.content) {
								//don't allow the user to close unless he enters clip
								e.preventDefault();
							} else {
								return $scope.data;
							}
						}
					}
				]
			});

			//
			// Add to clipz collection
			//
			myPopup.then(function(res) {
				if (res != undefined) {
			    var obj = {};

			    obj.tag = res.tag;
					obj.content = res.content;
					obj.date = '';

					$scope.allNoteClipz.push(obj);
					window.localStorage.setItem("noteClipz", JSON.stringify($scope.allNoteClipz));
				}
			});

		};

		//
		// Remove the clip
		//
		$scope.removeClip = function (index) {
			$scope.allNoteClipz.splice(index, 1);
			window.localStorage.setItem("noteClipz", JSON.stringify($scope.allNoteClipz));
		};
	});