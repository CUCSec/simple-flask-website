// TODO some function
let page = 1


function getData(data) {
  return data.data.map(function (item) {
      return '\n<li>\n' + item +'</li>\n';
  }).join('');
}


new Scrollload({
  // container 和 content 两个配置的默认取的scrollload-container和scrollload-content类的dom。只要你按照以上的dom结构写，这两个配置是可以省略的
  container: document.querySelector('.scrollload-container'),
  content: document.querySelector('.scrollload-content'),
  loadMore: function (sl) {

    if (page === 5) {
      // 没有数据的时候需要调用noMoreData
      sl.noMoreData()
      return
    }

    // 我这里用jquery的不是因为需要jquery，只是jquery的语法看起来比较简单。大家都认识。
    // 如果你不是用jquery，可以看看原生的insertAdjacentHTML方法来替代append
    $.ajax({
      type: 'GET',
      url: `/data?page=${page++}`,
      dataType: 'json',
      success: function (data) {
        // contentDom其实就是你的scrollload-content类的dom
        $(sl.contentDom).append(getData(data))

        // 处理完业务逻辑后必须要调用unlock
        sl.unLock()
      },
      error: function (xhr, type) {
        // 加载出错，需要执行该方法。这样底部DOM会出现出现异常的样式。
        sl.throwException()
      }
    })
  }
})