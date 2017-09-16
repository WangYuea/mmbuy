$(function(){
    //点击分类后显示下面的子分类
$('.category').on('click',' ul li a',function(){
    $(this).siblings('ul').toggle();
    $(this).parent().siblings('li').find('ul').css('display','none');
    //获取当前点击的分类的自定义属性
    var titleid=$(this).attr('data-title-id');
    console.log(titleid);
    //获取子分类的数据
    getList(titleid,$(this));
})
    getTitle();

});
//获取总分类
function getTitle(){
    $.ajax({
        url:url+'api/getcategorytitle',
        success:function(data){
            var titleHtml=template('categoryTitle',data);
            $('.category ul').html(titleHtml);
        }
    })
}
//获取分类下的子分类
function getList(titleid,ele){
    if(ele.siblings('ul').children().length==0) {
        $.ajax({
            url: url + 'api/getcategory',
            data: {
                titleid: titleid
            },
            success: function (data) {
                var listHtml = template('categoryList', data);
                ele.siblings('ul').html(listHtml);
                var num = ele.siblings('ul').children().length % 3 || 3;
                ele.siblings('ul').children('li:nth-last-child(-n' + num + ')').css('border-bottom', 'none');
            }
        })
    }
}
