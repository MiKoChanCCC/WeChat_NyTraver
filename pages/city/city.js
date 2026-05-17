//导入地区信息
//const cityInfo = require("../../utils/cityInfo");
//const cityItems = cityInfo.cityItems;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        intoItem:'A',  //导航到指定id
        type:"",  //当前是出发地还是目的地
    },
    //处理服务器请求到的城市数据
    dealResponseData(cityList){
        let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        const cityInfo = {};
        let curLetter_temp = [];
        cityList.forEach(item => {
            if(!curLetter_temp.includes(item.pinyin.slice(0,1).toUpperCase()))
            curLetter_temp.push(item.pinyin.slice(0,1).toUpperCase());
        })
        //对letters进行过滤操作
        letters = letters.filter(item => {
            return curLetter_temp.includes(item);
        })
        //对城市信息进行处理
        letters.forEach((item,index) => {
            let temp = [];
            for(let i = 0; i < cityList.length; i++){
                if(item == cityList[i].pinyin.slice(0,1).toUpperCase()){
                    temp.push(cityList[i]);
                }
            }
            cityInfo[item] = temp;
        })
        //存储数据到页面data
        this.setData({
            cityInfo,
            navLetters:letters
        })
    },
    //导航栏定位到城市首字母
    navChange(e){
        let item = e.currentTarget.dataset.type;
        this.setData({
            intoItem:item
        })
    },
    //选择城市事件
    selectedCity(event){
        const cityObj = {type:this.data.type,city:event.currentTarget.dataset.city};
        if(this.data.type == 'start'){
            wx.setStorageSync('selectStartCity', cityObj);
        } else if (this.data.type == 'end'){
            wx.setStorageSync('selectEndCity', cityObj);
        }
        //返回上一页
        wx.navigateBack();
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.request({
            url:"http://ncyunhua.com:8088/api/cinema/getCity",
            method:"GET",
            success:(res) => {
                this.dealResponseData(res.data.data);
            }
        })
        //出发地还是目的地
        this.setData({
            type:options.type
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