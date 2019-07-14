//JQuery

//页面加载时完成
$(function(){
    var ctx = getRootPath();
    //第一个Ajax请求 FashionProduct
    showFashionProduct(ctx);
    //添加第二个ajax 请求 newProduct
    showNewProduct(ctx);
    //搜索框
    likeKeyQuery(ctx);

    simple(ctx);
    //4.判断是否登陆
    CustomerisLoading()
    //5.购物车点击
    shopCarlist(ctx);

});

function simple(ctx){
    $("#fashionwomen").click(function () {
        window.location.href = ctx + "/static/main/single-product.html?pid=" + 48;
        return false;
    });

    $("#sellCollection").click(function () {
        window.location.href = ctx + "/static/two/person/collection.html";
    });

    $("#collection_wishlist").click(function () {
        var uid = cookieGetUid();
        if (uid != null){
            window.location.href = ctx + "/static/two/person/collection.html";
        }else{
            alert("请先登录！");
            window.location.href = ctx + "/static/main/index.html";
        }
        return false;
    });
}

//4.判断是否登陆
function CustomerisLoading(){
    var uid = $.cookie("customer");
    if (uid != null){
        //将登陆转变为个人中心
        $("#login").html("Person");
        $("#login").attr("href", "http://localhost:81/jeshop/static/two/person/information.html");
    }
}
//主页上部购物车部分
function shopCarlist(ctx){
    //shopcar_list_ul
    $("#shopcar_list").click(function () {

        window.location.href = ctx + "/static/two/home/shopcart.html";
    })
}



//第一个Ajax请求 FashionProduct
function showFashionProduct(ctx) {
    //1.完成fashion_show(result)的编写
    //1.1获取fashion_product表的数据
    $.ajax({
        async: false,
        url: ctx + "/product/fashionShow",
        type: "GET",
        dataType: "json",
        success :function (result) {
            console.log(result);
            //1.2 数据填到元素中
            fashion_show(result);

            //为 第一个Ajax请求添加监听事件
            $(".fashion_product").each(function (k, item) {
                //1.为link添加监听对象
                $("#fashion_product_" + (k+1) + "_link").click(function () {
                    var pid = $("#fashion_product_" + (k+1) + "_pid").val();
                    window.location.href = ctx + "/static/main/single-product.html?pid=" + pid;
                });

                //2, 添加商品到收藏栏
                $("#fashion_product_" + (k+1) + "_heart").click(function () {
                    //fashion_product_5_heart
                    var pid = $("#fashion_product_" + (k+1) + "_pid").val();
                    alert("添加 pid:" + pid + "商品到收藏栏");
                    productAddFavorites(ctx, pid);
                });

                //3.添加商品到购物车
                $("#fashion_product_" + (k+1) + "_cart").click(function () {
                    var pid = $("#fashion_product_" + (k+1) + "_pid").val();
                    alert("添加 pid:" + pid + "商品到购物车");
                    productAddShoppingCar(ctx, pid, 1);
                });
            });
        },
        error :function () {
            alert("数据访问失败");
        }
    });
}

//添加第二个ajax 请求 newProduct
function showNewProduct(ctx) {
    $.ajax({
        async: false,
        url: ctx + "/product/showNewProduct?limit=4",
        type: "GET",
        dataType: "json",
        success : function (result) {
            console.log(result);
            newProduct_show(result);

            //3.为 ul元素添加点击事件
            //写个Jquery
            $(".newProduct").each(function (k, item) {
                //1.为link添加监听对象
                $("#newProduct_" + (k+1) + "_link").click(function () {
                    var pid = $("#newProduct_" + (k+1) + "_pid").val();
                    window.location.href = ctx + "/static/main/single-product.html?pid=" + pid;
                });

                //2, 添加商品到收藏栏
                $("#newProduct_" + (k+1) + "_heat").click(function () {
                    var pid = $("#newProduct_" + (k+1) + "_pid").val();
                    alert("添加 pid:" + pid + "商品到收藏栏");
                    productAddFavorites(ctx, pid);
                });

                //3.添加商品到购物车
                $("#newProduct_" + (k+1) + "_cart").click(function () {
                    var pid = $("#newProduct_" + (k+1) + "_pid").val();
                    alert("添加 pid:" + pid + "商品到购物车");
                    productAddShoppingCar(ctx, pid, 1);
                });
            });

        },
        error: function () {
            alert("数据访问失败");
        }
    });
}

