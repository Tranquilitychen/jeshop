$(function () {
    var ctx = getRootPath();
    personOrders();

    //对元素 按钮进行控制
    $("#notsubmitOrder").click(function () {
        window.location.href = ctx + "/static/two/home/pay.html";
       return false;
    });


});

//3. 全选页面的按钮进行监听
function order_button_monitro(index){
    //index 从 0 开始， 页面也是从0开始
    $("#order_" + index + "_controller").click(function () {
       var orderid = $("#order_" + index + "_orderId").html();
        var ctx = getRootPath();
       var type = $("#order_" + index + "_controller").html();
       alert("type:" + type);
       if (type == "删除订单"){
           deleteOrder(orderid);
       }else if (type == "等待出库"){
           alert("正在加紧备货...");
       } else if (type == "待付款"){
           window.location.href = ctx + "/static/two/person/paymoney.html?orderid=" + orderid;
       }else if (type == "确认收货"){
           getProductOrder(orderid);
       }

    });

}



//3.1 待支付的按钮监听
function waitPay_button_monitro(index){
    //index 从 0 开始， 页面也是从0开始
    //waitPay_0_topay
    //在页面刷新的时候就进来了
    $("#waitPay_" + index + "_topay").click(function () {
        //waitPay_0_orderId
        var orderid = $("#waitPay_" + index + "_orderId").html();

        var ctx = getRootPath();

        var type = $("#waitPay_" + index + "_topay").html();

        if (type == "删除订单"){
            deleteOrder(orderid);
        }else if (type == "等待出库"){
            alert("正在加紧备货...");
        } else if (type == "待付款"){
            window.location.href = ctx + "/static/two/person/paymoney.html?orderid=" + orderid;
        }else if (type == "确认收货"){
            getProductOrder(orderid);
        }
    });

}

//3.2 待发货的按钮监听
function  waitOutOfStock_button_monitro(index){
    //index 从 0 开始， 页面也是从0开始

    $("#waitOutOfStock_" + index + "_outofStock").click(function () {
        var orderid = $("#waitOutOfStock_" + index + "_orderId").html();
        var ctx = getRootPath();
        var type = $("#waitOutOfStock_" + index + "_outofStock").html();

        if (type == "删除订单"){
            deleteOrder(orderid);
        }else if (type == "等待出库"){
            alert("正在加紧备货...");
        } else if (type == "待付款"){
            window.location.href = ctx + "/static/two/person/paymoney.html?orderid=" + orderid;
        }else if (type == "确认收货"){
            getProductOrder(orderid);
        }
    });

}

//3.3 待收货的按钮监听
function  waitClosing_button_monitro(index){
    //index 从 0 开始， 页面也是从0开始

    $("#waitClosing_" + index + "_closing").click(function () {
        var orderid = $("#waitClosing_" + index + "_orderId").html();
        var ctx = getRootPath();
        var type = $("#waitClosing_" + index + "_closing").html();

        if (type == "删除订单"){
            deleteOrder(orderid);
        }else if (type == "等待出库"){
            alert("正在加紧备货...");
        } else if (type == "待付款"){
            window.location.href = ctx + "/static/two/person/paymoney.html?orderid=" + orderid;
        }else if (type == "确认收货"){
            getProductOrder(orderid);
        }
    });

}

//3.4 支付完成的按钮监听
function  delete_button_monitro(index){
    //index 从 0 开始， 页面也是从0开始

    $("#closingOrder_" + index + "_deleteOrder").click(function () {
        var orderid = $("#closingOrder_" + index + "_orderId").html();
        var ctx = getRootPath();
        var type = $("#closingOrder_" + index + "_deleteOrder").html();

        if (type == "删除订单"){
            deleteOrder(orderid);
        }else if (type == "等待出库"){
            alert("正在加紧备货...");
        } else if (type == "待付款"){
            window.location.href = ctx + "/static/two/person/paymoney.html?orderid=" + orderid;
        }else if (type == "确认收货"){
            getProductOrder(orderid);
        }
    });

}

//test
/*function test(index) {
    $("#waitPay_" + index + "_topay").click(function () {
        alert(index + "点击了");
    });
}*/


