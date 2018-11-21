$(function(){

  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    dateType:"json",
    success:function( info ){
      console.log( info );
      var htmlstr = template('LeftTmp' , info );
      $('.main_left ul').html(htmlstr);
      // 根据返回回来的第一个 一级分类的 id 进行渲染
      renderByid( info.rows[0].id );
    }
  });
  // 根据一级的类id查询对应二级分类,注意动态生成元素需要通过事件委托实现
  $('.main_left').on("click","a",function(){
    $(this).addClass("current").parent().siblings().find("a").removeClass("current");
    var $id = $(this).data("id");
    console.log($id);
    
    renderByid($id);
  })
  
  function renderByid($id){

    $.ajax({

      type:"get",
      url:"/category/querySecondCategory",
      data:{
        id:$id
      },
      dateType:"json",
      success:function( info ){
        console.log( info );
        var htmlstr = template("RightTmp", info);
        $('.main_right ul').html(htmlstr);
        
      }
  })


}

})