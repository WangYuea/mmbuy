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
 getName(getUrl().categoryid);
    getList(getUrl().categoryid,getUrl().pageid)
});
//获取标题名字数据
function getName(categoryid){
    $.ajax({
        url:url+'api/getcategorybyid',
        data:{
            categoryid:categoryid
        },
        success:function(data){
            console.log(categoryid);
            var hrefs='<a href="productlist.html?categoryid='+categoryid+'">'+data.result[0].category+'</a> ';
            $('.title-name').html(hrefs);
        }
    })
}
//获取产品数据
function getList(categoryid,pageid){
    $.ajax({
        url:url+'api/getproductlist',
        data:{
            categoryid:categoryid,
            pageid:pageid
        },
        success:function(data){
            var productList=template('productList',data);
            $('.recommend').html(productList);
            //获取一页显示多少条
            var pageSize=data.pagesize;
            //总条数
            var total=data.totalCount;
            //获取页数
            var page=Math.ceil(total/pageSize);
            var str='';
            for(var i=0;i<page;i++){
                //判断是否是第一项，默认第一项为选中
                if((i+1)==pageid){
                    str+=' <option value="'+(i+1)+'" selected>'+(i+1)+'/'+page+'</option>'
                }else{
                    str+=' <option value="'+(i+1)+'">'+(i+1)+'/'+page+'</option>'
                }
            }
            $('.select').html(str);
            //改变下拉列表显示对应的产品
            $('.select').on('change',function(){
                window.location.href='productlist.html?categoryid='+categoryid+'&pageid='+$(this).val();
            });
            //上一页下一页
            var pre='productlist.html?categoryid='+categoryid+'&pageid='+(+pageid-1);
            var next='productlist.html?categoryid='+categoryid+'&pageid='+(+pageid+1);
            if(pageid==1){
                 pre='productlist.html?categoryid='+categoryid+'&pageid=1';
            }
            if(pageid==page){
                 next='productlist.html?categoryid='+categoryid+'&pageid='+page;
            }
            $('.pre a').attr('href',pre);
            $('.next a').attr('href',next);
        }
    })
}