$(function(){
    //为导航添加单击事件
$('.drop-down').on('click',function(){
    //切换样式和切换显示下拉列表内容
    $(this).find('i').toggleClass('active');
    $(this).siblings().find('i').removeClass('active');
    //获取当前点击的索引
    var index=$(this).index();
    //移除搜索的样式
    $('.gsSearch').find('i').removeClass('glyphicon-remove');
    //搜索的下拉列表隐藏
    $('.searchCon').hide();
    //当前的div切换，其他的隐藏
   $('.gsContent>div').eq(index).toggle().siblings().hide();
})
    //为搜索按钮添加单击事件
$('.gsSearch').on('click',function(){
    //移除分类的列表的样式
    $('.drop-down').find('i').removeClass('active');
    //隐藏分类列表的下拉列表
    $('.gsContent>div').hide();
    //搜索按钮切换样式
    $(this).find('i').toggleClass('glyphicon-remove');
    //切换显示搜索的下拉列表
    $('.searchCon').toggle();
});
    getShop();
    getShopArea();
    getPsProduct(1,1);
    //console.log(getShop())
});
//获取店铺数据
function getShop(){
    $.ajax({
        url:url+'api/getgsshop',
        success:function(data){
        var str='';
            data.result.forEach(function(item,i){
                str+=' <li class="drop-down" data-shopid="'+item.shopId+'"><a href="javascript:;" class=" '+(i==0?"active":"")+'" >'+item.shopName+'<i></i></a></li>'
            })
            $('.shop ul').html(str);
    }
    })
}
//获取地区的数据
function getShopArea(){
    $.ajax({
        url:url+'api/getgsshoparea',
        success:function(data){
            var str='';
            data.result.forEach(function(item,i){
                str+=' <li class="drop-down" data-areaid="'+item.areaId+'"><a href="javascript:;" class=" '+(i==0?"active":"")+'" >'+item.areaName+'<i></i></a></li>'
            })
            $('.gsCountry ul').html(str);
        }
    })
}
//获取产品的数据
function getPsProduct(shopid,areaid ){
    shopid=shopid||1;
    areaid=areaid||1;
    $.ajax({
        url:url+'api/getgsproduct',
        data:{
            shopid:shopid,
            areaid:areaid
        },
        success:function(data){
        var getProcducts=template('gsProduct',data);
            $('.gsProduct .container .row').html(getProcducts);
        }
    })
}