//添加第三个Ajax请求 --- 模糊查询
function likeKeyQuery(ctx){
    //搜索框的监听事件
    $("#search_button_li").bind('click', function () {
        var key = $("#search_key").val();
        if(key == ""){
            alert("请输入搜索内容！");
        }else{
            //根据模糊查询的 key 查询信息，跳转到 对应页面
            window.location.href = ctx + "/static/main/product-list.html?key=" + key;
        }

    });
}

//fashion_show 数据插入：
function fashion_show(result){
    for (var i = 0; i < result.length; i++){
        //1.先获取元素
        var fashion_product_pid = document.getElementById("fashion_product_" + (i+1) + "_pid");
        var fashion_show_pname = document.getElementById("fashion_product_" + (i+1) + "_pname");
        var fashion_show_describte = document.getElementById("fashion_product_" + (i+1) + "_describe");
        var fashion_show_img = document.getElementById("fashion_product_"+ (i+1) +"_img");

        //2.为元素赋值
        fashion_show_pname.innerHTML = result[i].pname;
        fashion_show_describte.innerHTML = result[i].describe;
        fashion_show_img.src=result[i].pimg;
        fashion_product_pid.value = result[i].pid;

        //3.为图片添加点击事件

    }

}

//new Product数据插入：
function newProduct_show(result){
    var ctx = getRootPath();
    for (var i = 0; i < result.length; i++){
        //1.获取元素
        var newProduct_pid = document.getElementById("newProduct_"+ (i+1) + "_pid");
        var newProduct_img = document.getElementById("newProduct_" + (i+1) + "_img");
        var newProduct_pname = document.getElementById("newProduct_" + (i+1) + "_pname");
        var newProduct_price = document.getElementById("newProduct_" + (i+1) +"_price");
        var newProduct_describe = document.getElementById("newProduct_" + (i+1) + "_describe")

        //2.为元素赋值
        newProduct_pid.value = result[i].pid;
        newProduct_img.src = result[i].pimg;
        newProduct_pname.innerHTML = result[i].pname;
        newProduct_describe.innerHTML = result[i].describe;
        newProduct_price.innerHTML = result[i].price;
    }
}

//根据ptype来选择url
function switchURL(ctx, ptype){
    var url = "";
    alert("switchURL ' s ptype:" + ptype);
    /** url选择器：
     * 		0：显示查询全部商品  			ctx + "/product/selAllProduct"
     *		1：显示查询 日用品 商品			ctx + "/product/selProductForType" + "?ptype=ptype"
     *		2：显示	查询 食物 商品			ctx + "/product/selProductForType"
     *		3：显示查询 首饰 商品			ctx + "/product/selProductForType"
     *     4： 显示 模糊查询 商品			ctx + "/product/selProductForType"
     **/
    if(ptype == "0"){
        url = ctx + "/product/selAllProduct";
    }else{
        url = ctx + "/product/selProductForType?ptype=" + ptype;
    }
    alert("url:" + url);
    return url;
}

//添加商品到购物车功能
function productAddShoppingCar(ctx, pid, amount){
    alert("pid:" + pid + ", amount:" + amount);
    //直接跳转到后端，在后端指定跳转页面
    window.location.href = ctx + "/shopping/buyerCart?pid=" + pid + "&amount=" + amount;
}

//添加商品到收藏栏
function productAddFavorites(ctx, pid){
    var uid = cookieGetUid();
    alert("添加到收藏");

    $.ajax({
       url : ctx + "/favorites/insertFaviritesProduct",
        data: {"uid": uid, "pid" : pid},
        dataType: "json",
        success : function (result) {
           console.log(result);
            if (result == 1){
                alert("添加商品到 收藏夹 成功");
            }else if (result == 2){
                alert("该商品已经在收藏夹中");
            } else{
                alert("添加商品到 收藏夹 成功")
            }
        },
        error:function (result) {
            console.log(result);
            alert("获取数据失败");
        }
    });
}


//1. Cookie 获取 uid
function cookieGetUid(){
    var uid = $.cookie("customer");
    //获取cookie后对input uid 赋值
    return uid;
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