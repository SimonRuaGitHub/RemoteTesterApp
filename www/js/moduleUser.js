var app = angular.module('usersApp',[]);

app.controller('controllerLogin',function($scope,$http) 
{  
    $scope.validateUserExistDummy = function ()
    {
        var username = $('#itxtUserName').val();
        var password = $('#ipPsw').val();
    
        if(username == "simonRL" && password == "1234")
        {
            window.location.href = "home_usuario.html";
        }
        else
        {
            $scope.message = "Usuario "+username+" no existe";
        }
    }
      
    $scope.validateUserExist = function ()
    {
        var username = $('#itxtUserName').val();
        var password = $('#ipPsw').val();
    
       $http({
                url: "http://localhost:8084/TestExpositor/rest/expositor/verifyUser",
                method: "POST",
                data: {
                        'user': username,
                        'pass': password
                      },
            }).then(function successCallback(response) 
               {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log(response.data);
                    
                    if(response.data != "1")
                    {
                        alert("Usuario y contraseña invalidos");
                    }
                    else 
                    {
                        $('#progress').addClass("mdl-spinner mdl-js-spinner is-active");
                        window.location.href = "home_usuario.html";
                    }
                   
                    
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    alert("Error requesting service");
            });
    }
    
});