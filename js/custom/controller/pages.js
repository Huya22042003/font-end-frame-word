var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "home.html",
            controller : "homeCtrl"
        })
        .when("/login", {
            templateUrl: "login.html",
            controller : "loginCtrl"
        })
        .when("/subjects", {
            templateUrl: "subjects.html",
            controller: "subjectCtrl"
        })
        .when("/subjects/:id", {
            templateUrl: "question.html",
            controller: "questionCtrl"
        })
        .when("/information", {
            templateUrl: "information.html"
        })
        .otherwise({
            redirectTo: "/home"
        })
})
app.run(function($rootScope) {
    $rootScope.$on("$routeChangeStart", function() {
        $rootScope.loading = true;
    })
    $rootScope.$on("$routeChangeSuccess", function() {
        $rootScope.loading = false;
    })
    $rootScope.$on("$routeChangeError", function() {
        $rootScope.loading = false;
        alert("Lỗi, Không tải được template")
    })
})

app.filter('range', function() {
    return function(input, total) {
      total = parseInt(Math.ceil(total));
  
      for (var i=0; i<total; i++) {
        input.push(i);
      }
  
      return input;
    };
  });
