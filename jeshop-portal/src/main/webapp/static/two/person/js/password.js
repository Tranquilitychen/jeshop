$(function () {

    //1.自定义校验规则
    $("#updata_form").validate({
        rules:{
            password:{
                required:true,
                checkname:true
            },
            newPassword:{
                required:true,
                passwordRule : true,
                rangelength:[3,13]
            },
            check_password:{
                required:true,
                checkPassword: true
            }
        },
        messages:{
            password:{
                required:"请输入旧密码",
                /*checkname:"用户名已存在",*/
            },
            newPassword:{
                required:"请输入新密码",
                rangelength: "输入长度必须介于4 到 13之间"
            },
            check_password:{
                required:"输入确认密码，保证两次相同"
            }
        }
    });

    //自定义校验方法
    $.validator.addMethod("checkPassword", function (value, element, params) {
        var flag = false;
        var password = $("#newPassword").val();
        if (password == value){
            flag = true;
        }
        return flag;
    }, "两次输入的密码不相同，请重新输入");

    $.validator.addMethod("passwordRule",function (value, element) {
        var reg =  /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,20}$/;
        return reg.test(value);
    }, "密码中必须包含含数字、字母、特殊符号");


});

//2.ajax发送表单
function  subMitUpdateForm(){
    var uid = cookieGetUid();
    var ctx = getRootPath();

    var password = $("#password").val();
    var newpassword = $("#newPassword").val();
    var check_password = $("#check_password").val();

    if (password != undefined && newpassword != undefined && check_password != undefined &&
        password != "" && newpassword != "" && check_password != "" ){
        $.ajax({
            url: ctx + "/customer/updatePassword.action?uid=" + uid,
            type: "post",
            data: {"password": password, "newPassword": newpassword, "uid": uid},
            dataType: "json",
            success:function (result) {
                console.log(result);
                if (result == 1){
                    alert("修改密码成功！");
                    window.location.reload();
                }else{
                    alert("修改密码失败");
                }

            },
            error:function (result) {
                console.log(result);
                alert("获取信息失败")
            }
        })
    }else {
        alert("请输入信息");
    }
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