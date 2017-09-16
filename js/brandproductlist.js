$(function(){
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
    getProductList(getUrl().brandtitleid,getUrl().pageid);
});
//获取产品函数
function getProductList(brandtitleid,pageid){
    $.ajax({
        url:url+'api/getbrandproductlist',
        data:{
            brandtitleid:brandtitleid,
            pageid:pageid
        },
        success:function(data){
        var produntListHtml=template('productList',data);
            $('.rec-list').html(produntListHtml);
            //获取导航文字
            $('.title-name').html(data.result[0].brandName+'电视产品销量排行');
            //获取总共多少条数据
            var total=data.totalCount;
            //获取一页显示多少条数据
            var pagesize=data.pagesize;
            //一共有多少页
            var pageNum=Math.ceil(total/pagesize);
            //设置下来列表
            var str='';
            for(var i=0;i<pageNum;i++){
                if((i+1)==pageid){
                    str+='<option value="'+(i+1)+'" selected>'+(i+1)+'/'+pageNum+'</option>'
                }else{
                    str+='<option value="'+(i+1)+'">'+(i+1)+'/'+pageNum+'</option>'
                }
            }
            $('.select').html(str);
            //选中下拉列表显示对应数据
            $('.select').on('change',function(){
                window.location.href='brandproductlist.html?brandtitleid='+brandtitleid+'&pageid='+$(this).val();
            });
            //设置上一页下一页
            var pre='brandproductlist.html?brandtitleid='+brandtitleid+'&pageid='+(+pageid-1);
            var next='brandproductlist.html?brandtitleid='+brandtitleid+'&pageid='+(+pageid+1);
            if(pageid==1){
                pre='brandproductlist.html?brandtitleid='+brandtitleid+'&pageid=1';
            }
            if(pageid==pageNum){
                next='brandproductlist.html?brandtitleid='+brandtitleid+'&pageid='+pageNum;
            }
            $('.pre a').attr('href',pre);
            $('.next a').attr('href',next);
        }
    })
}