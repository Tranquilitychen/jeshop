$(function () {
   var ctx = getRootPath();
   var uid = cookieGetUid();

    customerData(ctx, uid);
    customerInfoData(ctx, uid);
    exitCustomer(ctx);

});

//退出登陆用户
function exitCustomer(ctx){
    $("#exitCustomer").click(function () {
        if (confirm("确认退出当前用户？") == true){
            $.ajax({
                url : ctx + "/customer/exitCustomer",
                dataType: "json",
                success:function (result) {
                    if (result == 1){
                        alert("退出成功！");
                        window.location.href = ctx + "/static/main/index.html";
                    }else{
                        alert("退出失败！");
                    }
                },
                error : function (result) {
                    console.log(result);
                    alert("出现错误");
                }
            })
        }
    });
}

//4.将毫秒数转化为秒
function changeTime(time){
    if(time){
        var oDate = new Date(time*1),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth()+1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds(),
            oTime = oYear +'-'+ getBz(oMonth) +'-'+ getBz(oDay) +' '+ getBz(oHour) +':'+ getBz(oMin) +':'+getBz(oSen);//拼接时间
        return oTime;
    }else{
        return "";
    }

}
//补0
function getBz(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}

//3. 根据uid 获取 Customer 数据
function customerData(ctx, uid){
    $.ajax({
        url:ctx + "/customerInfo/getCustomerData",
        type:"post",
        data:{"uid": uid},
        dataType:"json",
        success : function (result) {
            console.log(result);

            var time = result.registerTime;
            var birth = changeTime(time);

            $("#username").html(result.username);
            $("#registerTime").html(birth);
            $("#email").html(result.email);
            $("#showEmail").html(result.email);

            $("#editEmail").click(function () {
                var state = result.state;
                if (state == 1){
                    window.location.href = ctx + "/person/updateEmailPage";
                }else{
                    alert("您还未绑定邮箱，请先绑定邮箱");
                }
                return false;
            });
        },
        error:function (result) {
            console.log(result);
            alert("获取数据失败！");
        }
    });
}

//2.根据uid 获取用户数据
function customerInfoData(ctx, uid){
    //2.1 ajax 获取数据
    $.ajax({
        url : ctx + "/customerInfo/getDataInfo",
        type: "post",
        data: {"uid": uid},
        dataType: "json",
        success:function (result) {
            console.log(result);

            //填充头像
            $("#headSculpture").attr("src", result.headSculpture);

        },
        error:function (result) {
            console.log(result);
            alert("数据获取失败");
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