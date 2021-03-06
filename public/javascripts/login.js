angular.module('login', [])
.controller('LoginCtrl', [
  '$scope', '$http',
  function($scope, $http) {
    
    var prefix = window.location; 

    $scope.signInEmployee = function() {
      console.log("Sign In Employee clicked");
      console.log("\tUN: " + $scope.employeeSIUNCon);
      console.log("\tPW: " + $scope.employeeSIPWCon); 
      window.location = prefix + 'employeeView';
      $scope.clearSignInEmployee();
    };
     
    $scope.signInEmployer = function() {
      console.log("Sign In Employer clicked");
      console.log("\tUN: " + $scope.employerSIUNCon);
      console.log("\tPW: " + $scope.employerSIPWCon);
      window.location = prefix + 'employerView';
      $scope.clearSignInEmployer();      
    };

    $scope.registerEmployee = function() {
      if ($scope.employeeRPWCon === $scope.employeeRCPWCon) {
        //console.log("Register Employee clicked");
        //console.log("\tEmp. ID: " + $scope.employeeREIDCon);
        //console.log("\tUN: " + $scope.employeeRUNCon);
        //console.log("\tPW: " + $scope.employeeRPWCon);
        //console.log("\tCPW: " + $scope.employeeRCPWCon);
        var data = {
          employerID: $scope.employeeREIDCon,
          username: $scope.employeeRUNCon,
          password: $scope.employeeRPWCon
        };
        console.log(data);
        $http.post('/register/employee', data);
        window.location = prefix + 'employeeView';
        $scope.clearRegisterEmployee();
      } else {
        $scope.employeeRPWCon = '';
        $scope.employeeRCPWCon = '';
        alert("Passwords do not Match!");
      }
    };

    $scope.registerEmployer = function() {
      if ($scope.employerRPWCon === $scope.employerRCPWCon) {
        //console.log("Register Employer clicked");
        //console.log("\tUN: " + $scope.employerRUNCon);
        //console.log("\tPW: " + $scope.employerRPWCon);
        //console.log("\tCPW: " + $scope.employerRCPWCon);
        window.location = prefix + 'employerView';
        $scope.clearRegisterEmployer();
      } else {
        $scope.employerRPWCon = '';
        $scope.employerRCPWCon = '';
        alert("Passwords do not Match!");
      }
    };

    $scope.clearSignInEmployee = function() {
      $scope.employeeSIUNCon = '';
      $scope.employeeSIPWCon = '';
    };
    
    $scope.clearSignInEmployer = function() {
      $scope.employerSIUNCon = '';
      $scope.employerSIPWCon = '';
    };

    $scope.clearRegisterEmployee = function() {
      $scope.employeeREIDCon = '';
      $scope.employeeRUNCon = '';
      $scope.employeeRPWCon = '';
      $scope.employeeRCPWCon = '';
    };

    $scope.clearRegisterEmployer = function() {
      $scope.employerRUNCon = '';
      $scope.employerRPWCon = '';
      $scope.employerRCPWCon = '';
    };

    $scope.clearAll = function () {
      clearSignInEmployee();
      clearSignInEmployer();
      clearRegisterEmployee();
      clearTegisterEmployer();
    };
  }
]);
