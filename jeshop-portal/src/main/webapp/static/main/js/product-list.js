//专为模糊查询编写

$(function () {
    var ctx = getRootPath();
    //1.productForKey 模糊查询
    productForKey(ctx);

    //2.搜索框
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

    category_list();
    shopCarlist(ctx);
    CustomerisLoading();

    //收藏的点击事件
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
//1. Cookie 获取 uid
function cookieGetUid(){
    var uid = $.cookie("customer");
    //获取cookie后对input uid 赋值
    $("#user-uid").val(uid);
    return uid;
}

function shopCarlist(ctx){
    //shopcar_list_ul
    $("#shopcar_list").click(function () {
        window.location.href = ctx + "/static/two/home/shopcart.html";
    })
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

//Category
function category_list(){
    var category_riyongping = document.getElementById("category_riyongping");
    category_riyongping.onclick = function (ev) {
        window.location.href =  "product-grid.html?ptype=1";
    };

    var category_food = document.getElementById("category_food");
    category_food.onclick = function (ev) {
        window.location.href =  "product-grid.html?ptype=2";
    };

    var category_jewelry = document.getElementById("category_jewelry");
    category_jewelry.onclick = function (ev) {
        window.location.href =  "product-grid.html?ptype=3";
    };

    var category_bilibili = document.getElementById("category_bilibili");
    category_bilibili.onclick = function (ev) {
        window.location.href =  "product-grid.html?ptype=4";
    };
}

function productForKey(ctx){
    //获取关键字
    var arr = getRequest();
    var key = arr['key'];//参数名
   /* http://localhost:81/jeshop/product/selAllProductForKey?key=bilibili*/

    $.ajax({
        async: false,
        url : ctx + "/product/selAllProductForKey",
        type: "post",
        data:{key: encodeURI(key)},
        dataType: "json",
        success: function (result) {
            console.log(result);
            //展示数据到页面

            if(result.length > 0 && result != "undefined"){
                productDiv(result);

                //为每一个商品添加监听控件
                //获取到所有的 class = "grid-img"
                $(".grid-overlay").each(function (i, item) {
                    //1. 获取商品的pid product_Id_i

                    //2.添加监听对象
                    $(".product_heart_" + i).click(function () {
                        productAddFavorites(ctx,pid);
                    });

                    $(".product_link_" + i).click(function () {
                        var pid = $("#product_Id_" + i).val();
                        window.location.href = ctx + "/static/main/single-product.html?pid=" + pid;
                    });

                    $(".product_shopcart_" + i).click(function () {
                        var pid = $("#product_Id_" + i).val();
                        productAddShoppingCar(ctx, pid, 1);
                    });

                });
            }else{
                alert("没有该商品");
                window.location.href = ctx +  "/static/main/product-grid.html?ptype=0";
            }


        },
        error:function () {
            alert("获取数据失败！");
        }
    });
}

function productDiv(result){
    var length = result.length;
    document.getElementById("product_total").innerText = "商品的总数为：" + result.length;
    //获取插入的标签的名称
    var divInsertProductHtml = document.getElementById("insertProductHTML");

    /**
     可以改变的参数有：
     商品图片地址：imgSrc=
     商品图片名称：imgName=
     商品折扣：
     商品名称：productName=
     商品价格:price=
     商品描述：describe=
     商品id:pid=
     **/

    //循环
    for (var index = 0; index < result.length; index++){
        //动态添加标签
        if(index % 3 == 0){

            //添加标签 进行每3个商品换行
            var divrow = document.createElement("div");
            divrow.setAttribute("class","row m-30");
            divInsertProductHtml.appendChild(divrow);
        }

        var divcol = document.createElement("div");
        divcol.setAttribute("class", "col-md-4 col-sm-6 col-xs-12");
        divrow.append(divcol);

        var divsingle = document.createElement("div");
        divsingle.setAttribute("class", "single-grid");
        divcol.appendChild(divsingle);

        var divgrid = document.createElement("div");
        divgrid.setAttribute("class", "grid-img");
        divsingle.appendChild(divgrid);

        var img = document.createElement("img");
        img.setAttribute("class","img-resposive");
        //商品图片地址
        img.setAttribute("src", result[index].pimg);
        //商品图片名称
        img.setAttribute("alt", result[index].pname);
        divgrid.appendChild(img);

        //商品折扣
        /*var strong = document.createElement("strong");
        //此处可以修改
        strong.innerText = "20%";
        divgrid.appendChild(strong);*/

        var div5 = document.createElement("div");
        div5.setAttribute("class", "grid-overlay");
        divgrid.appendChild(div5);

        //此处添加一个div,用来保存商品的id     <input type="hidden" name="field＿name" value="value">
        var inputId = document.createElement("input");
        inputId.setAttribute("id", "product_Id_" + index);
        inputId.setAttribute("type", "hidden");
        inputId.setAttribute("name", "pId");
        inputId.setAttribute("value", result[index].pid);
        div5.appendChild(inputId);

        //点击事件，需要解决冒泡事件
        var ul = document.createElement("ul");
        div5.appendChild(ul);

        var li2 =document.createElement("li");
        li2.setAttribute("class", "product_link_"  + index);
        ul.appendChild(li2);

        var i2 = document.createElement("i");
        i2.setAttribute("class","lnr lnr-link");
        li2.appendChild(i2);

        var li1 =document.createElement("li");
        li1.setAttribute("class","product_heart_" + index);
        ul.appendChild(li1);

        var i1 = document.createElement("i");
        i1.setAttribute("class","lnr lnr-heart");
        li1.appendChild(i1);

        var li3 =document.createElement("li");
        li3.setAttribute("class", "product_shopcart_"  + index);
        ul.appendChild(li3);

        var i3 = document.createElement("i");
        i3.setAttribute("class","lnr lnr-cart");
        li3.appendChild(i3);

        //商品名称
        var h3 = document.createElement("h3");
        h3.innerText = result[index].pname;
        divsingle.appendChild(h3);

        //商品价格
        var span = document.createElement("span");
        span.innerHTML = result[index].price;
        h3.appendChild(span);

        //商品描述
        var p = document.createElement("p");
        p.innerHTML = result[index].describe;
        divsingle.appendChild(p);

    }


    /*<div class="col-md-4 col-sm-6 col-xs-12">
            <div class="single-grid">
            <div class="grid-img">
            <img class="img-resposive" src="images/women2.jpg" alt="women" />
            <strong>20%</strong>
            <div class="grid-overlay">
            <ul>
            &lt;!&ndash;喜欢-收藏&ndash;&gt;
    <li><i class="lnr lnr-heart"></i></li>
        &lt;!&ndash;// camera&ndash;&gt;
    <li><i class="lnr lnr-camera"></i></li>
        &lt;!&ndash;//加入购物车&ndash;&gt;
    <li><i class="lnr lnr-cart"></i></li>
        </ul>
        </div>
        </div>
        <h3>Bright Scalet-Shirt  <span>$65</span></h3>
        <p>Lorem ipsum dolor sit amet</p>
        </div>
        </div>*/

}

//获取URL中的参数（key）
function getUrlParam(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null)
        return unescape(r[2]);
    return null;                                            //返回参数值
}

//获取URL中的参数，并解决中文乱码问题
function getRequest() {
    var url = window.location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            //就是这句的问题
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
            //之前用了unescape()
            //才会出现乱码
        }
    }
    return theRequest;
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