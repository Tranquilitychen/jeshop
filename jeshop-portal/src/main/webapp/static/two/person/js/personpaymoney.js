$(function () {
    var ctx = getRootPath();
    var orderid = getUrlParam("orderid");

    $("#btn_checkPay").click(function () {
        $.ajax({
            url: ctx +  "/order/payOrder?orderid=" + orderid,
            type: "GET",
            dataType: "json",
            success :function (result) {
                if (result.pay == "success")  {
                    console.log(result);
                    alert("支付 " + result.pay);
                    window.location.href = ctx + "/static/main/index.html";
                }
            },
            error:function () {
                alert("获取支付信息失败！");
            }
        });
    });

    $("#btn_shouye").click(function () {
        window.location.href = ctx + "/static/main/index.html";
    });
});


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