$(function () {

  var currentPage = 1;
  var pageSize = 4;
  var picArr = [];
  render();

  function render() {

    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var htmlstr = template("ProductTmp", info);
        $("tbody").html(htmlstr);

        // 因为分页也是动态生成的,,且依赖于总页数和当前页数,所以直接写在这里
        $("#paginator").bootstrapPaginator({

          // 版本号为3
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),

          onPageClicked: function (event, originalEvent, type, page) {

            currentPage = page;
            //这个page是点击的页数,是直接赋值不是冒号(冒号一般是配置参数)
            render();

          },
          itemTexts: function (type, page, current) {
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

  }

  //2.点击出现模态框
  $('#btn-add').click(function () {
    $('#ProductModal').modal("show");

    // 渲染数据到二级分类
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100,
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var htmlstr = template("Secondcategory", info);
        // var txt = info.brandName;
        $('.dropdown-menu').html(htmlstr);
      }
    })
  });

  //3.给每个li里的a注册点击事件
  $(".dropdown-menu").on("click", "a", function () {
    // 根据点击的id赋值给这个input
    var txt = $(this).text();
    $("#dropdownText").text(txt);

    //获取点击的id传给后台需要的参数
    var id = $(this).data("id");
    $('[name="brandId"]').val(id);
    // 手动把状态改成成功
    $("#ProductForm").data("bootstrapValidator").updateStatus("brandId", "VALID");
  });

  // 4. 进行图片文件上传配置
  $('#fileupload').fileupload({
    dataType: "json",
    // 文件上传完成的回调函数
    done: function (e, data) {
      console.log(data);

      var picObj = data.result; // 后台返回的结果  (图片名称/图片地址)
      var picUrl = picObj.picAddr; // 图片地址

      // 往数组的最前面追加
      picArr.unshift(picObj);

      // 结构上, 往最前面追加
      $('#imgbox').prepend('<img src="' + picUrl + '" style="height: 100px" alt="">');

      if (picArr.length > 3) {
        // 将最前面的保留, 将最后面移除,
        // 移除数组最后一项
        picArr.pop();
        // 移除图片结构中最后一个图片, 找最后一个图片类型的元素, 进行删除, 让他自杀
        $('#imgbox img:last-of-type').remove();
      }


      if (picArr.length === 3) {
        // 说明文件上传满 3 张了, picStatus 状态应该更新成 VALID
        $("#ProductForm").data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }
    }
  });
  //5.表单验证
  $("#ProductForm").bootstrapValidator({

    excluded: [],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品库存'
          },
          // 正则校验:
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '请输入非0开头的数字'
          }

        }
      },
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品尺码'
          },
          // 正则校验:
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '请输入Xx-Xx的范围'
          }
        }
      },
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品原价'
          },
        }
      },
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品现价'
          },
        }
      },
      picStatus: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传3张图片'
          },
        }
      },
    }
  });

  // 6. 注册表单校验成功事件, 阻止默认的提交, 通过 ajax 提交
  $("#ProductForm").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    // 有三张图片需要拼接字符串
    var params = $('#ProductForm').serialize();
    console.log(picArr);
   // [{…}, {…}, {…}]在表单验证成功后才触发.
  
  //brandId=&statu=1&proName=ww&proDesc=ww&num=22&size=29-88&oldPrice=w&price=w&brandLogo=
    params += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr1;
    params += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr1;
    params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr1;
    console.log(params);
    
    //参数
    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: params,
      dataType:"json",
      success:function( info ){

        console.log( info );
        if( info.success ){

          $('#ProductModal').modal("hide");
          currentPage = 1;

          render();

          $('#ProductForm').data("bootstrapValidator").resetForm(true);

          $('#dropdownText').text("请选择二级分类");
          $('#imgbox img').remove();

          // picArr = [];

        }
      }
    })
  });

})