$(function () {
    var ctx = getRootPath();
    $("#btn_checkPay").click(function () {
        $.ajax({
           url: ctx +  "/order/checkPay",
            type: "GET",
            dataType: "json",
            success :function (result) {
                if (result.pay == "success")  {
                    console.log(result);
                    alert("支付 " + result.pay);
                    window.location.href = ctx + "/static/two/home/success.html";
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
