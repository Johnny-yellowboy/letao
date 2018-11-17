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
          itemTexts: function (type,  page,  current) {
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
  
})