// pages/orderDetail/orderDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderDetail:{},  //当前订单数据
    },
    //删除当前订单
    delOrder(event){
        const id = event.currentTarget.dataset.orderid;
        wx.showModal({
          title: '提示',
          content: '确定删除该订单吗?',
          complete: (res) => {
            if (res.cancel) {
              //取消删除
              wx.showToast({
                title: '取消删除',
                icon:"none"
              })
            }
        
            if (res.confirm) {
              //确定删除
              //发请求到服务器
              wx.request({
                  url:"http://ncyunhua.com:9090/api/nycx/order/" + id,
                  method:"DELETE",
                  success(res){
                      if(res.data.code == 200){
                          wx.showToast({
                            title: '删除成功',
                            icon:"success"
                          })
                          //2s后跳转到订单列表页
                          setTimeout(()=>{
                            wx.switchTab({
                                url: '/pages/orderList/orderList',
                            })
                          },2000)
                      }
                  },
                  fail:function(error) {
                      wx.showToast({
                        title: '删除失败',
                        icon:"error"
                      })
                  }
              })
            }
          }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const _this = this;
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on('getOrderDetail',(res)=>{
            _this.setData({
                orderDetail:res[0]
            })
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