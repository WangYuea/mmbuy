$(function(){
    //获取url地址栏中的数据
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
    productList(getUrl().productid);

});
//获取评论数据
function productList(productid ){
    $.ajax({
        url:url+'api/getproductcom',
        data:{productid :productid },
        success:function(data){
            var productHtml=template('productId',data);
          $('.comments').html(productHtml);
        }
    })
}
//获取产品的数据
function getName(){
    $.ajax({
            url:url+'api/getbrandproductlist',

    })
}
