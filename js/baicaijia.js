$(function(){
getBCJtitle();

});
//获取标题函数
function getBCJtitle(){
    $.ajax({
        url:url+'api/getbaicaijiatitle',
        success:function(data){
            var str='';
            for(var i=0;i<data.result.length;i++){
                //console.log(data.result[i].title)
                //i=0?'active':'';
                //判断是否是第一项默认为选中的状态
                if(i==0){
                    str+=' <a href="javascript:;" data-titleid='+i+' class="active" >'+data.result[i].title+'</a>';
                }else{
                    str+=' <a href="javascript:;" data-titleid='+i+'>'+data.result[i].title+'</a>';
                }
            }
            $('.navCon').html(str);
            //鼠标经过改变状态
            var arr=$('.navCon').children();
            arr.mouseenter(function(){
                $(this).addClass('active').siblings().removeClass('active');
                //console.log($(this).attr('data-titleid')
                //鼠标经过产品列表更新对应的产品
                getProductList($(this).attr('data-titleid'));
            });
            //初始化产品列表
            getProductList(0);
        }
    })
}
//获取产品列表
function getProductList(titleid ){
    titleid=titleid||0;
    $.ajax({
        url:url+'api/getbaicaijiaproduct',
        data:{titleid:titleid },
        success:function(data){
            var getProductHmtl=template('bcjId',data);
            $('.rec-list').html(getProductHmtl);
        }
    })
}

