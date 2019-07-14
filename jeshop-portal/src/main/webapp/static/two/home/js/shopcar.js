
//存在一个Bug，当选中商品后，修改数量不能修改 合计的钱数
$(function () {
    var ctx = getRootPath();
    //1.Ajax 获取 Cookie 中的数据
    getBuyCartData(ctx);
    //3.全选框 设置选中状态
    checkBox();
    //4.全选框选中事件
    checkListener(ctx);
    //结算
    payment(ctx);
});
//1.Ajax 获取 Cookie 中的数据
function getBuyCartData(ctx){
    $.ajax({
        async: false,
        url: ctx + "/shopping/toCart",
        type: "GET",
        dataType: "json",
        success : function (result) {
            console.log(result);

            var start_BuyItem = document.getElementById("start_buyItem").innerHTML = "";
            /*showJSONBuyCart(1);
                alert("开始2")
                showJSONBuyCart(2);*/
            /*alert(result.items[0].have);*/

            for (var i = 0; i < result.items.length; i++){
                var buycartItem = result.items[i];
                showJSONBuyCart(buycartItem, i+1);
            }

            for (var j = 0; j < result.items.length; j++){
                deletProduct(j + 1);
                product_number(j+1, result.items[j].product.stock);
            }
        },
        error : function () {
            alert("获取数据失败！")
        }
    });
}

//2.填充数据
function showJSONBuyCart(buycartItem, index){
    var product = buycartItem.product;
    //动态生成购物车标签
    var start_BuyItem = document.getElementById("start_buyItem");
    var buyItem = start_BuyItem.innerHTML;
    start_BuyItem.innerHTML = buyItem + "<ul class=\"item-content clearfix\">\n" +
        "\n" +
        "                        <input id=\"product_id_" + index +"\" type=\"hidden\" value=\" " + product.pid + "\"/>\n" +
        "\n" +
        "                        <li class=\"td td-chk\">\n" +
        "                            <div class=\"cart-checkbox \">\n" +
        "                                <!--购物车项的 选中按钮-->\n" +
        "                                <input class=\"checkSingle\" id=\"check_box_" + index + "\" name=\"items[]\" value=\""+ index + "\"\n" +
        "                                       type=\"checkbox\">\n" +
        "                                <!--<label> 标签的 for 属性应当与相关元素的 id 属性相同。-->\n" +
        "                                <label for=\"check_box_" + index +"\"></label>\n" +
        "                            </div>\n" +
        "                        </li>\n" +
        "\n" +
        "                        <!--商品详情-->\n" +
        "                        <li class=\"td td-item\">\n" +
        "                            <div class=\"item-pic\">\n" +
        "                                <!--点击跳转到指定商品页面-->\n" +
        "                                <a href=\"#\" target=\"_blank\" data-title=\""+ product.pname +"\"\n" +
        "                                   class=\"J_MakePoint\" data-point=\"tbcart.8.12\">\n" +
        "                                    <!--商品图片-->\n" +
        "                                    <img src=\""+ product.pimg + "\" class=\"itempic J_ItemImg\"></a>\n" +
        "                            </div>\n" +
        "\n" +
        "                            <div class=\"item-info\">\n" +
        "                                <div class=\"item-basic-info\">\n" +
        "                                    <!--商品介绍-->\n" +
        "                                    <a href=\"#\" target=\"_blank\" title=\"" + product.pname + "\"\n" +
        "                                       class=\"item-title J_MakePoint\" data-point=\"tbcart.8.11\">" + product.pname + "</a>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </li>\n" +
        "\n" +
        "                        <!--商品描述-->\n" +
        "                        <li class=\"td td-info\">\n" +
        "\n" +
        "                            <div class=\"item-props item-props-can\">\n" +
        "                                <span class=\"sku-line\">" + product.describe + "</span>\n" +
        "                                <i class=\"theme-login am-icon-sort-desc\"></i>\n" +
        "                            </div>\n" +
        "                        </li>\n" +
        "\n" +
        "                        <li class=\"td td-price\">\n" +
        "                            <div class=\"item-price price-promo-promo\">\n" +
        "                                <div class=\"price-content\">\n" +
        "                                    <!--打折价格-->\n" +
        "                                    <!--<div class=\"price-line\">\n" +
        "                                        <em class=\"price-original\">78.00</em>\n" +
        "                                    </div>-->\n" +
        "                                    <div class=\"price-line\">\n" +
        "                                        <!--商品单价-->\n" +
        "                                        <em id=\"single_price_" + index + "\" class=\"J_Price price-now\" tabindex=\"0\">" + product.price + "元" + "</em>\n" +
        "                                    </div>\n" +
        "\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </li>\n" +
        "\n" +
        "                        <!--数量增加与减少-->\n" +
        "                        <li class=\"td td-amount\">\n" +
        "                            <div class=\"amount-wrapper \">\n" +
        "                                <div class=\"item-amount \">\n" +
        "                                    <div class=\"sl\">\n" +
        "                                        <input id=\"min_" + index + "\" class=\"min am-btn\" name=\"\" type=\"button\" value=\"-\"/>\n" +
        "                                        <input id=\"text_box_" + index + "\" class=\"text_box\" name=\"\" type=\"text\" value=\""+ buycartItem.amount + "\" style=\"width:30px;\"/>\n" +
        "                                        <input id=\"add_"+ index + "\" class=\"add am-btn\" name=\"\" type=\"button\" value=\"+\"/>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </li>\n" +
        "\n" +
        "                        <li class=\"td td-sum\">\n" +
        "                            <div class=\"td-inner\">\n" +
        "                                <!--商品总金额, 可以使用别的函数来动态完成-->\n" +
        "                                <div><p id=\"product_price_" + index + "\">" + product.stock + "件" + "</p></div>\n" +
        "                                <!--<em tabindex=\"0\" class=\"J_ItemSum number\">117.00</em>-->\n" +
        "                            </div>\n" +
        "                        </li>\n" +
        "                        <li class=\"td td-op\">\n" +
        "                            <div class=\"td-inner\">\n" +
        "                                <!--删除购物车商品-->\n" +
        "                                <a href=\"#\" id=\"delete_" + index + "\" class=\"delete\">\n" +
        "                                    删除</a>\n" +
        "                            </div>\n" +
        "                        </li>\n" +
        "                    </ul>";
}