//删除订单
function deleteOrder(orderid){
    var ctx = getRootPath();
    //在此可以添加确认框
    var res = confirm("您确定要删除吗？");
    if(res == true){
        $.ajax({
            url: ctx + "/order/deleteOrderByOrderid?orderid=" + orderid,
            dataType: "json",
            success :function (result) {
                if (result == 1){
                    //删除成功
                    window.location.reload();
                    alert("删除订单成功！");
                }else{
                    alert("删除失败！");
                }
            },
            error : function (result) {
                console.log(result);
                alert("请求删除失败！");
            }
        })
    }
}

//确认收货
function getProductOrder(orderid){
    var ctx = getRootPath();
    //在此可以添加确认框
    var res = confirm("您要确认收货吗？");
    if(res == true){
        $.ajax({
            url: ctx + "/order/submitGetProduct?orderid=" + orderid,
            dataType: "json",
            success :function (result) {
                if (result == 1){
                    //确认收货成功
                    alert("确认收货成功！");
                    window.location.reload();
                }else{
                    alert("确认收货失败！");
                }
            },
            error : function (result) {
                console.log(result);
                alert("请求删除失败！");
            }
        })
    }
}

//2.获取所有的订单信息
function personOrders() {
    var uid = cookieGetUid();
    var ctx = getRootPath();

    $.ajax({
        url: ctx + "/order/personSelAllOrder",
        type:"post",
        data:{"uid": uid},
        dataType: "json",
        success : function (result) {
            //填充数据
            var orders = new Array();                       //全部订单
            var waitPayOrder = new Array();                 //等待支付订单
            var waitOutOfStockOrder = new Array();          //等待发货订单
            var waitClosingOrder = new Array();             //等待收获订单
            var closingOrder = new Array();                 //已完成订单

            //刚进来就是显示所有订单，不需要，但之后需要点击别的 订单需要点回来
            for (var i = 0; i < result.length; i ++){
                orders[i] = result[i];

                //细分订单

                if(result[i].state == 0){
                    console.log("等待支付订单：" , result[i]);
                    waitPayOrder.push(result[i]);
                }else if (result[i].state == 1){
                    console.log("等待出库订单：" , result[i]);
                    waitOutOfStockOrder.push(result[i]);
                } else if (result[i].state == 2){
                    console.log("等待收货订单：" , result[i]);
                    waitClosingOrder.push(result[i]);
                }else if (result[i].state == 3){
                    console.log("完成订单：" , result[i]);
                    closingOrder.push(result[i]);
                }
            }

            showAllOrder(orders);

            $("#allOrder").click(function () {
                /*alert("所有订单");*/
                /*console.log("全部订单");
                console.log(orders);*/
                /*paddingOrderList(orders);*/

                //显示元素，只有当点击跳转后才会加载 出创建的元素，
                //首页点击回去就没有了，所以需要 思考
                showAllOrder(orders);

                window.location.reload();
            });

            $("#waitPay").click(function () {
          /*      alert("等待支付的订单");
                console.log("state 为 0 表示此订单为 等待支付订单");
                console.log(waitPayOrder);*/
                showWaitPayOrder(waitPayOrder);


                for (var i = 0; i < waitPayOrder.length; i ++){
                    waitPay_button_monitro(i);
                }

            });

            $("#waitOutOfStock").click(function () {
            /*   alert("待发货订单");
                console.log("state 为 1 表示此订单为 等待发货订单");
                console.log(waitOutOfStockOrder);*/
                showWaitOutOfStock(waitOutOfStockOrder);


                for (var i = 0; i < waitOutOfStockOrder.length; i ++){
                    waitOutOfStock_button_monitro(i);
                }
            });

            $("#waitClosing").click(function () {
              /* alert("待收货订单");
                console.log("state 为 2 表示此订单为 等待收货订单");
                console.log(waitClosingOrder);*/
                showWaitClosing(waitClosingOrder);

                for (var i = 0; i < waitClosingOrder.length; i ++){
                    waitClosing_button_monitro(i);
                }
            });

            $("#closingOrder").click(function () {
                /*alert("已完成订单");
                console.log("state 为 3 表示此订单为 等待已完成订单");
                console.log(closingOrder);*/
                showClosingOrder(closingOrder);

                for (var i = 0; i < closingOrder.length; i ++){
                    delete_button_monitro(i);
                }

            });


            //对元素控件进行监听

            //全部订单的元素控件监听
            for (var j = 0; j < orders.length; j++){
                //对全部订单中的按钮进行监听
                order_button_monitro(j);
            }

        },
        error:function (result) {
            console.log(result);
            alert("获取数据失败");
        }
    })
}

