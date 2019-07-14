$(function () {
    var ctx = getRootPath();
    //0.获取uid;
    var uid = getCustomerCookie();
    //1. ajax 获取 地址信息
    ajaxAddress(ctx, uid);

    //2.获取商品信息
    ajaxProduct(ctx);

    selectedBright();
    compatible();
    ejectAddressMenu();

    //3.点击提交订单监听
    submitOrder(ctx,uid);
});

//1. ajax 获取 地址信息
function ajaxAddress(ctx,uid){
    $.ajax({
        async: false,
        url: ctx + "/address/getDatas",
        data: {uid: uid},
        type: "post",
        dataType: "json",
        success : function (result) {
            console.log(result);
            //清空
            document.getElementById("pagePadding").innerHTML = "";
            pagePadding(ctx, result);
        },
        error:function () {
            alert("获取数据失败！")
        }
    });
}

//2.填充地址信息到页面(页面填充)
function pagePadding(ctx, result){
    for (var i = 0; i < result.length; i++){
        var index = i + 1;
        var pagePadding = document.getElementById("pagePadding");
        //填充前的内容
        var padding = pagePadding.innerHTML;

        //进行填充
        pagePadding.innerHTML = padding + " <div class=\"per-border\"></div>\n" +
            "                <!-- 地址 -->\n" +
            "                <li class=\"user-addresslist\">\n" +

                                "<input type=\"hidden\" id=\"address_index_" + index + "\" value=\"" + index + "\"/>"  +
                                "<input type=\"hidden\" id=\"address_addrid_"+ index + "\" value=\"" + result[i].addrid + "\">" +
            "\n" +
            "                    <div class=\"address-left\">\n" +
            "\n" +
            "                        <div class=\"user DefaultAddr\">\n" +
            "                            <!--地址信息-->\n" +
            "                            <span class=\"buy-address-detail\">\n" +
            "                                <!--地址名 1 为 i 为addrid  addressee-->\n" +
            "                                <span id=\"address_"+ index + "_addressee\" class=\"buy-user\">" + result[i].addressee + "</span>\n" +
            "                                <!--收件人电话 phone-->\n" +
            "                                <span id=\"address_"+ index + "_phone\" class=\"buy-phone\">" + result[i].phone + "</span>\n" +
            "                            </span>\n" +
            "                        </div>\n" +
            "\n" +
            "                        <div class=\"default-address DefaultAddr\">\n" +
            "                            <span class=\"buy-line-title buy-line-title-type\">收货地址：</span>\n" +
            "\n" +
            "\n" +
            "                            <span class=\"buy--address-detail\">\n" +
            "                                 <!--收件地址 address-->\n" +
            "                                <span id=\"address_"+ index + "_address\">"+ result[i].address +"</span>\n" +
            "                            </span>\n" +
            "\n" +
            "                        </div>\n" +
            "\n" +
            "                    </div>\n" +
            "                    <div class=\"clear\"></div>\n" +
            "\n" +
            "\n" +
            "                </li>";
    }

}

//3.地址选中事件 发亮
function selectedBright(){
    $(".user-addresslist").click(function() {
        $(this).addClass("defaultAddr").siblings().removeClass("defaultAddr");
        //获取选中地址 元素id 的 index
        var index = $(this).children('input').val();

        //获取地址信息
        var addrid = $("#address_addrid_" + index).val();
        var addressee = $("#address_" + index + "_addressee").html();
        var phone = $("#address_" + index + "_phone").html();
        var address = $("#address_" + index + "_address").html();

        alert("收件人：" + addressee + ", 电话：" + phone + ", 地址：" + address);

        //只要被选中就修改最下方的统计
        $("#buy-addrid").val(addrid);
        $("#buy-address").html(address);
        $("#buy-user").html(addressee);
        $("#buy-phone").html(phone);
    });

    //物流与支付方式的点击事件
    $(".logistics").each(function() {
        var i = $(this);
        var p = i.find("ul>li");
        p.click(function() {
            if (!!$(this).hasClass("selected")) {
                $(this).removeClass("selected");
            } else {
                $(this).addClass("selected").siblings("li").removeClass("selected");
            }
        })
    })
}

