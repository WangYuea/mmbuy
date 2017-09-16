$(function () {
    //获取url地址栏的信息
    function getUrl() {
        var obj = {};
        var currentLink = window.location.href;
        var current = currentLink.indexOf('?');
        var category = currentLink.substr(current + 1);
        var str = category.split('&');
        for (var i = 0; i < str.length; i++) {
            var item = str[i];
            var items = str[i].split('=');
            obj[items[0]] = items[1];
        }
        return obj;
    }

    inlanddiscountList(getUrl().productid)
});
//获取数据
function inlanddiscountList(productid) {
    $.ajax({
        url:url+'api/getdiscountproduct',
        data:{productid:productid},
        success:function(data){
            //产品数据
            var getIdHtml=template('discountId',data);
       $('.proDomestic').html(getIdHtml);
            //城市数据
            var getCountryHtml=template('discountCountry',data);
            $('.dom-coun').html(getCountryHtml);
            //评论数据
        var getCommentHtml=template('discountComment',data);
            $('.comment').html(getCommentHtml);
        }
    })
}
