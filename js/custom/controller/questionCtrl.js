app.controller("questionCtrl",  function ($scope, $http, $routeParams, $timeout, $rootScope) {
    $scope.id = $routeParams.id;
    $scope.subject = {};
    $scope.cauChon = [];
    $scope.luaChon = 2

    if ($rootScope.subjects) {
        $scope.subject = $rootScope.subjects.filter(el => {
            return el.Id == $scope.id
        })[0]
    } else {
        window.history.back()
        alert("Lỗi tải lên dữ liệu");
    }
    $http.get("../js/custom/repository/Quizs/" + $scope.id + ".js").then(function (response) {
        getRandom(response.data, 10).map(el => {
            $scope.cauChon.push({
                "Id": el.Id,
                "Text": el.Text,
                "Marks": el.Marks,
                "AnswerId": el.AnswerId,
                "Answers": el.Answers,
                "Mark": 0,
                "answered": false
            })
        })
    }, function (response) {
        if (response.status == 404) {
            window.history.back()
            alert("Lỗi tải lên dữ liệu");
        }
    })

    $scope.counter = 30;
    $scope.phanTram = 100;
    var soPhanTram = 100;
    $scope.timeBatDau = $scope.counter;
    var mytimeout = null;
    $rootScope.save = false;
    $scope.batDau = function () {
        $scope.luaChon = 1;
        $rootScope.save = true;
        $scope.onTimeout = function () {
            if ($("#myModal").modal()[0].ariaHidden) {
                $scope.counter--;
                soPhanTram = $scope.counter * 100 / $scope.timeBatDau;
                $scope.phanTram = soPhanTram.toFixed(2)
            }
            if ($scope.counter == 0) {
                $scope.ketThuc()
                return;
            }
            mytimeout = $timeout($scope.onTimeout, 1000);
        };
        mytimeout = $timeout($scope.onTimeout, 1000);
    }

    $scope.ketThuc = function() {
        $scope.luaChon = 3;
        let diem = parseInt($rootScope.student.marks);
        diem += $scope.soCauTlDung;
        $rootScope.student.marks = diem;
        $rootScope.students.filter(el => {
            return el.email == $rootScope.student.email
        })[0].marks = diem;
        $rootScope.save = false;
        $timeout.cancel(mytimeout);
    }

    $scope.lamLai = function() {
        $scope.luaChon = 2
        $scope.counter = 30;
        $scope.phanTram = 100;
        soPhanTram = 100;
        $scope.timeBatDau = $scope.counter;
        $scope.soCauTlDung = 0;
        $scope.index(0)
        cauDaChon = $scope.cauChon.map(el => {
            el.Mark = 0;
            el.answered = false;
            return el;
        });
    }

    $scope.$on('$locationChangeStart', function( event, oldState ) {
        if($rootScope.save == true) {
            var answer = confirm("Bạn muốn lưu điểm và rời khỏi trang?")
            if (!answer) {
                event.preventDefault();
                $rootScope.loading = false;
            } else {
                $scope.ketThuc();
            }
        }
    });

    $scope.stop = function () {
        $timeout.cancel(mytimeout);
    }

    $scope.soCauTlDung = 0;
    $scope.check = function (idAnswer, idAnswerTrue, idQuestion) {
        let cauDaChon = {};

        cauDaChon = $scope.cauChon.filter(el => {
            return el.Id == idQuestion
        })[0];

        if(cauDaChon.answered == true) {
            $("#error").html(`<div class="alert alert-danger d-flex align-items-center" role="alert">
            <div>
              Câu hỏi đã được trả lời. Chọn câu hỏi khác !!!
            </div>
          </div>`)
            $("#myModal").modal('show');
            return;
        }

        if (idAnswer == idAnswerTrue) {
            $("#error").html("<img src='../img/true.gif'>")
            $scope.soCauTlDung++;
            cauDaChon.Mark = 1;
        } else {
            $("#error").html("<img src='../img/false.gif'>")
            cauDaChon.Mark = -1;
        }
        cauDaChon.answered = true;
        $scope.next($scope.cauChon.length);
        $("#myModal").modal('show');
    }

    $scope.begin = 0;
    $scope.next = function (length) {
        if ($scope.begin < (Math.ceil(length) - 1)) {
            $scope.begin += 1;
        }
    }

    $scope.index = function (index) {
        $scope.begin = parseInt(index)
    }


});

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