//4.弹出地址选择
function ejectAddressMenu(){
    //获取页面宽度
    var $ww = $(window).width();

    //第一层点击事件，隐藏所有的页面元素 显示特有的元素
    $('.theme-login').click(function() {
        //禁止遮罩层下面的内容滚动
        $(document.body).css("overflow","hidden");

        $(this).addClass("selected");
        $(this).parent().addClass("selected");

        //显示theme-popover-mask 元素
        $('.theme-popover-mask').show();
        $('.theme-popover-mask').height($(window).height());
        $('.theme-popover').slideDown(200);
    });

    //取消按钮的点击事件
    $('.theme-poptit .close, .btn-op .close').click(function() {
        //显示元素
        $(document.body).css("overflow","visible");
        $('.theme-login').removeClass("selected");
        $('.item-props-can').removeClass("selected");
        $('.theme-popover-mask').hide();
        $('.theme-popover').slideUp(200);

        //清空 value;
        $("#user-name").val("");
        $("#user-phone").val("");
        $("#user-intro").val("");
    });

    //保存按钮的点击事件
    $("#save_address").click(function () {
       //保存后获取页面元素，跳转到后台

       //页面元素
       var addressee =  $("#user-name").val();
       var phone = $("#user-phone").val();
       var address = $("#user-intro").val();

       if (addressee== "" || phone=="" || address==""){
           alert("输入信息不能为空");
       }else{
           var ctx = getRootPath();
           var uid = getCustomerCookie();
           //这里写监听事件
           var msg = "确认提交新地址-->" +  "address:" + address + ", phone:" + phone + ", addressee:" + addressee;
           if (confirm(msg) == true){
               window.location.href = ctx + "/address/insertAddress?uid=" + uid + "&address="
                   + encodeURI(encodeURI(address)) + "&phone=" + phone + "&addressee=" + encodeURI(encodeURI(addressee));

           }
       }

    });


}

//5. 前端获取 的Cookie
function getCustomerCookie(){
    var uid = $.cookie("customer");
    return uid;
}

