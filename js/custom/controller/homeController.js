app.controller("homeCtrl", async function($rootScope, $http) {
    await $http.get("../js/custom/repository/Subjects.js").then(function (response) {
        $rootScope.subjectsMenu = response.data;
    }, function (response) {
        alert("Lỗi tải lên dữ liệu")
    })
});