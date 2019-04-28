# 小程序封装wx.request请求并创建接口管理文件

> 开发小程序，封装有一个简单易用`wx.request`请求还是很必要的，可以省去大量的维护成本！闲话不多说，直接撸代码。

流程
- 创建`http.js`文件，封装`wx.request`
- 创建`api.js`文件，统一管理所有接口
- 在`index.js`中调用接口

## 创建`http.js`文件，封装`wx.request`
在`utils`中创建`http.js`文件，封装`http`，代码如下：
```javascript
module.exports = {
  http(url, method, params) {
    let token = 'token' // 获取token，自行获取token和签名，token和签名表示每个接口都要发送的数据
    let sign = 'sign' // 获取签名
    let data = {
       token,
       sign
    }
    if(params.data){ // 在这里判断一下data是否存在，params表示前端需要传递的数据，params是一个对象，有三组键值对，data：表示请求要发送的数据，success：成功的回调，fail：失败的回调，这三个字段可缺可无，其余字段会忽略
      for (let key in params.data) { // 在这里判断传过来的参数值为null，就删除这个属性
        if (params.data[key] == null || params.data[key] == 'null') {
          delete params.data[key]
        }
      }
      data = {...data,...params.data}
    }
    wx.request({
      url:'https://www.apiopen.top'+url, // 就是拼接上前缀,此接口域名是开放接口，可访问
      method:method=='post'?'post':'get', // 判断请求类型，除了值等于'post'外，其余值均视作get
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
```

代码很简单，需要说的是在逻辑代码中只需要传递`params`，而`url`和`method`在接口文件中传递，方便统一管理

## 创建`api.js`文件，统一管理所有接口
在`utils`下创建`api.js`文件，作为接口管理文件，代码如下：
```javascript
// 在这里面定义所有接口，一个文件管理所有接口，易于维护
import {http} from './http'; // 引入刚刚封装好的http模块，import属于ES6的语法，微信开发者工具必须打开ES6转ES5选项

function femaleNameApi(params){ // 请求随机古诗词接口
  http('/femaleNameApi','get',params)  // 接口请求的路由地址以及请求方法在此处传递
}

// 每一个接口定义一个函数，然后暴露出去，供逻辑代码调用

function novelApi(params){ // 小说推荐接口
  http('/novelApi','get',params) 
}

export default { // 暴露接口
  femaleNameApi,
  novelApi
}
```
用`api.js`文件统一管理的好处就是，当接口更新后修改很方便，不需要看逻辑代码，也不用关心有几处调用了此接口，直接在`app.js`中修改响应就行了，接口统一管理是非常有必要的

## 在`index.js`中调用接口
调用方式，代码如下
```javascript
import http from '../utils/api' // 引入api接口管理文件
Page({
  data: {
    femaleList:[]
  },
  onLoad: function () {
    http.femaleNameApi({ // 调用接口，传入参数
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

```
参数传入说明:

- 为了和微信的API接口调用方式看起来一致，故采用了微信API的这种调用方式
- 传递一个对象，对象有三组键值对，data：表示要发送的数据，success：成功回调，fail：失败回调
- 三个键值对均可传可不传，其余值会忽略，基本和微信API调用方式一致，减少了强迫症的烦恼

第一次在掘金上发文章，还请诸位前辈多多指教！

小程序代码片段放在[github](https://github.com/seolhw/packagingRequest)上了，欢迎`issue`
