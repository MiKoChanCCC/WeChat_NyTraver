// pages/mine/mine.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    //清除数据缓存
    clearStorage(){
        wx.showModal({
            title: '提示',
            content: '确定要清除缓存吗?',
            success (res) {
                if (res.confirm) {
                    wx.showLoading({title: '请稍后'});
                    setTimeout(()=>{
                        wx.clearStorage({
                            success:function(){
                                wx.showToast({
                                  title: '缓存清除成功!'
                                });
                            },
                            complete(){
                                wx.hideLoading();
                            }
                        })
                    },1500)
                } else if (res.cancel) {
                    wx.showToast({
                      title: '取消清除缓存',
                      icon:'none'
                    })
                }
            }
        })
    },
    //登录按钮
    login(){
        //直接跳转到登录页
        wx.navigateTo({
          url: '/packageA/pages/login/login',
        })
    },
    //退出登录
    logout(){
        wx.showModal({
          title: '提示',
          content: '确定退出登录？',
          complete: (res) => {
            if (res.cancel) {
              //取消退出
            }      
            if (res.confirm) {
              //确定退出
            }
          }
        })
    },
    //酒店订单
    hotelOrder(){
        wx.navigateTo({url: '/packageA/pages/hotelOrder/hotalOrder'})
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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