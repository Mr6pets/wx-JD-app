var baseUrl ="https://enigmatic-island-47099.herokuapp.com";
const interfaces={
  
  // 返回的首页请求的json数据
  homepage: baseUrl +"/api/profiles/homepage",

  // 返回的商品的json数据
  productions: baseUrl + "/api/profiles/productions",
  // 返回的商品列表的json数据
  productionsList: baseUrl + '/api/profiles/productionsList',

  // 返回的商品详情的json数据
  productionDetail: baseUrl + '/api/profiles/productionDetail'

}
//导出对象
module.exports = interfaces;