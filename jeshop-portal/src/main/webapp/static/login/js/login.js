$(document).ready(function(){
	var ctx = getRootPath();
	//自定义校验规则
    $("#login-form").validate({
        rules:{
            username:{
                required:true,
                checkname:true
            },
            password:{
                required:true,
                rangelength:[3,13]
            },
            checkImg:{
                required:true,
                checkImg:true
            }
        },
        messages:{
            username:{
                required:"用户名不能为空",
                /*checkname:"用户名已存在",*/
            },
            password:{
                required:"密码不能为空",
                rangelength: "输入长度必须介于4 到 13之间"
            },
            checkImg:{
                required:"验证码不能为空",
                checkImg:"验证码输入错误"
            }
        }
    });


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

    /*$.validator.addMethod(
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
        });*/

//检验完成后才会触发表单 --- 登陆按钮单击时进行比表单的提交
  $("#login-btn").click(function () {
      // 首先获取项目的根路径
      var ctx = getRootPath();
      alert("login-btn:" + ctx);
      // 直接使用ajax 进行表单的提交

      $.ajax({
          url: ctx + "/customer/login.action",
         type:"post",
         dataType: "json",
         data : $("#login-form").serialize(),
          success: function(data){
              // 满足条件跳转页面
              console.log(data);
              alert(data);
              if (data == 1){
                  var uid = getCustomerCookie();
                  if (uid != "" || uid != 0){
                      window.location.href = ctx + "/static/main/index.html";
                  }else{
                      alert("出现错误！");
                  }
              }else {
                  //没有登陆成功
                  alert("登陆失败，输入信息错误");
              }
          },
          error:function (data) {
              console.log(data);
              window.location.href = ctx + "/static/login/error.html";
          }
      });
      return false;
  });


});

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

