$(function(){
    console.log($('.category-list').children());
    getTitle();
    //var titleid=$('.category-list').find('a').attr('data-title-id');

    getTitleId();
})
function getTitle(){
    //console.log(11);
    $.ajax({
        url:url+'api/getcategorytitle',
        success:function(data){
            console.log(data);
            var titleHtml=template('cateList',data);
            //console.log(titleHtml);
            $('.category-list').html(titleHtml);
           //var id= $('.category-list a').attr('data-title-id');
           // console.log(id);
        }
    })
}
function getTitleId(){
    $.ajax({
        url:url+'api/getcategorybyid',
        data:{
            categoryid:0
        },
        success:function(data){
            var htmls=template('list',data);
            $('.listObj').html(htmls);
        }

    })
}
