app.controller("subjectCtrl", function($scope, $http, $rootScope) {
    $http.get("../js/custom/repository/Subjects.js").then(function (response) {
        $scope.subjects = response.data;
    }, function (response) {
        alert("Lỗi tải lên dữ liệu");
    })
    
    $scope.begin = 0;
    $scope.next = function(length) {
        if($scope.begin < (Math.ceil(length / 5) - 1)*5) {
            $scope.begin += 5;
        }
    }
    $scope.prev = function() {
        if($scope.begin > 0) {
            $scope.begin -= 5;
        }
    }
    $scope.index = function(index) {
        $scope.begin = parseInt(index*5)
    }
});
