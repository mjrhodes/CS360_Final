var app = angular.module('app', ['ngAnimate', 'ui.bootstrap']);
app.directive('employer', employerNavbarDirective);
app.directive('employee', employeeNavbarDirective);
app.directive('fullcalendar', fullCalendarDirective);
app.directive('numberOnlyInput', function () {
    return {
        restrict: 'EA',
        template: '<input name="{{inputName}}" ng-model="inputValue" />',
        scope: {
            inputValue: '=',
            inputName: '='
        },
        link: function (scope) {
            scope.$watch('inputValue', function(newValue,oldValue) {
                var arr = String(newValue).split("");
                if (arr.length === 0) return;
                if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
                if (arr.length === 2 && newValue === '-.') return;
                if (isNaN(newValue)) {
                    scope.inputValue = oldValue;
                }
            });
        }
    };
});

function employerNavbarDirective () {
    return {
      template: '<nav class="navbar navbar-default">' +
                  '<div class="container-fluid">' +
                    '<!-- Brand and toggle get grouped for better mobile display -->' +
                    '<div class="navbar-header">' +
                      '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">' +
                        '<span class="sr-only">Toggle navigation</span>' +
                        '<span class="icon-bar"></span>' +
                        '<span class="icon-bar"></span>' +
                        '<span class="icon-bar"></span>' +
                      '</button>' +
                      '<a class="navbar-brand" href="#">JobShifts.com</a>' +
                    '</div>' +

                    '<!-- Collect the nav links, forms, and other content for toggling -->' +
                    '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' +
                      '<ul class="nav navbar-nav">' +
                        '<li><a href="employerView.html">Profile<span class="sr-only">(current)</span></a></li>' +
                        '<li><a href="#">Announcements</a></li>' +
                          '<li><a href="employerCalendar.html">Calendar</a></li>' +
                          '<li><a href="#">Employees</a></li>' +
                      '</ul>' +
                        '<button type="button" class="btn btn-default navbar-btn navbar-right">Sign Out</button>' +
                '<!--        <button type="button" class="btn btn-default navbar-btn navbar-right">Register</button>-->' +
                    '</div><!-- /.navbar-collapse -->' +
                  '</div><!-- /.container-fluid -->' +
                '</nav>'
    };
}

function employeeNavbarDirective () {
    return {
      template: '<nav class="navbar navbar-default">' +
                  '<div class="container-fluid">' +
                    '<!-- Brand and toggle get grouped for better mobile display -->' +
                    '<div class="navbar-header">' +
                      '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">' +
                        '<span class="sr-only">Toggle navigation</span>' +
                        '<span class="icon-bar"></span>' +
                        '<span class="icon-bar"></span>' +
                        '<span class="icon-bar"></span>' +
                      '</button>' +
                      '<a class="navbar-brand" href="#">JobShifts.com</a>' +
                    '</div>' +

                    '<!-- Collect the nav links, forms, and other content for toggling -->' +
                    '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' +
                      '<ul class="nav navbar-nav">' +
                        '<li><a href="employeeView.html">Profile<span class="sr-only">(current)</span></a></li>' +
                        '<li><a href="#">Announcements</a></li>' +
                          '<li><a href="employeeCalendar.html">Calendar</a></li>' +
                      '</ul>' +
                        '<button type="button" class="btn btn-default navbar-btn navbar-right">Sign Out</button>' +
                '<!--        <button type="button" class="btn btn-default navbar-btn navbar-right">Register</button>-->' +
                    '</div><!-- /.navbar-collapse -->' +
                  '</div><!-- /.container-fluid -->' +
                '</nav>'
    };
}

function fullCalendarDirective () {
  return {
    template: '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.6.1/fullcalendar.min.js" />' +
                '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.6.1/fullcalendar.min.css" />' +
                '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.6.1/fullcalendar.print.css" />'
  };

}


app.controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {
    
    var endDate = new Date();
    endDate.setTime(endDate.getTime() + 1000 * 60 * 60);
    
    $scope.events = [
        {title:'Test Event 1', startDate: new Date(), endDate: endDate, numOfEmployees: 7}
    ]

    $scope.items = ['item1', 'item2', 'item3'];
    
    $scope.animationsEnabled = true;
    
    $scope.open = function (size, date, jsEvent, view, calendar, edit) {
//        alert("In function");
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../test.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                },
                date: date,
                calendar: calendar,
                edit: edit
            }
        });
    };


    
    $scope.edit = function (size, date, jsEvent, view, calendar, edit) {
        var modalInstance2 = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../test.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                },
                date: date,
                calendar: calendar,
                edit: edit
            }
        });
    };
    
    $scope.addEvent = function() {
        
    }

}
);
//
//// Please note that $uibModalInstance represents a modal window (instance) dependency.
//// It is not the same as the $uibModal service used above.
//
app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $http, items, date, calendar, edit) {
    if(edit) {
        $scope.startTime = new Date(moment(date.start._d));
        $scope.endTime = new Date(moment(date.end._d));
        $scope.newEvent = {title:'new event',start:date};
        $scope.title = date.title;
    } else {
        $scope.startTime = new Date(moment(date).add(6, 'h'));
        $scope.endTime = new Date(moment(date).add(9, 'h'));
        $scope.newEvent = {title:'new event',start:date};
    }
  
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
    
    $scope.save = function() {
        var start = $scope.startTime;
        var end = $scope.endTime;
        var newEvent = {title:$scope.title, start:start, end:end};
        if(edit) {
            date.start._d = $scope.startTime;
            date.end._d = $scope.endTime;
            date.title = $scope.title;
            calendar.fullCalendar('updateEvent', date);
        } else {
//            return $http.post('/events', newEvent).success(function(data){
                calendar.fullCalendar( 'renderEvent', newEvent, true );
//                $uibModalInstance.dismiss('cancel');
//            )};
        }
        $uibModalInstance.dismiss('cancel');
    };
    
});