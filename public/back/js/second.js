$(function () {

  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,//页数
        pageSize: pageSize//每页条数
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        // 请求成功后渲染到页面,需要模板引擎
        var htmlstr = template("SecondTmp", info);
        $('tbody').html(htmlstr);
        // 分页插件开始
        $('#paginator').bootstrapPaginator({

          bootstrapMajorVersion: 3,//版本
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          },
          //type为该控件的操作按钮的类型，
          // 如上图所示的五种类型：first、prev、page、next、last。
          // page为该按钮所属第几页。
          //current 指示整个控件的当前页是第几页。
<<<<<<< HEAD
          itemTexts: function (type,  page,  current) {
=======
          itemTexts: function (type, page, current) {
>>>>>>> first
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "page":
                return page;
              case "next":
                return "下一页";
              case "last":
                return "尾页";
            }
          }

        })
      }
    })
<<<<<<< HEAD
  }
  
=======
  };
  //给添加分类注册点击事件
  // 1点击出现模态框
  $('#btn-add').click(function () {

    $('#SecondModal').modal("show");

    // 渲染一级分类
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: 100,
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        //查询成功准备模板引擎
        var htmlstr = template("firstmeau", info);
        $('.dropdown-menu').html(htmlstr);
      }
    })

  });
  // 2给下拉的每个a注册点击事件,赋值给input,需要事件委托
  $('.dropdown-menu').on("click", "a", function () {
    // 获取id
    // 获取值
    var text = $(this).text();
    console.log(text);
    $('#dropdownText').text(text);
    var id = $(this).data("id");
    console.log(id);
    $('[name="categoryId"]').val(id);

    $('#AddForm').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })
  // 3文件上传初始化
  $("#fileupload").fileupload({

    //发送图片地址是参与后台的直接使用插件
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data);
      // picAddr里存放了地址付给img的src
      var result = data.result;
      var picAddr = result.picAddr;
      // 设置给 img 的 src
      $("#imgbox img").attr("src", picAddr);
      // 将src路径, 实时设置给 input
      $('[name="brandLogo"]').val(picAddr);
      // 将 name="brandLogo" 的校验状态, 改成成功
      $('#AddForm').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });
  // 5配置校验表单
  $("#AddForm").bootstrapValidator({
    //设置为空数组,让全部校验:这里别写错位置;
    excluded: [],//1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',// 校验成功
      invalid: 'glyphicon glyphicon-remove',// 校验失败
      validating: 'glyphicon glyphicon-refresh'// 校验中
    },

    fields: {
      // !!!!这里配置校验字段的,需要写在外面,否则隐藏域的提示信息还是不会显示
      //校验用户名，对应name表单的name属性
      //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
      // excluded: [],//设置为空数组,让全部校验

      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      //二级分类
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入二级分类'
          }

        }

      },
        brandLogo: {
          validators: {
            notEmpty: {
              message: "请选择图片"
            }
          }

        }
    },
  });
  //6提交表单
  $("#AddForm").on("success.form.bv",function( e ){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$("#AddForm").serialize(),
      dataType:"json",
      success:function( info ){
        console.log(info);
        $("#SecondModal").modal("hide");
        if(info.success){
        // 当然是渲染第一页啊
        currentPage = 1;
        
        render();
        // 重置表单
        $("#AddForm").data("bootstrapValidator").resetForm(true); 
        $("#dropdownText").text("请选择一级分类");
        $("#imgbox img").attr("src","./images/none.png");
        }
      }
    })
  })

>>>>>>> first
})