import http from '../utils/api'
Page({
  data: {
    femaleList:[]
  },
  onLoad: function () {
    http.femaleNameApi({
      data:{
        page:1
      },
      success:res=>{
        console.log('接口请求成功',res)
        this.setData({
          femaleList:res.data
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
  }
})
