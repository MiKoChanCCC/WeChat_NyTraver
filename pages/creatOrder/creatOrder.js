// pages/creatOrder/creatOrder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        createOrderInfo:{},  //上个页面传递过来的数据
    },
    //获取系统的一些参数信息
    // getSysInfo(){
    //     const info = wx.getSystemInfoSync();
    //     const {bottom,height,left,right,top,width} = info.safeArea;
    // },
    //提交订单按钮
    next(){
        const _this = this;
        //跳转到用户信息完善页
        wx.navigateTo({
          url: '/pages/perfectUserInfo/perfectUserInfo',
          success:function(res){
              res.eventChannel.emit('getOrderInfo',_this.data.createOrderInfo);
          }
        })
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(option) {
        const _this = this;
        const eventChannel = this.getOpenerEventChannel();
        //获取上个页面传递过来的数据
        eventChannel.on('sendCreateOrderInfo', function(createOrderInfo) {
            _this.setData({
                createOrderInfo
            })
        })
        // this.getSysInfo();
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