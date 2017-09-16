$(function () {
    //单击更多显示全部导航
    $(".nav").on('click', '.row>div:nth-child(8)', function () {
        $('.nav .row>div:nth-last-child(-n+4)').toggle();
    })
    //调用
    getNav();
    recommend();
});
//获取导航函数
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
//获取折扣推荐列表的函数
function recommend(){
    $.ajax({
        url:url+'api/getmoneyctrl',
        success:function(data){
            var html=template('recommend',data);
            $('.rec-list').html(html);
        }
    })
}