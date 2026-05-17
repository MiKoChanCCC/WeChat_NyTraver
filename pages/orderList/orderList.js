// pages/orderList/orderList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderList:[],  //订单列表信息
    },
    //点击车票进入到车票详情页
    goTicekerDetail(e){
        const _this = this;
        // console.log('进入车票详情',e.currentTarget.dataset.orderId);
        let orderId = e.currentTarget.dataset.orderid;
        wx.navigateTo({
          url: "/pages/orderDetail/orderDetail?orderId=" + orderId,
          success:function(res) {
              const order = _this.data.orderList.filter(item => item.id == orderId);
              res.eventChannel.emit('getOrderDetail',order);
          }
        })
    },
    //功能函数，对服务器返回来的数据进行简单处理
    delResponseData(data){
        let result = data.map(item => {
            let resItem = {
                id:item.id,
                type:item.type,
                ticketType:item.ticketType,
                trip:{
                    time:item.tripTime,
                    startCity:item.tripStartCity,
                    endCity:item.tripEndCity
                }
            }
            if(item.backTime !== null){
                resItem.back = {
                    time:item.backTime,
                    startCity:item.backStartCity,
                    endCity:item.backEndCity
                }
            }
            return resItem;
        })
        return result;
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
        const _this = this;
        //此处向服务器获取所有的订单列表信息
        wx.request({
            url:"http://ncyunhua.com:9090/api/nycx/order",
            method:"GET",
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res){
                //获取处理好的服务器返回数据
                const delRes = _this.delResponseData(res.data.data);
                _this.setData({
                    orderList:delRes
                })
            }
        })
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