//6. Ajax获取商品
function ajaxProduct(ctx){
    $.ajax({
       async: false,
       url : ctx + "/order/paymentProduct",
        dataType: "json",
        success : function(result){
           console.log(result);
            document.getElementById("product").innerHTML = "";
            pagePaddingProduct(result);

            for (var i = 0; i < result.length; i++){
                deleteListener(ctx, i+1);
            }

        },
        error:function(){
            alert("获取数据失败！！！");
        }
    });
}
//7.填充商品栏信息
function pagePaddingProduct(result){
    var statistice = 0;
    for (var i = 0; i < result.length; i++){
        var index = i + 1;
        //获取 订单项中的 product
        var product = result[i].product;

        var total = result[i].product.price * result[i].pnumber;;

        statistice = statistice + total;

        //获取div标签
        var productDIV = document.getElementById("product");

        //获取 div 标签里的内容
        var padding = productDIV.innerHTML;

        productDIV.innerHTML = padding + "<tr class=\"item-list\">\n" +
            "                    <di class=\"bundle  bundle-last\">\n" +
            "                        <div class=\"bundle-main\">\n" +
            "                            <ul class=\"item-content clearfix\">\n" +
            "                                <div class=\"pay-phone\">\n" +
            "\n" +
            "                                    <li class=\"td td-item\">\n" +
            "                                        <div class=\"item-pic\">\n" +
            "                                            <!--点击商品图片事件-->\n" +
            "                                            <a href=\"#\" class=\"J_MakePoint\">\n" +
            "                                                <!--商品图片-->\n" +
            "                                                <img src=\"" + product.pimg + "\" class=\"itempic J_ItemImg\"></a>\n" +
            "                                        </div>\n" +
            "                                        <div class=\"item-info\">\n" +
            "                                            <div class=\"item-basic-info\">\n" +
            "                                                <!--点击商品名称事件 并且 需要修改商品内容-->\n" +
            "                                                <a href=\"#\" target=\"_blank\" title=\"商品Title\"\n" +
            "                                                   class=\"item-title J_MakePoint\" data-point=\"tbcart.8.11\">"+ product.pname +"</a>\n" +
            "                                            </div>\n" +
            "                                        </div>\n" +
            "                                    </li>\n" +
            "\n" +
            "                                    <li class=\"td td-info\">\n" +
            "                                        <div class=\"item-props\">\n" +
            "                                            <!--商品描述-->\n" +
            "                                            <span class=\"sku-line\">"+ product.describe +"</span>\n" +
            "                                        </div>\n" +
            "                                    </li>\n" +
            "\n" +
            "                                    <li class=\"td td-price\">\n" +
            "                                        <div class=\"item-price price-promo-promo\">\n" +
            "                                            <div class=\"price-content\">\n" +
            "                                                <!--商品单价-->\n" +
            "                                                <em class=\"J_Price price-now\">"+ product.price +"</em>\n" +
            "                                            </div>\n" +
            "                                        </div>\n" +
            "                                    </li>\n" +
            "                                </div>\n" +
            "\n" +
            "                                <li class=\"td td-amount\">\n" +
            "                                    <div class=\"amount-wrapper \">\n" +
            "                                        <div class=\"item-amount \">\n" +
            "                                            <span class=\"phone-title\">购买数量</span>\n" +
            "                                            <div class=\"sl\">\n" +
            "                                                <!--购买数量-->\n" +
            "                                                <div><em>" + result[i].pnumber + "</em></div>\n" +
            "                                            </div>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                </li>\n" +
            "                                <li class=\"td td-sum\">\n" +
            "                                    <div class=\"td-inner\">\n" +
            "                                        <!--商品的价钱  -->\n" +
            "                                        <em tabindex=\"0\" class=\"J_ItemSum number\">"+ total + "</em>\n" +
            "                                    </div>\n" +
            "                                </li>\n" +
            "                                <li class=\"td td-oplist\">\n" +
            "                                    <div class=\"td-inner\">\n" +
            "                                        <span class=\"phone-title\">选择</span>\n" +
            "                                        <input id=\"product_" + index + "_pid\" type=\"hidden\" value=\"" + product.pid + "\" />\n" +
            "                                        <a id=\"delete_" + index + "_product\" class=\"pay-logis\">\n" +
            "                                            删除\n" +
            "                                        </a>\n" +
            "                                    </div>\n" +
            "                                </li>\n" +
            "\n" +
            "                            </ul>\n" +
            "                            <div class=\"clear\"></div>\n" +
            "\n" +
            "                        </div>\n" +
            "                    </di>\n" +
            "                </tr>\n" +
            "\n" +
            "                <div class=\"clear\"></div>";
    }
    //8.合计修改
    document.getElementById("pay_statistice").innerHTML = statistice;
    document.getElementById("buy-price").innerHTML = statistice;
}

//8.点击商品删除 事件
function deleteListener(ctx, index){
    //添加事件监听;
        $("#delete_" + index + "_product").click(function () {
            //这个 pid 是 item 中的 pid;
            var pid = $("#product_" + index + "_pid").val();
            window.location.href = ctx + "/order/deleteOvOrderItem?pid=" + pid;
        });
}

//9.提交订单监听
function submitOrder(ctx, uid){
    $("#btn_submit_order").click(function () {
        //先判断又没有点击地址，没有就提示需要点击地址

        if ($(".defaultAddr").length > 0){
            //1.获取地址的addrid 与 总金额 以及 uid
            //关于 orderItem 中的 商品 pid 付款后会生成订单 删除 session 信息，则直接从session中获取就可以了
            var addrid = $("#buy-addrid").val();
            var total = $("#buy-price").html();

            window.location.href = ctx + "/order/submitOrder?addrid=" + addrid + "&money=" + total + "&uid=" + uid;
        }else {
            alert("请先选择地址");
        }
        return false;
    });
}


/*<!--兼容IE浏览器 -->*/
function compatible (){
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (cls) {
            var ret = [];
            var els = document.getElementsByTagName('*');
            for (var i = 0, len = els.length; i < len; i++) {

                if (els[i].className.indexOf(cls + ' ') >=0 || els[i].className.indexOf(' ' + cls + ' ') >=0 || els[i].className.indexOf(' ' + cls) >=0) {
                    ret.push(els[i]);
                }
            }
            return ret;
        }
    }
}

// js获取项目根路径，如： http://localhost:8083/uimcardprj
function getRootPath() {
    // 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    // 获取主机地址之后的目录，如： /uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    // 获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    // 获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName
        .substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}
