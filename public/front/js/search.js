
$(function() {

    render();
    function getHistory() {
      var jsonStr = localStorage.getItem( "search_list" ) || '[]';
      var arr = JSON.parse( jsonStr ); // 转成数组
      return arr;
    }
  
    function render() {
      // 模板引擎进行渲染
      var arr = getHistory();
      var htmlStr = template("search_tpl", { list: arr });
      $('.lt_history').html( htmlStr );
    }
  
    /*
    * 功能2: 清空所有历史
    * (1) 给清空记录添加点击事件 (事件委托)
    * (2) 清空所有的历史记录数据 localStorage.removeItem("search_list")
    * (3) 页面重新渲染
    * */
  
  
    $('.lt_history').on("click", ".btn_empty", function() {

      mui.confirm("您确定要清空历史记录嘛?", "少年温馨提示", ["取消", "确认"], function( e ) {
  
        // e.index 表示点击的按钮的下标 (索引)
        if ( e.index === 1 ) {
          // 移除本地历史
          localStorage.removeItem("search_list");
          render();
        }
  
      })
  
    });
    $('.lt_history').on("click", ".btn_delete", function() {
  
      var index = $(this).data("index");
      var arr = getHistory();
      // 根据下标, 删除数组中的对应项
      arr.splice( index, 1 );
      // 转成jsonStr, 存储到本地
      localStorage.setItem( "search_list", JSON.stringify( arr ) );
      render();
    });
  
  
  
    /*
    * 功能4: 添加单个历史记录功能
    * (1) 给搜索按钮添加点击事件
    * (2) 获取搜索框的内容
    * (3) 添加到数组的最前面  unshift
    * (4) 转成 jsonStr, 存储到本地存储中
    * (5) 重新渲染
    * */
    $('.search_btn').click(function() {
  
      // 获取搜索关键字
      var key = $('.search_input').val().trim();
      if ( key === "" ) {
        mui.toast("请输入搜索关键字");
        return;
      }
  
      // 获取数组
      var arr = getHistory();
      var index = arr.indexOf( key );
      if ( index != -1 ) {
        // 重复删除
        arr.splice( index, 1 );
      }
      if ( arr.length >= 10 ) {
        // 删除最后一个
        arr.pop();
      }
  
      // 添加到数组的最前面  unshift
      arr.unshift( key );
      // 转成 jsonStr, 存储到本地
      localStorage.setItem( "search_list", JSON.stringify( arr ) );
      // 重新渲染页面
      // 清空搜索框的内容
      render();
      $('.search_input').val("");
      location.href = "search_list.html?key=" + key;
    })
  
  
  })
  