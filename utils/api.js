// 在这里面定义所有接口，一个文件管理所有接口，易于维护
import {http} from './http';

function femaleNameApi(params){ // 请求随机古诗词接口
  http('/femaleNameApi','get',params) 
}

function novelApi(params){ // 小说推荐接口
  http('/novelApi','get',params) 
}

export default { 
  femaleNameApi,
  novelApi
}