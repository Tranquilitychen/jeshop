$(function () {
    var ctx = getRootPath();
    $("#email_form").validate({
        rules:{
            user_email:{
                required:true,
                checkEmail:true,
                checkEmailIsExit: true
            },
            checkImg:{
                required:true,
                checkImg:true
            }
        },
        messages:{
            user_email:{
                required:"邮箱地址不能为空",
                checkEmail: "请输入正确格式的邮箱地址",
                checkEmailIsExit: "该邮箱已存在"
            },
            checkImg:{
                required:"验证码不能为空",
                checkImg:"验证码输入错误"
            }
        }
    });


    jQuery.validator.addMethod("checkEmail", function(value, element, params) {
        var checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return this.optional(element) || (checkEmail.test(value));
    }, "请输入正确格式的邮箱地址");

    //自定义校验规则，注意：表单校验不通过的时候不会提交。
    $.validator.addMethod(
        //规则名称
        "checkImg",
        //校验的方法
        function (value,element,params) {
            var flag = false;
            $.ajax({
                async:false,						/*必须要是同步的的方式  */
                url: ctx + "/customer/checkTrue",
                type: "post",
                data:{"checkcode": value},
                dataType: "json",

                success:function (data) {
                    flag = data.isTrue;
                }
            });
            //返回 false 代表校验器不通过
            return flag;
        });

    $.validator.addMethod("checkEmailIsExit",function (value, element, params) {
        var flag = false;
        $.ajax({
            async:false,
            url: ctx + "/customer/checkEmail",
            type: "post",
            data:{"checkemail": value},
            dataType: "json",
            success:function (result) {
                flag = result.isTrue;
            }
        });
        return flag;
    });

    //提交修改邮箱的请求
    updateEmail();
});

function updateEmail(){


    $("#update_email").click(function () {

        var res = confirm("您确定要修改吗？");
        if (res == true) {

            var ctx = getRootPath();
            var uid = getCustomerCookie();
            var email = $("#user-email").val();

            $.ajax({
                url: ctx + "/customer/updateEmail.action",
                type: "post",
                data: {"email": email, "uid": uid},
                dataType: "json",
                success: function (result) {
                    console.log(result);

                    if (result == 1) {
                        alert("修改成功，请到修改邮箱激活");
                        $("#user-email").val("");
                        $("#checkImg").val("");
                    } else {
                        alert("修改失败");
                    }
                },
                error: function (result) {
                    console.log(result);
                    alert("获取数据出错！");
                }
            })
        }

    });

}

//5. 前端获取 的Cookie
function getCustomerCookie(){
    var uid = $.cookie("customer");
    return uid;
}
//验证码更换
function changeImgAndTime(){
    var ctx = getRootPath();
    // 后台需要将验证码的图片保存到一个文件夹才可以使用此功能
    var obj = document.getElementById("imgCheckCode");
    var time = new Date().getTime();
    obj.src = ctx + "/customer/createCheckImage?time=" + time;
}

// js获取项目根路径，如： http://localhost:8083/uimcardprj
function getRootPath(){
    // 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath=window.document.location.href;
    // 获取主机地址之后的目录，如： /uimcardprj/share/meun.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    // 获取主机地址，如： http://localhost:8083
    var localhostPaht=curWwwPath.substring(0,pos);
    // 获取带"/"的项目名，如：/uimcardprj
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
}