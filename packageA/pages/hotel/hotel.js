// packageA/pages/hotel/hotel.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotelList:[],  //酒店列表
    },
    //跳转到酒店详情页
    goDetail(event){
        const id = event.currentTarget.dataset.id;
        wx.navigateTo({
          url: '/packageA/pages/hotelDetail/hotelDetail?id=' + id,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      //获取酒店列表数据  
      wx.request({
        url: 'http://ncyunhua.com:9090/api/nycx/hotel',
        method:"GET",
        success:(res) => {
            let hotelList = res.data.data;
            this.setData({
                hotelList
            })
        }
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})