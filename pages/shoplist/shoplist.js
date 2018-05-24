// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:[],
    pagesize:20,
    pageindex:1,
    catId:1,
    hasMore:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this.setData({
        catId:options.cat
    })
    this.getShopList();
  },
  // 上拉加载更多多
  onReachBottom:function(){
    this.getShopList()
  },
  //下拉刷新
  onPullDownRefresh:function(){
      this.setData({
        shopList:[],
        pageindex:1,
        hasMore:true
      })
      this.getShopList()
      wx.stopPullDownRefresh()
  },
  //请求列表数据
  getShopList:function(options){
    if(!this.data.hasMore){
      return
    }
    wx.request({
      url: 'https://locally.uieee.com/categories/'+this.data.catId+'/shops',
      data:{
        _limit:this.data.pagesize,
        _page:this.data.pageindex
      },
      success:(res)=>{
      var list = this.data.shopList.concat(res.data)
      var count = parseInt(res.header['X-Total-Count']);//获取数据总条数
      var result=this.data.pageindex*this.data.pagesize<count  //已加载数据条数
      this.setData({
        shopList:list,
        pageindex:this.data.pageindex+1,
        hasMore:result
      })
      }
    })
  }
})