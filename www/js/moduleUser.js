var app = angular.module('usersApp',[]);

app.controller('controllerLogin',function($scope,$http) 
{  
    $scope.validateUserExistDummy = function ()
    {
        var username = $('#itxtUserName').val();
        var password = $('#ipPsw').val();
    
        if(username == "simon" && password == "1234")
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
        
        if(username == "")
        {
            $scope.message = "Por favor ingrese un usuario";
        }
        else if(password == "")
        {
            $scope.message = "Por favor ingrese una contraseña";
        }
        else
        {
            localStorage.setItem("username",username);
            console.log(localStorage.getItem("username"));

           $http({
                    url: "http://localhost:8084/TestExpositor/rest/expositor/verifyUserJson",
                    method: "POST",
                    data: {
                            'username': username,
                            'password': password
                          },
                    headers: {'Content-Type': 'application/json'}
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
                            window.location.href = "home_proyecto.html";
                        }


                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        alert("Error requesting service");
                });
        }
            
    }
});