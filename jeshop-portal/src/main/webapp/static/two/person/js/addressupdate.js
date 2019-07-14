$(function () {
    var addrid = getUrlParam("addrid");
    var uid = cookieGetUid();
    var ctx = getRootPath();
    if (addrid == ""){
        //跳转到错误信息页面
    }else{
        $("#update-addrid").val(addrid);
    }

});
//1. Cookie 获取 uid
function cookieGetUid(){
    var uid = $.cookie("customer");
    //获取cookie后对input uid 赋值
    $("#user-uid").val(uid);
    return uid;
}

//2获取URL中的参数
function getUrlParam(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null)
        return unescape(r[2]);
    return null;                                            //返回参数值
}

function updateAddress(){
    var ctx = getRootPath();
    var addressee = $("#update-addressee").val();
    var phone = $("#update-phone").val();
    var address = $("#update-address").val();

    if (addressee.value != "" && phone.value != "" && address.value != ""){
        //ajax 提交表单
        $.ajax({
            async: true,
            url: ctx + "/address/updataAddress",
            type:"post",
            data: $("#update_submit_Address").serialize(),
            success : function (result) {
                console.log(result);
                alert("修改成功");

                //删除所有input 上的值(有其他办法解决)
                address.value = "";
                addressee.value = "";
                phone.value = "";

                window.location.href = ctx + "/static/two/person/address.html";
            },
            error : function (error) {
                console.log(error);
                alert("修改失败");
            }
        });
    }else{
        alert("请输入修改地址信息");
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