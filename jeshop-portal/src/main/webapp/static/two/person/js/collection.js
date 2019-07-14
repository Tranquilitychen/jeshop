$(function () {
    var ctx = getRootPath();
    var uid = getCustomerCookie();

    //1. ajax 请求获取 商品数据
    ajaxGetFavoritess(ctx,uid);

});

function ajaxGetFavoritess(ctx,uid) {

    $.ajax({
        url: ctx + "/favorites/selAllFavorites",
        data: {"uid": uid},
        dataType: "json",
        success:function (result) {
            document.getElementById("content").innerHTML = "";
            for (var i = 0; i < result.length; i++){
                var favorites = result[i];
                console.log(favorites);
                testCollection(favorites, i+1);
            }

            /*paddingFavorites(result);*/

            //添加按钮监听

            for (var i  = 0; i < result.length; i++){
                addCartMonitor(ctx, uid, i+1);



                cancelFavorites(ctx, uid, (i+1));
            }
        },
        error:function (result) {
            console.log(result);
        }
    })


}

function testCollection(favorites, i) {
    var content = document.getElementById("content");

    var before = content.innerHTML;

    var product = favorites.product;
    var html = "";
    html += "<div class=\"s-item-wrap\"><div class=\"s-item\"><div class=\"s-pic\">";
    //商品图片
    html += "<a href=\"#\" class=\"s-pic-link\"><img id=\"product_" + i + "_pimg\" src=\"" + product.pimg + "\" alt=\"pimg\" " +
        "title=\"pimg\" class=\"s-pic-img s-guess-item-img\"></a></div>";
    html += "<div class=\"s-info\">";
    html += "<div class=\"s-title\"><a id=\"product_" + i + "_pname\" href=\"#\" title=\"product\">" + product.pname + "</a></div>";
    html += "<div class=\"s-price-box\"><span class=\"s-price\"><em class=\"s-price-sign\">¥</em><em id=\"product_" + i + "_price\" class=\"s-value\">" + product.price + "</em></span>";
    html += "<span class=\"s-history-price\"><em class=\"s-price-sign\">¥</em><em id=\"product_" + i + "_priceadd\" class=\"s-value\">" + ((product.price) + 100) + "</em></span>";
    html += "</div><div class=\"s-extra-box\"><span class=\"s-comment\">好评: 98.03%</span><span class=\"s-sales\">月销: 219</span></div></div>";
    html += "<div class=\"s-tp\"><input type=\"hidden\" id=\"favorite_" + i + "_fid\" value=\"" + favorites.fid + "\" /><input type=\"hidden\" id=\"product_" + i + "_pid\" value=\"" + product.pid + "\" /><span id=\"product_" + i + "_addcart\" class=\"ui-btn-loading-before buy\">加入购物车</span>";
    html += "<i class=\"am-icon-shopping-cart\"></i><span id=\"product_" + i + "_cancel\" class=\"ui-btn-loading-before\">取消收藏</span></div></div></div>";

    content.innerHTML = before + html;
}

//加入购物车按钮监听
function addCartMonitor(ctx, uid, index){
    $("#product_" + index + "_addcart").click(function () {
        var pid = $("#product_" + index + "_pid").val();
        productAddShoppingCar(ctx, pid, 1);
    });
}

//取消收藏按钮监听
function cancelFavorites(ctx, uid, index){
    $("#product_" + index + "_cancel").click(function () {
        var fid = $("#favorite_" + index + "_fid").val();

        $.ajax({
            url: ctx + "/favorites/deleteFaviritesProduct",
            data : {"fid":fid, "uid":uid},
            dataType: "json",
            success :function (result) {
                console.log(result);
                if (result == 1){
                    alert("取消收藏成功");
                    window.location.reload();
                }else{
                    alert("取消收藏失败");
                }
            },
            error : function (result) {
                console.log(result);
                alert("获取数据失败！");
            }

        })
    });

}

//添加商品到购物车功能
function productAddShoppingCar(ctx, pid, amount){
    //直接跳转到后端，在后端指定跳转页面
    window.location.href = ctx + "/shopping/buyerCart?pid=" + pid + "&amount=" + amount;
}

//前端获取 的Cookie
function getCustomerCookie(){
    var uid = $.cookie("customer");
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