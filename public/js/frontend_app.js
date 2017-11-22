console.log('loaded frontend_app');

var frontend_app = angular.module('employees', []);
frontend_app.controller('data', data_stuff);

function data_stuff($scope, $http) {
    console.log('inside datastuff');
    $scope.message = 'howdy';
    $scope.read = function () {
        console.log('reading data from backend');
        $http.get('/api/v3/read').then(function (employees){
           // console.log(employees);
            $scope.employees = employees.data;
        });
    }
    $scope.read();

    $scope.create = function () {
        console.log('creating employee');
        var data = {
            name: $scope.input_name,
            gender: $scope.input_gender,
            job: $scope.input_job
        }
        $http.post('/api/v3/create', data).then(function (result){
            console.log(result);
            $scope.message = result.data.message;
        });
        $scope.read();
    }

    $scope.update = function (employee) {
        console.log('updating employee');
        var data = {
            _id: employee._id,
            name: employee.name,
            gender: employee.gender,
            job: employee.job
        }
        $http.put('/api/v3/update', data).then();
        $scope.read();
    }

    $scope.delete = function (employee) {
        console.log('deleting employee');
        $http.delete('/api/v3/delete/' + employee._id).then();
        $scope.read();
    }

}