function showAllOrder(orders) {
    var orderHTML = "";
    for (var i = 0; i < orders.length; i++){
        //获取单个Order
        var order = orders[i];

        //html 拼接
        orderHTML += "<div class=\"order-status\">";
        //添加订单详情
        orderHTML += "<div class=\"order-title\">";
        orderHTML += "<div class=\"dd-num\">订单编号：<a id=\"order_" + i + "_orderId\"  href=\"javascript:;\">" + order.orderid + "</a></div>";
        orderHTML += "<span id=\"order_"+ i + "_createTime\" >创建时间：" + changeTime(order.createTime) + "</span>";
        orderHTML += "</div>";

        //遍历添加 OrderItem与Product
        orderHTML += "<div class=\"order-content\">";
        orderHTML += "<div id=\"showOrderItem_" + i + "\" class=\"order-left\">";

        for (var j = 0; j < order.orderItems.length; j++){
            //获取订单项
            var orderItem = order.orderItems[j];
            //获取商品
            var product = orderItem.product;

            //添加订单项及商品
            orderHTML += "<ul class=\"item-list\">";
            orderHTML += "<li class=\"td td-item\"><div class=\"item-pic\">";

            //订单图片
            orderHTML += "<a href=\"#\" class=\"J_MakePoint\">";
            orderHTML += "<img id=\"order_" + i + "_orderItem_" + i + "_product_src\" src=\"" + product.pimg + "\" class=\"itempic J_ItemImg\">";
            orderHTML += "</a></div>";

            orderHTML += "<div class=\"item-info\"><div class=\"item-basic-info\">";

            //跳转到订单详情
            orderHTML += "<a href=\"#\"><p id=\"order_" + i + "_orderItem_" + j + "_product_pname\">" + product.pname + "</p><br/>";
            orderHTML += "<p id=\"order_" + i + "_orderItem_" + j + "_product_describe\" class=\"info-little\">" + product.describe + "</p>";
            orderHTML += "</a></div></div></li>";

            //商品价格
            orderHTML += "<li class=\"td td-price\">";
            orderHTML += "<div id=\"order_" + i + "_orderItem_" + j + "_product_price\" class=\"item-price\"> " + product.price + "</div></li>" ;

            //商品数量
            orderHTML += "<class=\"td td-number\"><div class=\"item-number\"><br/>            " +
                "<span id=\"order_" + i + "_orderItem_" + j + "_pnumber\">×" + orderItem.pnumber + "</span></div></li>";
            orderHTML += "</ul>";
        }
        orderHTML += "</div>";
        //添加订单合计
        orderHTML += "<div class=\"order-right\"><li class=\"td td-amount\"><div id=\"order_" + i + "_money\" class=\"item-amount\"> " + order.money + "</div></li>";
        orderHTML += "<div class=\"move-right\"><li class=\"td td-status\">";
        orderHTML += "<div class=\"item-status\">";

        //添加switch 判断
        if (order.state == 0){
            orderHTML += "<p class=\"Mystatus\" id=\"order_" + i + "_state\">等待支付</p>";
        }else if (order.state == 1){
            orderHTML += "<p class=\"Mystatus\" id=\"order_" + i + "_state\">已支付</p>";
        }else if(order.state == 2){
            orderHTML += "<p class=\"Mystatus\" id=\"order_" + i + "_state\">卖家已发货</p>";
        }else if (order.state == 3){
            orderHTML += "<p class=\"Mystatus\" id=\"order_" + i + "_state\">交易成功</p>";
        }

        orderHTML += "</div></li>";
        orderHTML += "<li class=\"td td-change\">";
        orderHTML += "<div id=\"order_" + i + "_controller\" class=\"am-btn am-btn-danger anniu\">";


        if (order.state == 0){
            orderHTML += "待付款</div>";
        }else if (order.state == 1){
            orderHTML += "等待出库</div>";
         }else if(order.state == 2){
            orderHTML += "确认收货</div>";
        }else if (order.state == 3){
            orderHTML += "删除订单</div>";
        }



        orderHTML += "</li></div></div></div></div>";

        orderHTML += "</div>"
    }

    $("#showAllOrder").html(orderHTML);
}

