$(function () {
    $(".nav").on('click', '.row>div:nth-child(8)', function () {
        $('.nav .row>div:nth-last-child(-n+4)').toggle();
    })
    getNav();
    recommend();
});
function getNav(){
    $.ajax({
        url:url+'api/getindexmenu',
        success:function(data){
            var navHtml='';
            for(var i=0;i<data.result.length;i++){
                var td=data.result[i];
                navHtml+='<div class="col-xs-3">'+'  <a href="'+td.titlehref+'">'+td.img+'<p>'+td.name+'</p>'+'</a></div>';
            }
            $('.nav .row').html(navHtml);
        }
    })
}
//function recommend(){
//    $.ajax({
//        url:url+'api/getmoneyctrl',
//        success:function(data){
//            var html=template('recommend',data);
//            $('.rec-list').html(html);
//        }
//    })
//}
function recommend(){
    $.ajax({
        url:url+'api/getmoneyctrl',
        success:function(data){
            var html=Handlebars.compile($('#recommend').html());
            $('.rec-list').html(html(data));
        }
    })
}