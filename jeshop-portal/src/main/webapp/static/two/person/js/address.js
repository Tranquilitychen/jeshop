/* 查询-修改-删除 innerHTML
address_1_addressee 收件人
address_1_phone 电话
address_1_address 地址
address_1_addrid 地址 addrid
address_1_edit  修改按钮
address_1_delete 删除按钮
*/

/* 新增
user-name 收件人
user-phone 电话
user-address 详细地址 textarea
save_address 保存按钮
*/

$(function () {
   //1. Cookie 获取 uid
    var uid = cookieGetUid();
    var ctx = getRootPath();

    //2. ajax 获取 所有地址信息
    ajaxGetAllAddress(ctx, uid);
});

$(document).ready(function () {
    var $ww = $(window).width();
    if ($ww > 640) {
        $("#doc-modal-1").removeClass("am-modal am-modal-no-btn")
    }
})

//1. Cookie 获取 uid
function cookieGetUid(){
    var uid = $.cookie("customer");
    //获取cookie后对input uid 赋值
    $("#user-uid").val(uid);
    return uid;
}

//2. ajax 获取 所有地址信息
function ajaxGetAllAddress(ctx,uid){

    $.ajax({
        async: false,
        url : ctx + "/address/getDatas?uid=" + uid,
        dataType: "json",
        success:function (result) {
            //2.1.为元素赋值
            //填充元素第一步 ： 获取ul 清空ul 的内容
            document.getElementById("showAddress").innerHTML = "";
            for (var i = 0; i < result.length; i ++ ){
                var address = result[i];
                console.log(address);
                //填充信息
                pagePadding(address, i+1);
            }

            //添加监听事件
            //不知道为什么放到一个函数中就变得可以用了，我也很无奈啊，不晓得原理
            //太菜了我
            for (var i= 0; i < result.length; i++){
                var index = i + 1;
                editAddress(ctx, index, uid);
                deleteAddress(ctx, index, uid);
            }
        },
        error:function () {
            alert("获取数据失败");
        }
    })
}

//修改地址按钮监听
function editAddress(ctx, index, uid){
    $("#address_" + index + "_edit").click(function () {
        var addrid = $("#address_"+ index + "_addrid").val();
        window.location.href = ctx + "/static/two/person/addressupdate.html?addrid=" + addrid;
    });
}

//删除地址按钮监听
function deleteAddress(ctx, index, uid){
    $("#address_" + index + "_delete").click(function () {
        var addrid = $("#address_"+ index + "_addrid").val();
        window.location.href = ctx + "/address/deleteAddress?addrid=" + addrid;
    });
}

//2.1 填充页面元素
function pagePadding(address, index) {
    //第二步： 声明变量，获取 ul的内容， 下一次 添加上这个内容，完成循环的
    var ul = document.getElementById("showAddress");
    var before = ul.innerHTML;

    ul.innerHTML = before + " <li class=\"user-addresslist\">\n" +
        "                        <input type=\"hidden\" id=\"address_" + index + "_addrid\" value=\"" + address.addrid + "\">\n" +
        "                        <p class=\"new-tit new-p-re\">\n" +
        "                            <span class=\"new-txt\" id=\"address_" + index + "_addressee\">"+ address.addressee + "</span>\n" +
        "                            <span class=\"new-txt-rd2\" id=\"address_"+ index + "_phone\">" + address.phone + "</span>\n" +
        "                        </p>\n" +
        "                        <div class=\"new-mu_l2a new-p-re\">\n" +
        "                            <p id=\"address_" + index + "_address\">" + address.address + "</p>\n" +
        "                        </div>\n" +
        "\n" +
        "                        <div class=\"new-addr-btn\">\n" +
        "                            <a href=\"#\" id=\"address_"+ index + "_edit\"><i class=\"am-icon-edit\"></i>编辑</a>\n" +
        "                            <span class=\"new-addr-bar\">|</span>\n" +
        "                            <a href=\"#\" id=\"address_" + index + "_delete\"><i class=\"am-icon-trash\"></i>删除</a>\n" +
        "                        </div>\n" +
        "                    </li>"
}

//3.新增地址 表单提交事件
function saveAddress(){
    var uid = cookieGetUid();
    var ctx = getRootPath();

    //获取表单的input
    var addressee = document.getElementById("user-name");
    var phone = document.getElementById("user-phone");
    var address = document.getElementById("user-address");

    if (addressee.value != "" && phone.value != "" && address.value != ""){
//ajax 提交表单
        $.ajax({
            async: true,
            url: ctx + "/address/insertAddressForPerson",
            type:"post",
            data: $("#submitAddress").serialize(),
            success : function (result) {
                console.log(result);
                alert("增加成功");

                //删除所有input 上的值(有其他办法解决)
                address.value = "";
                addressee.value = "";
                phone.value = "";

                //刷新
                window.location.reload();
            },
            error : function () {
                alert("增加失败");
            }
        });
    }else{
        alert("请输入新增地址信息");
    }
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