function showWaitPayOrder(orders) {
    var orderHTML = "";
    for (var i = 0; i < orders.length; i++){
        //获取单个Order
        var order = orders[i];

        //html 拼接
        orderHTML += "<div class=\"order-status\">";
        //添加订单详情
        orderHTML += "<div class=\"order-title\">";
        orderHTML += "<div class=\"dd-num\">订单编号：<a id=\"waitPay_" + i + "_orderId\"  href=\"javascript:;\">" + order.orderid + "</a></div>";
        orderHTML += "<span id=\"waitPay_"+ i + "_createTime\" >创建时间：" + changeTime(order.createTime) + "</span>";
        orderHTML += "</div>";

        //遍历添加 OrderItem与Product
        orderHTML += "<div class=\"order-content\">";
        orderHTML += "<div id=\"waitPay_" + i + "\" class=\"order-left\">";

        for (var j = 0; j < order.orderItems.length; j++){
            //获取订单项
            var orderItem = order.orderItems[j];
            //获取商品
            var product = orderItem.product;

            //添加订单项及商品
            orderHTML += "<ul class=\"item-list\">";
            orderHTML += "<li class=\"td td-item\"><div class=\"item-pic\">";

            //订单图片
            orderHTML += "<a href=\"#\" class=\"J_MakePoint\">";
            orderHTML += "<img id=\"waitPay_" + i + "_orderItem_" + i + "_product_src\" src=\"" + product.pimg + "\" class=\"itempic J_ItemImg\">";
            orderHTML += "</a></div>";

            orderHTML += "<div class=\"item-info\"><div class=\"item-basic-info\">";

            //跳转到订单详情
            orderHTML += "<a href=\"#\"><p id=\"waitPay_" + i + "_orderItem_" + j + "_product_pname\">" + product.pname + "</p><br/>";
            orderHTML += "<p id=\"waitPay_" + i + "_orderItem_" + j + "_product_describe\" class=\"info-little\">" + product.describe + "</p>";
            orderHTML += "</a></div></div></li>";

            //商品价格
            orderHTML += "<li class=\"td td-price\">";
            orderHTML += "<div id=\"waitPay_" + i + "_orderItem_" + j + "_product_price\" class=\"item-price\"> " + product.price + "</div></li>" ;

            //商品数量
            orderHTML += "<class=\"td td-number\"><div class=\"item-number\"><br/>            " +
                "<span id=\"waitPay_" + i + "_orderItem_" + j + "_pnumber\">×" + orderItem.pnumber + "</span></div></li>";
            orderHTML += "</ul>";
        }
        orderHTML += "</div>";
        //添加订单合计
        orderHTML += "<div class=\"order-right\"><li class=\"td td-amount\"><div id=\"waitPay_" + i + "_money\" class=\"item-amount\"> " + order.money + "</div></li>";
        orderHTML += "<div class=\"move-right\"><li class=\"td td-status\">";
        orderHTML += "<div class=\"item-status\">";

        //添加switch 判断
        //添加switch 判断
        //添加switch 判断
        if (order.state == 0){
            orderHTML += "<p class=\"Mystatus\" id=\"waitPay_" + i + "_state\">等待支付</p>";
        }else if (order.state == 1){
            orderHTML += "<p class=\"Mystatus\" id=\"waitPay_" + i + "_state\">已支付</p>";
        }else if(order.state == 2){
            orderHTML += "<p class=\"Mystatus\" id=\"waitPay_" + i + "_state\">卖家已发货</p>";
        }else if (order.state == 3){
            orderHTML += "<p class=\"Mystatus\" id=\"waitPay_" + i + "_state\">交易成功</p>";
        }

        orderHTML += "</div></li>";
        orderHTML += "<li class=\"td td-change\">";
        orderHTML += "<div id=\"waitPay_" + i + "_topay\" class=\"am-btn am-btn-danger anniu\">";
        orderHTML += "待付款</div>";
        orderHTML += "</li></div></div></div></div>";

        orderHTML += "</div>"
    }

    $("#showWaitPayOrder").html(orderHTML);
}

