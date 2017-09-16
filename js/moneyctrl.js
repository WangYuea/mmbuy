
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

    getList(getUrl().pageid);
});
//获取数据
function getList(pageid){
    //设置pageid等于传入的值和不传值就是1
    pageid=pageid||1;
    $.ajax({
        url:url+'api/getmoneyctrl',
        data:{
            pageid:pageid
        },
        success: function (data) {
            var listHtml=template('saveList',data);
            $('.rec-list').html(listHtml);
            //获取一页显示的条数
            var pageSize=data.pagesize;
            //console.log(pageSize);
            //获取总条数
            var total=data.totalCount;
            //一共多少页
            var page=Math.ceil(total/pageSize);
            var option='';
            for(var i=0;i<page;i++){
                //判断是不是第一项，默认第一项选中
                if((i+1)==pageid){
                    option+=' <option value="'+(i+1)+'" selected>'+(i+1)+'/'+page+'</option>';
                }else{
                    option+=' <option value="'+(i+1)+'">'+(i+1)+'/'+page+'</option>';
                }
            }
            $('.select').html(option);
            //下拉列表选择页数显示对应的产品
            $('.select').on('change',function(){
                //pageid=$(this).val();
                window.location.href='moneyctrl.html?pageid='+$(this).val();
            })
            //设置上一页下一页
var pre='moneyctrl.html?pageid='+(+pageid-1);
            var next='moneyctrl.html?pageid='+(+pageid+1);
            if(pageid==1){
                pre='moneyctrl.html?&pageid=1';
            }
            if(pageid==page){
                next='moneyctrl.html?&pageid='+page;
            }

            $('.pre a').attr('href',pre);
            $('.next a').attr('href',next);
        }
    })
}