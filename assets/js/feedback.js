angular.model('feedbackapp',[]).controller('feedbackCtrl',function($scope){

});

$(function () {   

}); //document.ready
$(document).mouseup(function (e) {
    var subject = $("#feedback");   
    if (e.target.id != subject.attr('id') && !subject.has(e.target).length) {
        subject.removeClass('open');
    }   
});