function showWaitOutOfStock(orders) {
    var orderHTML = "";
    for (var i = 0; i < orders.length; i++){
        //获取单个Order
        var order = orders[i];

        //html 拼接
        orderHTML += "<div class=\"order-status\">";
        //添加订单详情
        orderHTML += "<div class=\"order-title\">";
        orderHTML += "<div class=\"dd-num\">订单编号：<a id=\"waitOutOfStock_" + i + "_orderId\"  href=\"javascript:;\">" + order.orderid + "</a></div>";
        orderHTML += "<span id=\"waitOutOfStock_"+ i + "_createTime\" >创建时间：" + changeTime(order.createTime) + "</span>";
        orderHTML += "</div>";

        //遍历添加 OrderItem与Product
        orderHTML += "<div class=\"order-content\">";
        orderHTML += "<div id=\"waitOutOfStock_" + i + "\" class=\"order-left\">";

        for (var j = 0; j < order.orderItems.length; j++){
            //获取订单项
            var orderItem = order.orderItems[j];
            //获取商品
            var product = orderItem.product;

            //添加订单项及商品
            orderHTML += "<ul class=\"item-list\">";
            orderHTML += "<li class=\"td td-item\"><div class=\"item-pic\">";

            //订单图片
            orderHTML += "<a href=\"#\" class=\"J_MakePoint\">";
            orderHTML += "<img id=\"waitOutOfStock_" + i + "_orderItem_" + i + "_product_src\" src=\"" + product.pimg + "\" class=\"itempic J_ItemImg\">";
            orderHTML += "</a></div>";

            orderHTML += "<div class=\"item-info\"><div class=\"item-basic-info\">";

            //跳转到订单详情
            orderHTML += "<a href=\"#\"><p id=\"waitOutOfStock_" + i + "_orderItem_" + j + "_product_pname\">" + product.pname + "</p><br/>";
            orderHTML += "<p id=\"waitOutOfStock_" + i + "_orderItem_" + j + "_product_describe\" class=\"info-little\">" + product.describe + "</p>";
            orderHTML += "</a></div></div></li>";

            //商品价格
            orderHTML += "<li class=\"td td-price\">";
            orderHTML += "<div id=\"waitOutOfStock_" + i + "_orderItem_" + j + "_product_price\" class=\"item-price\"> " + product.price + "</div></li>" ;

            //商品数量
            orderHTML += "<class=\"td td-number\"><div class=\"item-number\"><br/>            " +
                "<span id=\"waitOutOfStock_" + i + "_orderItem_" + j + "_pnumber\">×" + orderItem.pnumber + "</span></div></li>";
            orderHTML += "</ul>";
        }
        orderHTML += "</div>";
        //添加订单合计
        orderHTML += "<div class=\"order-right\"><li class=\"td td-amount\"><div id=\"waitOutOfStock_" + i + "_money\" class=\"item-amount\"> " + order.money + "</div></li>";
        orderHTML += "<div class=\"move-right\"><li class=\"td td-status\">";
        orderHTML += "<div class=\"item-status\">";

        //添加switch 判断
        //添加switch 判断
        if (order.state == 0){
            orderHTML += "<p class=\"Mystatus\" id=\"waitOutOfStock_" + i + "_state\">等待支付</p>";
        }else if (order.state == 1){
            orderHTML += "<p class=\"Mystatus\" id=\"waitOutOfStock_" + i + "_state\">已支付</p>";
        }else if(order.state == 2){
            orderHTML += "<p class=\"Mystatus\" id=\"waitOutOfStock_" + i + "_state\">卖家已发货</p>";
        }else if (order.state == 3){
            orderHTML += "<p class=\"Mystatus\" id=\"waitOutOfStock_" + i + "_state\">交易成功</p>";
        }

        orderHTML += "</div></li>";
        orderHTML += "<li class=\"td td-change\">";
        orderHTML += "<div id=\"waitOutOfStock_" + i + "_outofStock\" class=\"am-btn am-btn-danger anniu\">";
        orderHTML += "等待出库</div>";
        orderHTML += "</li></div></div></div></div>";

        orderHTML += "</div>"
    }

    $("#showWaitOutOfStock").html(orderHTML);
}

