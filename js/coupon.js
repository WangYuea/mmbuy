$(function(){
    coupon();
});
//获取数据
function coupon(){
    $.ajax({
        url:url+'api/getcoupon',
        success:function(data){
            var couponHtml=template('couponId',data);
            $(".imgList .row").html(couponHtml);
        }
    })
}