//3.全选框 设置选中状态
function checkBox() {
    //全选框 全选 item
    $("#check_all").click(function () {
        //点击 全选按钮时直接 修改为 另一个状态
        $(".checkSingle").prop('checked', this.checked);
    });

    $(".checkSingle").click(function () {
        if ( $(".checkSingle").length == $(".checkSingle:checked").length ){
            //当 选中的按钮数量为 全部时 全选按钮被选中，为true
            $("#check_all").prop('checked', true);
        }else{
            //当 选中的按钮数量 不是 全部时 全选按钮不亮，为false
            $("#check_all").prop('checked', false);
        }
    });
}

//4选中框选中事件
function checkListener(ctx){
    //2.1批量删除
    $("#deleteAll").click(function () {
        var checkedNum = $("input[name='items[]']:checked").length;
       //判断至少选中一项
       if (checkedNum == 0){
           alert("请至少选中一项!");
       }else{
           $("input[name='items[]']:checked").each(function (i, item) {
               //这里可以用$(this)直接访问后台 删除掉 购物车的Cookie
               //索引
               var index = $(this).val();
                //根据索引查出pid
               $("#product_id_" + index).val();
               var pid = document.getElementById("product_id_" + index).value;
               //功能还不完善
               /*window.location.href = ctx + "/shopping/delete?pid=" + pid;*/
           });
       }
    });


    //每次选中都重新计算（这样就可以解决）
    $(":checkbox").on("change", function () {
        var total = 0;
        var number = 0;

        //检索所有被选中的按钮
        $("input[name='items[]']:checked").each(function (i, item) {
            //这里可以用$(this)直接访问后台 删除掉 购物车的Cookie
            var index = $(this).val();

            //获取选中商品的总价格
            var single_price = document.getElementById("single_price_" + index).innerHTML;
            var product_amount = document.getElementById("text_box_" + index).value;

            //计算得出总价
            total = total + parseFloat(single_price) * parseFloat(product_amount);
            number++;
        });

        //获取所有选中商品的价格
        document.getElementById("buyCar_total").innerHTML = total;
        //获取商品
        document.getElementById("checked_number").innerHTML = number;
    });
}

//4.1.数量加减框 （参数为 遍历 index 从1开始， stock为库存）
function product_number(i, stock){
   $("#add_" + i).click(function () {
       var t= $("#text_box_" + i);
      t.val(parseInt(t.val()) + 1);
      if (parseInt(t.val()) > stock){
          t.val(stock);
      }
   });

   $("#min_"+ i).click(function () {
       var t= $("#text_box_" + i);
       t.val(parseInt(t.val()) - 1);
       if(parseInt(t.val())<1){
           t.val(1);
       }
   });

   $("#text_box_" + i).blur(function () {
       if(this.value > stock){
           alert("不能大于"+ stock + "！");
           this.value=stock;
           this.focus();
       }

       if(this.value < 1){
           alert("不能小于"+ 1 + "！");
           this.value= 1;
           this.focus();
       }
   });

}

//4.设置 选中状态后不能修改数量(未完成)

//5.设置点选删除，删除购物车商品
function deletProduct(index){
    var ctx = getRootPath();
    //获取商品id
    $("#delete_" + index).click(function () {
        var pid = $("#product_id_" + index).val();
        alert("跳转到后台删除Cookie : " + pid);
        window.location.href = ctx + "/shopping/delete?pid=" + pid;
    });
}

//6.点击结算按钮的点击事件
function payment(ctx){
    $("#payment").click(function () {
        //1.遍历选中的商品， 选中商品到后台删除，生成订单
        //下标从1开始
        var pids = new Array();
        var amounts = new Array();
        $("input[name='items[]']:checked").each(function (i, item) {
            index = i + 1;

            //2.获取商品 id 以及商品的数量
            var pid = $("#product_id_" + index).val();
            var amount = $("#text_box_" + index).val();

            //存放进数组
            pids[i] = pid;
            amounts[i] = amount;


        });
        console.log(pids);
        console.log(amounts);


        //3.发送到后台修改Cookie
        //修改为ajax发送
        window.location.href=ctx + "/shopping/payment?pids=" + pids + "&amounts=" + amounts;
        /*$.ajax({
           async: false,
           url : ctx + "/shopping/payment",
           data: {"json": json},
           dataType: "json",
            success:function () {
               //跳转到结账页面
                alert("修改Cookie成功");
                /!*window.location.href = ""*!/
            },
            error : function() {

             }
        });*/

        return false;
    });
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
