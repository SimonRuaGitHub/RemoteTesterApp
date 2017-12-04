var piecesApp = angular.module('projectApp',[]);

piecesApp.controller('controllerProject',function($scope,$http) 
{  
       $http({
                url: "http://192.168.1.55/museo/baseDeDatos/ObrasControlador.php",
                method: "POST",
                data: {
                        'accion': "consultarObrasVisitante",
                      },
                contentType: 'application/json',
                dataType: 'json',
                headers: {'Content-Type': 'application/json'}
            }).then(function successCallback(response) 
               {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.pieces = response.data;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    alert("Error requesting service");
            });
            
       $scope.showInfoPiece = function (piece)
       {
             $scope.psImage = piece.imagen;
             $scope.psName = piece.nombre;
             $scope.psLocation = piece.sala;
             $scope.psDesc = piece.descripcion;
             $('#starks-panel').removeClass('is-active');
             $('#lannisters-panel').addClass('is-active');
       }
});
