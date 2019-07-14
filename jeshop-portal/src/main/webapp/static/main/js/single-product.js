$(function () {
    //1.获取根据请求域中的id
    var ctx = getRootPath();
    var pid = getUrlParam("pid");
    //购买数量

    //2.调用ajax 获取 指定id的 商品信息
    selProductForPid(ctx, pid);

    //3.添加第二个ajax 请求 newProduct 新品
    showNewProduct(ctx);

    //4.添加商品到购物车功能
    $("#product_addCart").click(function () {
        var amount = $("#product_amount").val();
       productAddShoppingCar(ctx, pid, amount);
       return false;
    });

    shopCarlist(ctx);
    likeKeyQuery(ctx);
    CustomerisLoading();

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
});

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
function shopCarlist(ctx){
    //shopcar_list_ul
    $("#shopcar_list").click(function () {

        window.location.href = ctx + "/static/two/home/shopcart.html";
    })
}
function CustomerisLoading(){
    var uid = $.cookie("customer");
    if (uid != null){
        //将登陆转变为个人中心
        $("#login").html("Person");
        $("#login").attr("href", "http://localhost:81/jeshop/static/two/person/information.html");
    }
}

//添加商品到购物车功能
function productAddShoppingCar(ctx, pid, amount){
    //直接跳转到后端，在后端指定跳转页面
    window.location.href = ctx + "/shopping/buyerCart?pid=" + pid + "&amount=" + amount;
}

//添加商品到收藏栏
function productAddFavorites(ctx, pid){
    var uid = cookieGetUid();

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
    $("#user-uid").val(uid);
    return uid;
}

//第一个 Ajax 请求查询 pid 的商品
function selProductForPid(ctx, pid){
    $.ajax({
        //同步获取信息，
        async:false,
        url: ctx + "/product/selProductForId",
        data: {pid:pid},
        dataType: "json",
        success: function (result) {
            console.log(result);
            product_show(result);
        },
        error:function () {
            alert("获取数据失败");
        }
    });
}
//填充 id 商品信息
function product_show(result){
    var product_stock = result.stock;
    var product_pname = result.pname;
    var product_describe = result.describe;
    var product_price = result.price;
    var product_pimg = result.pimg;

    $("#product_stock").text(product_stock);
    $("#product_pname").text(product_pname);
    $("#product_describe").text(product_describe);
    $("#product_price").text(product_price);
    $("#product_pimg").attr("src",product_pimg);

    //判断库存是否还有
    product_stockISTrue(product_stock);
}

//判断库存，修改 库存的class样式
function product_stockISTrue(stock){
    product_amount(stock);
    if (stock < 1){
        alert("库存不足");
        var product_isStock = document.getElementById("product_isStock");
        product_isStock.className = "btn btn-default";
    }

}

//添加第二个ajax 请求 newProduct
function showNewProduct(ctx) {
    $.ajax({
        async: true,        /*可以异步获取 好像*/
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

//new Product 新品数据插入：
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

//数量加减框
//3.数量加减框 （参数为 遍历 index 从1开始， stock为库存）
function product_amount(stock){
    $("#add_amount").click(function () {
        var t= $("#product_amount");
        t.val(parseInt(t.val()) + 1);

        if (parseInt(t.val()) > stock){
            t.val(stock);
        }
    });

    $("#min_amount").click(function () {
        var t= $("#product_amount");
        t.val(parseInt(t.val()) - 1);
        if(parseInt(t.val())<1){
            t.val(1);
        }
    });

    $("#product_amount").blur(function () {
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

//获取URL中的参数（ptype）
function getUrlParam(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null)
        return unescape(r[2]);
    return null;                                            //返回参数值
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