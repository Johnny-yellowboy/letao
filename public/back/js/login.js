;$(function(){

  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
  },
    fields:{
      username:{

        validators:{
          //非空
          notEmpty:{
            //校验提示
            message:"用户名不能为空!"
          },
          // 长度校验
          stringLength:{
            min:2,
            max:6,
            message:"用户名必须是2-6位"
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password:{

        validators:{
          notEmpty:{
            message:"密码不能为空!"
          },
          stringLength:{
            min:6,
            max:30,
            message:"密码长度必须为6-30位"
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    }

  });
  /*
  * 2. 表单校验需要在表单提交时, 进行校验, 需要submit按钮
  *    可以注册一个表单校验成功事件, 表单校验成功之后, 默认会提交
  *    可以在成功事件中, 阻止默认的表单提交, 通过 ajax 提交, 就不会跳转了
  *
  * 思路: 1. 注册表单校验成功事件
  *      2. 在事件中, 阻止默认的表单提交, 通过 ajax 提交即可
  * */
  $('#form').on("success.form.bv",function( e ){

    e.preventDefault();

    $.ajax({
      url:"/employee/employeeLogin",
      type:"post",
      data:$('#form').serialize(),
      datatype:"json",
      success:function(info){
        // // console.log(info);
        if(info.success){
          location.href = "index.html";
        }
        if(info.error === 1000){
          // alert("用户名不存在");
          // 调用插件提供的方法, 将用户名input状态 更新成校验失败状态
          // updateStatus
          // 参数1: 校验字段  username/password
          // 参数2: 校验状态  NOT_VALIDATED(未校验), VALIDATING(校验中), INVALID(失败) or VALID(成功)
          // 参数3: 校验规则, 用来配置错误时的提示信息
          $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }
        if(info.error === 1001){
          $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
      }
    })
  })
  /*
  * 3. 重置功能, reset按钮, 本身就可以重置内容, 这边只需要再重置状态即可
  * */
 $('[type="reset"]').click(function(){
    // $('#form').data("bootstrapValidator").resetForm()
    // 传 boolean 值, 如果是 true 内容和状态都重置, 不传参, 只重置状态
   $('#form').data("bootstrapValidator").resetForm();
 })


});