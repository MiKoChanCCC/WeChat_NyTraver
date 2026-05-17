// packageA/pages/hotelOrder/hotalOrder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotelList:[],  //订单数据
        isAllSelected:false,  //是否全选
        selectedOrderNum:0,  //选中的订单数量,
        selectedTotalPrice:0,  //选中的商品总价
    },

    //删除订单按钮
    delOrder(event){
        const id = event.currentTarget.dataset.id;
        let hotelList = wx.getStorageSync('hotelList');
        wx.showModal({
          title: '提示',
          content: '确定删除该订单吗',
          complete: (res) => {
            if (res.cancel) {
              //取消删除
              wx.showToast({
                title: '取消删除!',
                icon:"error"
              })
            }
        
            if (res.confirm) {
              //确定删除
              let index = hotelList.findIndex(item => item.id == id);
              if(index !== -1){
                  hotelList.splice(index,1);
                  wx.setStorageSync('hotelList', hotelList);
              }
              //重写赋值给data
              this.setData({
                  hotelList:wx.getStorageSync('hotelList')
              })
              //重新计算
              this.calcuelate();
              wx.showToast({
                title: '删除成功!',
                icon:"success"
              })
            }
          }
        })
    },
    //订单中每一项的选中框
    checkedChange(event){
        const id = event.currentTarget.dataset.id;
        let hotelList = wx.getStorageSync('hotelList');
        hotelList.forEach(item => {
            if(item.id == id){
                item.checked = !item.checked;
            }
        })
        //更新本地存储
        wx.setStorageSync('hotelList', hotelList);
        //更新页面data
        this.setData({
            hotelList:wx.getStorageSync('hotelList')
        })
        //计算相关数据
        this.calcuelate();
    },
    //判断是否全选及选中个数及总价
    calcuelate(){
        let hotelList = wx.getStorageSync('hotelList')||[];
        let isAllSelected = true;
        let orderNum = 0;
        let totalPrice = 0;
        hotelList.forEach(item => {
            if(item.checked){
                orderNum ++;
                totalPrice += item.totalPrice;
            } else {
                isAllSelected = false;
            }
        })
        //更新页面数据
        this.setData({
            isAllSelected,
            selectedOrderNum:orderNum,
            selectedTotalPrice:totalPrice
        })
    },
    //全选全不选的change事件
    allSelectedChange(event){
        const isAllSelected = !this.data.isAllSelected;
        let hotelList = wx.getStorageSync('hotelList');
        if(isAllSelected){
            hotelList.forEach(item => {
                item.checked = isAllSelected
            })
        } else {
            hotelList.forEach(item => {
                item.checked = isAllSelected
            })
        }
        //更新本地存储
        wx.setStorageSync('hotelList', hotelList);
        //更新页面数据
        this.setData({
            hotelList
        })
        //计算相关数据
        this.calcuelate();
    },
    //去支付按钮
    payment(){
        let hotelList = wx.getStorageSync('hotelList');
        if(hotelList.length == 0 || !hotelList.filter(item => item.checked == true).length > 0){
            return wx.showToast({title: '未选择任何订单',icon:"error" });
        }
        hotelList = hotelList.filter(item => item.checked == false);
        wx.showLoading({title: '网络请求中'});
        //两秒后提示支付成功
        setTimeout(() => {
            wx.hideLoading();
            wx.showToast({title: '本次免支付',icon:"success"});
            //更新本地及页面数据
            wx.setStorageSync('hotelList', hotelList);
            this.setData({hotelList});
            //重新计算相关数据
            this.calcuelate();
        }, 1500);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //获取本地存储中的订单数据
        const hotelList = wx.getStorageSync('hotelList');
        this.setData({
            hotelList
        })
        //计算相关数据
        this.calcuelate();
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