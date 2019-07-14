$(function () {
    //1.进页面先获取Cookie
    var uid = cookieGetUid();
    var ctx = getRootPath();

    //2.根据uid 获取Customerinfo数据
    customerInfoData(ctx,uid);

    //3. 根据uid 获取 Customer 数据
    customerData(ctx, uid);

});


function fileHead(){
    var uid = cookieGetUid();
    var ctx = getRootPath();

    console.log($("#user-headSculpture")[0].files[0]);

    var shopName = $("#user-nickname").val();
    var sex =  $("input[name='radio']:checked").val();
    var index = $("#newCustomer").val();
    var birth = $("#user-birth").val();

    if (shopName == undefined || sex == undefined || index == undefined || birth == undefined||
        shopName == "" || sex == "" || index == "" || birth == ""){
        alert("请填写个人信息");
    }else{
        var data = new FormData();
        data.append("file",$("#user-headSculpture")[0].files[0]);
        data.append("uid",uid);
        data.append("index", index);

        data.append("birth", birth);
        data.append("sex", sex);
        data.append("shopName", encodeURI(shopName));

        //上传
        $.ajax({
            url: ctx + "/customerInfo/updateOrInsert",
            type : "post",
            data: data,
            dataType : "json",
            processData: false,
            contentType: false,
            success : function (result) {
                console.log(result);

                $("#user-nickname").val("");

                //以下都没用
                /*$("#newCustomer").val("");
                $("#user-birth").val("");
                $("input[name='radio']:checked").val("");
                $("#user-headSculpture")[0].val("");*/

                window.location.reload();
            },
            error:function (result) {
                alert("失败");
            }
        })
    }

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


//修改日历框的显示格式
function formatter(date){
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var second = date.getMilliseconds();
    var minuts = date.getMinutes();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    second = second < 10 ? '0' + second : second;
    minuts = minuts < 10 ? '0' + minuts : minuts;
    return year + "-" + month + "-" + day + " " + hour + ":" + second + ":" + minuts;
}

function parser(s){
    s = s.replace(/\s+/,' ');//解决格式字符串中多个空格拼接在Firefox中无法兼容的问题
    var t = Date.parse(s);
    if (!isNaN(t)){
        return new Date(t);
    } else {
        return new Date(s + ":00:00");
    }
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

                $("#headSculpture").attr("src", result.headSculpture);
                $("#user-nickname").val(result.shopName);
                $("#newCustomer").val(0);
            //2.2填充数据
            //头像
        },
        error:function (result) {
            $("#newCustomer").val(1);
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