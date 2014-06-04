/** Binding Angular $scope model data with firebase data store
 *  This creates 3 way binding with the data*/
// using strict js
  'use strict';
// Comment below for js hint to ignore issues if any and render the page
/*global $:false */
//creating directive
app.directive('BroadCastMessage',function(){
    return{
        restrict:'AE',
        replace: 'true',
        template: '<h3>Hello World!!</h3>'
    };
});
//binding children data
app.factory('childrenService', ['$firebase', function($firebase) {
    var ref = new Firebase('https://daycareapp.firebaseio.com/children');
    return $firebase(ref);
}]);
app.controller('ChildrenController', ['$scope','childrenService',function ($scope,service) {
    service.$bind($scope, 'children');

    $scope.childTopickDrop=[];
    $scope.childGender;
    $scope.changeButtonColor=function(event){
        $(event.target).toggleClass('active');
    }
    $scope.sortChild="age";
    $scope.slectChild=function(event){
        //console.debug(event);
        var count=0;
        var temp;
        $(event.target).toggleClass('list-group-item-success');
        $scope.childTopickDrop.push($(event.target).attr('id'));
            for(var i=0;i<$scope.childTopickDrop.length;i++){
                if($(event.target).attr('id')==$scope.childTopickDrop[i]){
                    if(count==0){
                    temp=i;
                    }
                count++;
                if(count>1){
                    $scope.childTopickDrop.splice(i,1);
                    $scope.childTopickDrop.splice(temp,1);
                }
                }
            }
    };
    $scope.broadcastMsg=function(){
        $scope.babyMessage='';
    };

    $scope.pickUpDrop=function(pick,drop){
        //alert('elo');
        var selectedChildren=$scope.childTopickDrop;
        if(selectedChildren.length!=0){
            for(var i=0;i<selectedChildren.length;i++){
                for(var j=0;j<$scope.children.childrenArr.length;j++){
                    if(selectedChildren[i]==$scope.children.childrenArr[j].uid && $scope.children.childrenArr[j].picked=='NotPicked'){
                        $scope.children.childrenArr[j].picked='picked';
                    }
                }
            }
        }
    }
    $scope.UpdateMemberArr={}
    var storeArrpos=0;
    $scope.updateChildInfoView=function(event){
        for(var i=0;i<$scope.children.childrenArr.length;i++){
            if($(event.target).attr('id')==$scope.children.childrenArr[i].uid){
                storeArrpos=i;
                //alert($scope.children.childrenArr[i].name);
                $scope.UpdateMemberArr.uid=$scope.children.childrenArr[i].uid;
                $scope.UpdateMemberArr.name=$scope.children.childrenArr[i].name;
                $scope.UpdateMemberArr.location=$scope.children.childrenArr[i].location;
                $scope.UpdateMemberArr.age=$scope.children.childrenArr[i].age;
            }
        }
    }
    $scope.updateMember=function(){
        $scope.children.childrenArr[storeArrpos].name=$scope.UpdateMemberArr.name
        $scope.children.childrenArr[storeArrpos].location=$scope.UpdateMemberArr.location;
        $scope.children.childrenArr[storeArrpos].age=$scope.UpdateMemberArr.age;
    }
    $scope.check=function(){alert($scope.childGender);}

    $scope.$watch('childTopickDrop',function(){
       if($scope.childTopickDrop.length==0){
            $('.pickDrop').hide();
        }
        else if($scope.childTopickDrop.length>0)
            {$('.pickDrop').show();
        }

    },true);
}]);
//binding parents data
app.factory('parentsService', ['$firebase', function($firebase) {
    var ref = new Firebase('https://daycareapp.firebaseio.com/parents');
    return $firebase(ref);
}]);
app.controller('ParentsController', ['$scope','parentsService',function ($scope,service) {
    service.$bind($scope, 'parents');
}]);
//binding admin data
app.factory('adminService', ['$firebase', function($firebase) {
    var ref = new Firebase('https://daycareapp.firebaseio.com/admin');
    return $firebase(ref);
}]);
app.controller('AdminController', ['$scope','adminService',function ($scope,service) {
    service.$bind($scope, 'admin');
    $scope.removeAdmin=function(delIndex){
        $scope.admin.adminArr.splice(delIndex,1);
    }
    $scope.addMember=function(){
        //$scope.NewMember=$scope.NewMember.reverse();
        $scope.admin.adminArr.push($scope.NewMember);
        $scope.NewMember={};
    }
}]);
//binding messages data
app.factory('messagesService', ['$firebase', function($firebase) {
    var ref = new Firebase('https://daycareapp.firebaseio.com/messages');
    return $firebase(ref);
}]);
app.controller('MessagesController', ['$scope','messagesService',function ($scope,service) {
    service.$bind($scope, 'messages');
}]);
//binding auxilary data
app.factory('auxService', ['$firebase', function($firebase) {
    var ref = new Firebase('https://daycareapp.firebaseio.com/aux');
    return $firebase(ref);
}]);
app.controller('AuxController', ['$scope','auxService',function ($scope,service) {
    service.$bind($scope, 'aux');
}]);

