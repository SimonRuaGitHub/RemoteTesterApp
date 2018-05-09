var piecesApp = angular.module('projectApp',['usersApp']);

piecesApp.controller('controllerProject',function($scope,$http) 
{           
        console.log(localStorage.getItem("username"));
        
        $http({
                url: "http://localhost:8084/TestExpositor/rest/expositorProjects/allProjectsByUser",
                method: "POST",
                data: {
                        'username': localStorage.getItem("username")
                      },
                headers: {'Content-Type': 'application/json'}
            }).then(function successCallback(response) 
               {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log(response.data);
                    
                    $scope.projects = response.data;
                    
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    alert("Error requesting service");
            });
            
        $scope.searchSuiteTestCases = function(project)
        {
               localStorage.setItem("projectCode",project.codigo);
               localStorage.setItem("projectName",project.nombre);
               
               console.log(localStorage.getItem("projectCode"));
               window.location.href = "suite_casos.html";
        }
});
