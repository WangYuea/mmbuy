$(function(){
    //获取url地址中的数据
    function getUrl(){
        var obj={};
        var currentLink=window.location.href;
        var current=currentLink.indexOf('?');
        var category=currentLink.substr(current+1);
        var str=category.split('&');
        for(var i=0;i<str.length;i++){
            var item=str[i];
            var items=str[i].split('=');
            obj[items[0]]=items[1];
        }
        return obj;
    }
    getDomestic(getUrl().productid);
});
//获取数据
function getDomestic(productid){
    $.ajax({
        url:url+'api/getmoneyctrlproduct',
        data:{
            productid:productid
        },
        success:function(data){
            //产品介绍数据
        var getDomHtml=template('commentId',data);
            $('.proDomestic').html(getDomHtml);
            //城市货源数据
            var countryHtml=template('countryId',data);
            $('.dom-coun').html(countryHtml);
            //评论数据
            var getCommentHtml=template('pinglun',data);
            $('.comment').html(getCommentHtml);
        }
    })
}