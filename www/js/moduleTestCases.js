var testCasesApp = angular.module('testCasesApp',[]);

testCasesApp.controller('controllerTestCase',function($scope,$http)
{    
       var projectCode = localStorage.getItem("projectCode");
       var projectName = localStorage.getItem("projectName");
       var array = [];
       
       $scope.projectName = projectName;
       
       $http({
                url: "http://localhost:8084/TestExpositor/rest/executionTest/allTcsByProject",
                method: "POST",
                data: {
                        'codigo':projectCode
                      },
                headers: {'Content-Type': 'application/json'}
            }).then(function successCallback(response) 
               {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.testCases = response.data;
                    
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    alert("Error requesting service");
            });
    
       $scope.exAutomTCDummy = function()
       {
           $http({
                url: "http://localhost:8084/TestExpositor/rest/executionTest/automationTest",
                method: "POST",
                data: {
                        'testCase':"CP_01"
                      },
                headers: {'Content-Type': 'text/plain'}
            }).then(function successCallback(response) 
               {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log(response.data);
                    
                    if(response.data != "exitoso")
                    {
                        alert("Prueba fallida");
                    }
                    else 
                    {
                         alert("Prueba exitosa");
                    }
                   
                    
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    alert("Error requesting service");
            });
       }
       
       $scope.queueTestCase = function(tc){
              
              var checkbox = document.getElementById(tc.codigoCaso);
              
              if(checkbox.checked){
                 array.push(tc);
              }
              else{
                  if(!checkbox.checked)
                  {
                      for(var i = 0; i < array.length ;i++)
                      {
                         if(array[i]["codigoCaso"] == tc.codigoCaso){
                            array.splice(i,1);
                             break;
                         }
                      }
                  }
              }
              
              console.log(array);
       }
       
       $scope.selectAllTestCases = function(){
            
           var checkbox = document.getElementById('allTcs');
           
           if(checkbox.checked)
           {
              if($scope.testCases != null)
              {
                 if(array.length > 0)  
                    array.splice(0,array.length);

                 for( iteration in $scope.testCases)
                 {
                     array.push($scope.testCases[iteration]);
                 }
                 
                 var checkboxes = document.getElementsByName('chTestCase');
                 for(var i=0; i < checkboxes.length ;i++) {
                        checkboxes[i].checked = true;
                 }
              } 
              else 
                  alert("No posee casos de prueba para seleccionar");
           }
           else{
               array.splice(0,array.length);
               var checkboxes = document.getElementsByName('chTestCase');
               for(var i=0; i < checkboxes.length ;i++) {
                        checkboxes[i].checked = false;
                 }
           }
                
             
             console.log(array);
       }
       
       $scope.executeTestCaseSet = function(){
              
              if(array.length == 0)
                 alert("Selecciona al menos un caso de prueba");
              else
              {
                  var myJsonString = JSON.stringify(array);
                  console.log(myJsonString);
                 
                   $http({
                url: "http://localhost:8084/TestExpositor/rest/executionTest/executeTestAuto",
                method: "POST",
                data:
                     myJsonString 
                      ,
                    headers: {'Content-Type': 'application/json'}
                }).then(function successCallback(response) 
                   {
                        // this callback will be called asynchronously
                        // when the response is available
                        console.log(response.data);
                        
                        for(var k in response.data) 
                        {
                           var caseCode = response.data[k].codigoCaso;
                           console.log(caseCode);
                           var stateResult = response.data[k].resultado;
                           console.log(stateResult);
                           var elemId = caseCode.concat("Result");
                           
                           var elemLabel = document.getElementById(elemId);
                           elemLabel.innerText = stateResult;
                           
                           if(stateResult == "exitoso")
                           {
                              elemLabel.className = "successfull";
                           }
                           else if(stateResult == "fallido")
                           {
                               elemLabel.className = "failed";
                           }
                           else if(stateResult == "impedido")
                           {
                                elemLabel.className = "impeded";
                           }
                        }
                        

                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        alert("Error requesting service");
                });
              }
           
       }
       
       
       
       
       
});

