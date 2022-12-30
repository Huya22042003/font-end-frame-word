let dem = 0;
app.controller("loginCtrl", function ($scope, $rootScope, $http) {
    dem++;

    if (dem == 1) {
        $rootScope.students = [];

        $http.get("../js/custom/repository/Students.js").then(function (response) {
            $rootScope.students = response.data;
        }, function (response) {
            alert("Lỗi tải lên dữ liệu")
        })
    }

    $rootScope.student = undefined;
    $scope.email = "";
    $scope.passWord = "";
    $scope.login = function () {
        console.log($rootScope.students);
        if (!$scope.email) {
            alert("Email sai định dạng");
            return;
        }
        if (!$scope.passWord) {
            alert("PassWord không được để trống")
            return;
        }
        $rootScope.student = $rootScope.students.filter(el => {
            return el.email == $scope.email && el.password == $scope.passWord && el.gender == "true"
        })[0];
        if ($rootScope.student == undefined) {
            $("#error").html(
                `<div class="alert alert-danger d-flex align-items-center" role="alert">
                    <div>
                        Tài khoản hoặc mật khẩu không đúng !!!
                    </div>
                </div>`
            )
            $("#myModal").modal('show');
            return;
        }
        window.location.replace("#home");
        $("#error").html(
            `<div class="alert alert-success d-flex align-items-center" role="alert">
                    <div>
                        WelCome, `+ $rootScope.student.fullname + `.
                    </div>
                </div>`
        )
        $("#myModal").modal('show');
    }

    $rootScope.logOut = function () {
        if ($rootScope.save == false) {
            $rootScope.student = undefined;
            $rootScope.subjects = undefined;
        }
    }

});