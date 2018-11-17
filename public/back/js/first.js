$(function(){
  
  var currentPage = 1;//当前页
  var pageSize = 5;//每页多少条
  render();

  function render(){

    $.ajax({
      type:"GET",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlstr = template("FirstTmp",info);

        $('tbody').html(htmlstr);

        // 分页初始化
         $('#paginator').bootstrapPaginator({ 
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total / info.size),//总页数
          //当前页 
          currentPage:info.page,
          numberOfPages:5,
          // 点击事件
          onPageClicked:function(event, originalEvent, type,page){
            currentPage = page;
            render();
          },
          
          itemTexts:function( type, page, current){
            switch(type){
              // first、prev、page、next、last
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "page":
                return page;
              case "next":
                return "下一页";
              case "last":
                return "末页";
            }
          }
        })
      }
    })
  };

  // 添加分类
  $('#addBtn').click(function(){
    //点击显示模态框
    $('#addModal').modal("show");
  });
  //表单验证
  $('#form').bootstrapValidator({
    
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入一级分类'
          },
        }
      }
    }
  })
// 4. 注册表单校验成功事件, 阻止默认的提交, 通过ajax提交
  $('#form').on("success.form.bv",function(e){
    e.preventDefault();

    //点击的时候发送ajax请求添加列表
    $.ajax({
      type:"POST",
      url:"/category/addTopCategory",
      //没有像服务器提交数据当然是空的了,此处用form表单提交
      data:$("#form").serialize(),
      dataType:"json",
      success:function( info ){

        console.log(info);
        // 如果上传成功:
        if(info.success){

          // 1先关闭模态框
          $('#addModal').modal("hide");
          // 2成功后把值渲染到页面上
          //当前页为第一页,并且重新渲染页面
          currentPage = 1;
          render();
          // 再次添加input值还在所以要重置表单
          // $("#form").data("bootstrapValidator").resetForm(true);

          // $("#form")[0].reset();只能重置表单内容不能重置状态
        }

      }

    })
  })

})