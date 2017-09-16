$(function() {
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
    couponproduct(getUrl().couponid);
});
//获取数据
function couponproduct(couponid){
    $.ajax({
        url:url+'api/getcouponproduct',
        data:{couponid:couponid},
        success: function (data) {
        var couponproductHtml=template('couponproductId',data);
            $('.rec-list').html(couponproductHtml);
        }
    })
}
