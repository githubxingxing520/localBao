// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      sliderList:[], //轮播图数据
      navList:[],//导航数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getslider();
    this.getnav();
  },
   // 请求轮播图数据
  getslider:function(){
    wx.request({
      url: 'https://locally.uieee.com/slides',
      success: (res) => {
        this.setData({
          sliderList: res.data
        })
      }
    })
  },
  //请求导航数据
  getnav:function(){
    wx.request({
      url: 'https://locally.uieee.com/categories',
      success: (res) => {
        console.log(res)
        this.setData({
          navList:res.data
        })
      }
    })
  }
})