function showWaitClosing(orders) {
    var orderHTML = "";
    for (var i = 0; i < orders.length; i++){
        //获取单个Order
        var order = orders[i];

        //html 拼接
        orderHTML += "<div class=\"order-status\">";
        //添加订单详情
        orderHTML += "<div class=\"order-title\">";
        orderHTML += "<div class=\"dd-num\">订单编号：<a id=\"waitClosing_" + i + "_orderId\"  href=\"javascript:;\">" + order.orderid + "</a></div>";
        orderHTML += "<span id=\"waitClosing_"+ i + "_createTime\" >创建时间：" + changeTime(order.createTime) + "</span>";
        orderHTML += "</div>";

        //遍历添加 OrderItem与Product
        orderHTML += "<div class=\"order-content\">";
        orderHTML += "<div id=\"waitClosing_" + i + "\" class=\"order-left\">";

        for (var j = 0; j < order.orderItems.length; j++){
            //获取订单项
            var orderItem = order.orderItems[j];
            //获取商品
            var product = orderItem.product;

            //添加订单项及商品
            orderHTML += "<ul class=\"item-list\">";
            orderHTML += "<li class=\"td td-item\"><div class=\"item-pic\">";

            //订单图片
            orderHTML += "<a href=\"#\" class=\"J_MakePoint\">";
            orderHTML += "<img id=\"waitClosing_" + i + "_orderItem_" + i + "_product_src\" src=\"" + product.pimg + "\" class=\"itempic J_ItemImg\">";
            orderHTML += "</a></div>";

            orderHTML += "<div class=\"item-info\"><div class=\"item-basic-info\">";

            //跳转到订单详情
            orderHTML += "<a href=\"#\"><p id=\"waitClosing_" + i + "_orderItem_" + j + "_product_pname\">" + product.pname + "</p><br/>";
            orderHTML += "<p id=\"waitClosing_" + i + "_orderItem_" + j + "_product_describe\" class=\"info-little\">" + product.describe + "</p>";
            orderHTML += "</a></div></div></li>";

            //商品价格
            orderHTML += "<li class=\"td td-price\">";
            orderHTML += "<div id=\"waitClosing_" + i + "_orderItem_" + j + "_product_price\" class=\"item-price\"> " + product.price + "</div></li>" ;

            //商品数量
            orderHTML += "<class=\"td td-number\"><div class=\"item-number\"><br/>            " +
                "<span id=\"waitClosing_" + i + "_orderItem_" + j + "_pnumber\">×" + orderItem.pnumber + "</span></div></li>";
            orderHTML += "</ul>";
        }
        orderHTML += "</div>";
        //添加订单合计
        orderHTML += "<div class=\"order-right\"><li class=\"td td-amount\"><div id=\"waitClosing_" + i + "_money\" class=\"item-amount\"> " + order.money + "</div></li>";
        orderHTML += "<div class=\"move-right\"><li class=\"td td-status\">";
        orderHTML += "<div class=\"item-status\">";

        //添加switch 判断
        //添加switch 判断
        if (order.state == 0){
            orderHTML += "<p class=\"Mystatus\" id=\"waitClosing_" + i + "_state\">等待支付</p>";
        }else if (order.state == 1){
            orderHTML += "<p class=\"Mystatus\" id=\"waitClosing_" + i + "_state\">已支付</p>";
        }else if(order.state == 2){
            orderHTML += "<p class=\"Mystatus\" id=\"waitClosing_" + i + "_state\">卖家已发货</p>";
        }else if (order.state == 3){
            orderHTML += "<p class=\"Mystatus\" id=\"waitClosing_" + i + "_state\">交易成功</p>";
        }

        orderHTML += "</div></li>";
        orderHTML += "<li class=\"td td-change\">";
        orderHTML += "<div id=\"waitClosing_" + i + "_closing\" class=\"am-btn am-btn-danger anniu\">";
        orderHTML += "确认收货</div>";
        orderHTML += "</li></div></div></div></div>";

        orderHTML += "</div>"
    }

    $("#showWaitClosingOrder").html(orderHTML);
}

