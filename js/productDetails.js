$(function () {
    //获取url地址栏的数据
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
    //console.log(getUrl());
    getCon(getUrl().productid);
    conTitle(getUrl().categoryid);
    getAppraise(getUrl().productid);
});
//获取二级标题名字数据
function conTitle(categoryid){
    $.ajax({
        url:url+'api/getcategorybyid',
        data:{
            categoryid:categoryid
        },
        success: function (data) {
            console.log(data);
            console.log(data.result[0].category);
            var hrefs='<a href="productlist.html?categoryid='+categoryid+'&pageid=1">'+data.result[0].category+'</a> ';
            //var hrefs=data.result[0].category;
            $('.title').html(hrefs);
        }
    })
}
//获取三级标题数据
function getCon(productid ){
    $.ajax({
        url:url+'api/getproduct',
        data:{
            productid:productid
        },
        success:function(data){
        var conHtml=template('getCon',data);
            $('.productShow').html(conHtml);
            var title=(data.result[0].productName).substr(0,8);
            $('.title-name').html(title);
        }
    })
}
//获取评论数据
function getAppraise(productid ){
    $.ajax({
        url:url+'api/getproductcom',
        data:{productid:productid},
        success:function(data){
        var appraiseHtml=template('appraise',data);
            $('.app-content').html(appraiseHtml);
        }
    })
}