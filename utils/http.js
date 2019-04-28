module.exports = {
  http(url, method, params) {
    let token = 'token' // 获取token
    let sign = 'sign' // 获取签名
    let data = {
      token,
      sign
    }
    if(params.data){ // 在这里判断一下data是否存在
      for (let key in params.data) { // 在这里判断传过来的参数值为null，就删除这个属性
        if (params.data[key] == null || params.data[key] == 'null') {
          delete params.data[key]
        }
      }
      data = {...data,...params.data}
    }
    wx.request({
      url:'https://www.apiopen.top'+url, // 就是拼接上前缀,此接口域名是开放接口，可访问
      method:method=='post'?'post':'get',
      data,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        params.success&&params.success(res.data)
      },
      fail(err) {
        params.fail&&params.fail(err)
      }
    })
  }
}