function showClosingOrder(orders) {
    var orderHTML = "";
    for (var i = 0; i < orders.length; i++){
        //获取单个Order
        var order = orders[i];

        //html 拼接
        orderHTML += "<div class=\"order-status\">";
        //添加订单详情
        orderHTML += "<div class=\"order-title\">";
        orderHTML += "<div class=\"dd-num\">订单编号：<a id=\"closingOrder_" + i + "_orderId\"  href=\"javascript:;\">" + order.orderid + "</a></div>";
        orderHTML += "<span id=\"closingOrder_"+ i + "_createTime\" >创建时间：" + changeTime(order.createTime) + "</span>";
        orderHTML += "</div>";

        //遍历添加 OrderItem与Product
        orderHTML += "<div class=\"order-content\">";
        orderHTML += "<div id=\"closingOrder_" + i + "\" class=\"order-left\">";

        for (var j = 0; j < order.orderItems.length; j++){
            //获取订单项
            var orderItem = order.orderItems[j];
            //获取商品
            var product = orderItem.product;

            //添加订单项及商品
            orderHTML += "<ul class=\"item-list\">";
            orderHTML += "<li class=\"td td-item\"><div class=\"item-pic\">";

            //订单图片
            orderHTML += "<a href=\"#\" class=\"J_MakePoint\">";
            orderHTML += "<img id=\"closingOrder_" + i + "_orderItem_" + i + "_product_src\" src=\"" + product.pimg + "\" class=\"itempic J_ItemImg\">";
            orderHTML += "</a></div>";

            orderHTML += "<div class=\"item-info\"><div class=\"item-basic-info\">";

            //跳转到订单详情
            orderHTML += "<a href=\"#\"><p id=\"closingOrder_" + i + "_orderItem_" + j + "_product_pname\">" + product.pname + "</p><br/>";
            orderHTML += "<p id=\"closingOrder_" + i + "_orderItem_" + j + "_product_describe\" class=\"info-little\">" + product.describe + "</p>";
            orderHTML += "</a></div></div></li>";

            //商品价格
            orderHTML += "<li class=\"td td-price\">";
            orderHTML += "<div id=\"closingOrder_" + i + "_orderItem_" + j + "_product_price\" class=\"item-price\"> " + product.price + "</div></li>" ;

            //商品数量
            orderHTML += "<class=\"td td-number\"><div class=\"item-number\"><br/>            " +
                "<span id=\"closingOrder_" + i + "_orderItem_" + j + "_pnumber\">×" + orderItem.pnumber + "</span></div></li>";
            orderHTML += "</ul>";
        }
        orderHTML += "</div>";
        //添加订单合计
        orderHTML += "<div class=\"order-right\"><li class=\"td td-amount\"><div id=\"closingOrder_" + i + "_money\" class=\"item-amount\"> " + order.money + "</div></li>";
        orderHTML += "<div class=\"move-right\"><li class=\"td td-status\">";
        orderHTML += "<div class=\"item-status\">";

        //添加switch 判断
        //添加switch 判断
        if (order.state == 0){
            orderHTML += "<p class=\"Mystatus\" id=\"closingOrder_" + i + "_state\">等待支付</p>";
        }else if (order.state == 1){
            orderHTML += "<p class=\"Mystatus\" id=\"closingOrder_" + i + "_state\">已支付</p>";
        }else if(order.state == 2){
            orderHTML += "<p class=\"Mystatus\" id=\"closingOrder_" + i + "_state\">卖家已发货</p>";
        }else if (order.state == 3){
            orderHTML += "<p class=\"Mystatus\" id=\"closingOrder_" + i + "_state\">交易成功</p>";
        }

        orderHTML += "</div></li>";
        orderHTML += "<li class=\"td td-change\">";
        orderHTML += "<div id=\"closingOrder_" + i + "_deleteOrder\" class=\"am-btn am-btn-danger anniu\">";
        orderHTML += "删除订单</div>";
        orderHTML += "</li></div></div></div></div>";

        orderHTML += "</div>"
    }

    $("#showClosingOrder").html(orderHTML);
}


//4.将毫秒数转化为秒
function changeTime(time){
    if(time){
        var oDate = new Date(time*1),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth()+1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds(),
            oTime = oYear +'-'+ getBz(oMonth) +'-'+ getBz(oDay) +' '+ getBz(oHour) +':'+ getBz(oMin) +':'+getBz(oSen);//拼接时间
        return oTime;
    }else{
        return "";
    }

}
//补0
function getBz(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}

//1. Cookie 获取 uid
function cookieGetUid(){
    var uid = $.cookie("customer");
    //获取cookie后对input uid 赋值
    $("#user-uid").val(uid);
    return uid;
}

//js获取项目根路径，如： http://localhost:8083/uimcardprj
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