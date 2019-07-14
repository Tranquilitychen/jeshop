$(document).ready(function(){
    var ctx = getRootPath();
    //自定义校验规则
    $("#register_form").validate({
        rules:{
            username:{
                required:true,
                checkname:true
            },
            password:{
                required:true,
                passwordRule: true,
                rangelength:[3,13]
            },
            subpassword:{
                required: true,
                checkPassword: true
            },
            email:{
                required:true,
                email:true,
                checkEmail: true
            },
            checkImg:{
                required:true,
                checkImg:true
            }
        },
        messages:{
            username:{
                required:"请输入用户名",
                checkname:"该用户名已存在"
            },
            password:{
                required:"请输入密码",
                rangelength: "输入长度必须介于4 到 13之间"
            },
            subpassword:{
                required: "请输入确认密码",
                checkPassword: "两次输入的密码不相同"
            },
            email:{
                required:"请输入邮箱",
                email:"请输入正确格式的邮箱",
                checkEmail: "该邮箱已被注册"
            },
            checkImg:{
                required:"请输入验证码",
                checkImg:"验证码输入错误"
            }
        }
    });

    $.validator.addMethod("checkPassword", function (value, element, params) {
        var flag = false;
        var password = $("#password").val();
        if (password == value){
            flag = true;
        }
        return flag;
    });

    $.validator.addMethod("passwordRule",function (value, element) {
        var reg =  /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,20}$/;
        return reg.test(value);
    }, "密码中必须包含含数字、字母、特殊符号");


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

    $.validator.addMethod(
        //规则名称
        "checkname",
        function (value, element, params) {
            var flag = false;
            $.ajax({
                async:false,
                url : ctx + "/customer/checkName",
                type: "post",
                data:{"checkname": value},
                dataType : "json",
                success:function (data) {
                    flag = data.isTrue;
                }
            });
            return flag;
        });

        $.validator.addMethod("checkEmail",function (value, element, params) {
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


    submitForm(ctx);

});

//3.表单提交
function submitForm(ctx){
    //检验完成后才会触发表单 --- 登陆按钮单击时进行比表单的提交
    $("#register-btn").click(function () {

  /*      var t = $('form').serializeArray();
        $.each(t,function(i,item){
            if(item['value'] == '') {
                console.log('信息不可为空');
                alert("输入信息不能为空")
                flag = 1;
                return false
            } else {
                alert("有信息了")
            }
        });*/




      // 首先获取项目的根路径
        var ctx = getRootPath();
        alert("register-btn:" + ctx);
        // 直接使用ajax 进行表单的提交
        $.ajax({
            url: ctx + "/customer/register.action",
            type:"post",
            dataType: "json",
            data : $("#register_form").serialize(),
            success: function(data){
                // 满足条件跳转页面
                console.log(data);
                alert("请前往您的邮箱进行认证")
                window.location.href= ctx + "/static/login/login.html";
            },
            error:function (data) {
                window.location.href = ctx + "/static/login/error.html";
            }
        });
        return false;
    });
}

//4.验证码更换
function changeImgAndTime(){
    var ctx = getRootPath();
    // 后台需要将验证码的图片保存到一个文件夹才可以使用此功能
    var obj = document.getElementById("imgCheckCode");
    var time = new Date().getTime();
    obj.src = ctx + "/customer/createCheckImage?time=" + time;
}

//js获取项目根路径，如： http://localhost:8083/uimcardprj
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