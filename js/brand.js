
$(function () {
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
    getBrand(getUrl().brandtitleid);
});
//获取产品的列表
function getBrand(brandtitleid){
    $.ajax({
        url:url+'api/getbrand',
        data:{brandtitleid:brandtitleid},
        success:function(data){
            var brandHtml=template('brandId',data);
            $('.category ul').html(brandHtml);
            var titles=data.result[0].brandName;
            //console.log(titles.slice(-4));
            var titleName=titles.slice(-4)
            //获取热门排行导航文字
            $('.hotNav p').html(titleName+'哪个牌子好');
            //获取导航的文字
            $('.title-name').html(titleName+'哪个牌子好');
        }
    })
}