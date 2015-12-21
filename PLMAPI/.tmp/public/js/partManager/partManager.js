angular.module('plmapi',[]);
angular.module('plmapi').controller('PartCtrl',['$scope', function($scope){
    io.socket.get('/part', function(data){
        $scope.parts = data;
        $scope.$apply();
    });

    io.socket.on('part', function(event){
        switch (event.verb) {
            case 'created':
                $scope.parts.push(event.data);
                $scope.$apply();
                $.notify(event.data.name + ' has been added', "info");
                break;
                default:
                $.notify(event.data.summary, "error");
                break;
        }
    })
}]);



$('#createDialogButton').click(function(){
    $('#addPartForm').modal();
});
