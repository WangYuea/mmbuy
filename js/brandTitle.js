$(function(){
getHot();
});
//获取数据
function getHot(){
    $.ajax({
        url:url+'api/getbrandtitle',
        success:function(data){
            var hotHtml=template('getHotId',data);
            $('.category ul').html(hotHtml);
        }
    })
}