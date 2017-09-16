$(function () {
    getSiteNav();
});
//获取数据
function getSiteNav(){
    $.ajax({
        url:url+'api/getsitenav',
        success:function(data){
        var sitenHtml=template('sitenav',data);
         $('.shops').html(sitenHtml);
        }
    })
}