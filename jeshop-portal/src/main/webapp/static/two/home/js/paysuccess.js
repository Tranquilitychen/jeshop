
$(function () {
    var ctx = getRootPath();
    $.ajax({
        url: ctx + "/order/success",
        type:"get",
        dataType: "json",
        success: function (result) {
            console.log(result);

            $("#success_price").html(result.money);
            $("#success_addressee").html("收货人：" + result.address.addressee);
            $("#success_phone").html("联系电话：" + result.address.phone);
            $("#success_address").html("收货地址：" + result.address.address);

        },
        error:function () {
            alert("获取数据失败!");
        }
    })



});
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
