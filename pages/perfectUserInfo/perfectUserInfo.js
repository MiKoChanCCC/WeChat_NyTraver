// pages/perfectUserInfo/perfectUserInfo.js
//导入工具类
const tools = require("../../utils/tools");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userName:"张三",
        userSex:"femal",
        userPhone:"2788260",
        userIdcard:"369900198006046622",
        userEmail:"202330878x@qq.com",
        createOrderInfo:{},  //订单信息
        isChecked:true,  //是否勾选旅客须知
        showBill:false,  //是否展示发票信息
    },
    //性别选择
    handlerSex(e){
        this.setData({
            userSex:e.detail.value
        })
    },
    //旅客须知是否勾选
    checkedChange(){
        this.setData({
            isChecked : !this.data.isChecked
        })
    },
    //是否显示发票
    switchChange(){
        this.setData({
            showBill: !this.data.showBill
        })
    },
    //提交订单
    submitOrder(){
        const {userName,userPhone,userIdcard,userEmail,isChecked} = this.data;
        //对表单项联系人进行校验
        if(userName.trim() == "" || userPhone.trim() == "" || userIdcard.trim() == "" || userEmail.trim() == ""){
            return wx.showToast({
              title: '请将表单信息填写完整',
              icon:"error"
            })
        }
        //旅客是否同意勾选旅客须知
        if(!this.data.isChecked){
            wx.showToast({
              title: '请勾选旅客须知',
              icon:"error"
            })
        }
        //提交参数整理
        const paramsObj = {
            type:this.data.createOrderInfo.type,
            ticketType:this.data.createOrderInfo.ticketType,
            tripTime:this.data.createOrderInfo.trip.time.split(",")[0],
            tripStartCity:this.data.createOrderInfo.trip.startCity,
            tripEndCity:this.data.createOrderInfo.trip.endCity
        }
        if(this.data.createOrderInfo.back != undefined){
            paramsObj.backTime = this.data.createOrderInfo.back.time.split(",")[0];
            paramsObj.backStartCity = this.data.createOrderInfo.back.startCity;
            paramsObj.backEndCity = this.data.createOrderInfo.back.endCity;
        }
        // console.log(paramsObj);  //参数正确
        //将订单提交到服务器
        wx.request({
          url: 'http://ncyunhua.com:9090/api/nycx/order',
          data:paramsObj,
          method:"POST",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {
            if(res.data.code === 200){
                wx.showToast({title: '订单提交成功',icon:"none"});
                //提示免支付
                setTimeout(()=>{
                    wx.showToast({title: 'VIP免支付',icon:"success"});
                },1000)
                //跳转到订单列表页
                setTimeout(()=>{
                    wx.showToast({
                      title: '即将跳转到订单列表页',
                    })
                    wx.switchTab({
                      url: '/pages/orderList/orderList',
                    })
                },2000)
            }
          },
          fail(error){
              wx.showToast({
                title: '订单提交失败',
              })
          }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const _this = this;
        const eventChannel = this.getOpenerEventChannel(); 
        //获取上个页面传递过来的数据
        eventChannel.on('getOrderInfo',function(orderInfo){
            _this.setData({
                createOrderInfo:orderInfo
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