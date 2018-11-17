$(function(){
  
var currentPage = 1;
var pageSize = 5;

render();
function render(){
  $.ajax({

    type: "get",
    url: "/user/queryUser",
    data: {
      page: currentPage,
      pageSize: pageSize,
    },
    datype: "json",
    success: function (info) {

      console.log(info);
      var htmlstr = template("tmp",info);
      $('tbody').html(htmlstr);

      // 进行分页初始化
      $('#paginator').bootstrapPaginator({

        bootstrapMajorVersion:3,
        // 当前页
        currentPage:info.page,//当前页
        numberOfPages: 5, //设置控件显示的页码数
        totalPages:Math.ceil(info.total / info.size),//总页数
          alignment:"right",
        // 点击事件
        onPageClicked:function(event, originalEvent, type,page){

          currentPage = page;
          render();
        },
        // type为该控件的操作按钮的类型，如上图所示的五种类型：first、prev、page、next、last。
        // page为该按钮所属第几页。
        // current 指示整个控件的当前页是第几页。
        itemTexts:function(type,page, current){//文字翻译
          switch (type) {
              case "first":
                  return "首页";
              case "prev":
                  return "上一页";
              case "next":
                  return "下一页";
              case "last":
                  return "尾页";
              case "page":
                  return page;
          }
      },

      });
    }

  });

}
//注册每个点击按钮事件
  // 动态生成的事件委托
$('tbody').on("click",".btn",function(){

// 点击时出现模态框
$('#userStateModal').modal("show");
// 隐式全局变量,外部也可访问
 $id = $(this).parent().data('id'); 
 isDelete = $(this).hasClass("btn-danger") ? 0 : 1;

});
  // 通过id向后台发送修改申请(应该是点击了模态框的确定按钮时才发送ajax)
 $('#confirm').click(function(){

   $.ajax({
     type:"post",
     url:"/user/updateUser",
     data:{
       id:$id,
       //当为0则是禁用需要传0
       isDelete:isDelete,
     },
     datatype:"json",
     success:function( info ){
       console.log(info);
       //1成功后关闭模态框
       $('#userStateModal').modal("hide");
       // 2重新渲染页面
       render();
     }

 })


})



})