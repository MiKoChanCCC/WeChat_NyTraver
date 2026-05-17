// packageA/pages/hotelDetail/hotelDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotelInfo:{},  //酒店相关信息
        stayStartDate:"2023-12-05",  //住宿开始日期
        stayEndDate:"2023-12-06",  //住宿结束日期
        totalDays:1,  //日期间隔几天
        totalPrice:0,  //总价:入住天数*单价
    },
    //住宿离店日期选择
    dateChange(event){
        const type = event.currentTarget.dataset.type;
        const value = event.detail.value;
        //将日期字符串，转为number类型的数组
        let startDate = this.data.stayStartDate.split("-").map(item => Number(item));
        let valueArr = value.split("-").map(item => Number(item));
        //获取当前日期情况
        const date = new Date(Date.now());
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        let timestape = Date.parse(year+"-"+month+"-"+day);  //当前时间戳
        if(type == "start"){
            //选择的入住日期不能在离店日期之后
            let end = Date.parse(this.data.stayEndDate);
            let current = Date.parse(value);
            if((end - current) < 1000*3600*24 || current - timestape < 0){
                //选择的日期有误，或者两者间隔小于一天
                wx.showToast({
                  title: '选择的日期非法',
                  icon:"error"
                })
                return;
            }
            this.setData({
                stayStartDate:value
            })
        } else if (type == "end"){
            //选择的离店日期不能在入住日期之前
            let start = Date.parse(this.data.stayStartDate);
            let current = Date.parse(value);
            if((current - start) < 1000*3600*24 || current - timestape < 1000*3600*24){
                //选择的日期有误，或者两者间隔小于一天
                wx.showToast({
                  title: '选择的日期非法',
                  icon:"error"
                })
                return;
            }
            //设置日期
            this.setData({
                stayEndDate:value
            })
        }
        //调用计算入住天数的函数
        this.getStayDays(this.data.stayStartDate,this.data.stayEndDate);
    },
    //预定按钮
    predetermine(){
        //将hotelInfo添加checked、stayDays、totalPrice然后存储于本地
        let storage = wx.getStorageSync('hotelList') || [];
        let hotelInfo = this.data.hotelInfo;
        let index = storage.findIndex(item => item.id == hotelInfo.id);
        if(index == -1){
            //数据未找到
            hotelInfo.checked = true;
            hotelInfo.stayDays = this.data.totalDays;
            hotelInfo.totalPrice = this.data.totalPrice;
            storage.push(hotelInfo);
            wx.setStorageSync('hotelList', storage);
        } else {
            //更新数据
            storage[index].stayDays = this.data.totalDays;
            storage[index].totalPrice = this.data.totalPrice;
            wx.setStorageSync('hotelList', storage);
        }
        //跳转到酒店订单页
        wx.navigateTo({
          url: '/packageA/pages/hotelOrder/hotalOrder',
        })
    },
    //计算总价格
    calcuelateTotalPrice(){
        let days = Number(this.data.totalDays);
        let price = Number(this.data.hotelInfo.price);
        if(days != 0 && price !=0){
            this.setData({
                totalPrice:days * price
            })
        }
    },
    //获取默认入住离店时间
    getDefaultDate(type) {
        const date = new Date(Date.now());
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        let day = date.getDate();
        if(type == "start"){
            day += 1;
        } else if (type == "end"){
            day += 2;
        }
        day = day >= 10 ? day : ("0"+day);
        let str = year +"-"+ month +"-"+ day;
        if(type == "start"){
            this.setData({
                stayStartDate:str
            })
        } else if(type == "end"){
            this.setData({
                stayEndDate:str
            })
        }
        //计算价格
        this.calcuelateTotalPrice();
    },
    //通过入住日期和离店日期计算入住天数
    getStayDays(startDate, endDate){
        let diffDate = Math.abs(Date.parse(endDate)-Date.parse(startDate));
        let totalDays = Math.floor(diffDate/(1000*3600*24));
        this.setData({
            totalDays
        })
        //计算价格
        this.calcuelateTotalPrice();
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let id = options.id;  //id参数
        //获取酒店列表数据
        wx.request({
          url: 'http://ncyunhua.com:9090/api/nycx/hotel',
          method:"GET",
          success:(res) => {
            let currentHotel = res.data.data.filter(item => item.id == id);
            this.setData({
                hotelInfo:currentHotel[0]
            })

            this.getDefaultDate("end");
            this.getDefaultDate("start");
            this.getStayDays(this.data.stayStartDate, this.data.stayEndDate);
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