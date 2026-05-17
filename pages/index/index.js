// index.js
//导入时间处理模块
const dateFormat = require("../../utils/dateFormat");
const oneDay = 1*24*60*60*1000;
Page({
    data:{
        type:0,  //单程0还是往返1
        rotate:-180,
        startCity:'上海',  //出发城市
        endCity:'北京',  //到达城市
        startTime:"08:08",  //出发时间
        backTime:"14:08",  //返回时间
        ticketType:"audlt",  //车票类型(学生、成人)
    },
    //单程、往返切换
    changeWay(ev){
        this.setData({
            type:ev.target.dataset.type
        });
    },
    //点击图标对调城市
    swapCity(ev){
        //图片旋转180
        var animation = wx.createAnimation({
            timingFunction: "ease",
            duration: 400
        })
        // this.animation = animation;
        animation.rotateZ(this.data.rotate).step();
        this.setData({
            rotate: -1*this.data.rotate,
            animation: animation.export()
        })
        //出发城市和到达城市交换
        this.setData({
            startCity:this.data.endCity,
            endCity:this.data.startCity
        })
        //更新本地存储的出发和到达城市
        wx.setStorageSync('selectStartCity', {type:'start',city:this.data.startCity});
        wx.setStorageSync('selectEndCity', {type:'end',city:this.data.endCity});
    },
    //城市选择功能
    selectCity(e){
        const type = e.currentTarget.dataset.type;
        wx.navigateTo({url: `/pages/city/city?type=${type}`});
    },
    //选择学生票还是成人票
    checkboxChange(e){
        // console.log(e.detail.value);
        this.setData({
            ticketType:e.detail.value
        })
    },
    //点击购买车票按钮
    confirmBtn(){
        //传递订单信息
        const obj = {
            type:this.data.type,
            trip:{startCity:this.data.startCity,endCity:this.data.endCity,time:this.data.FSdate.currentday + "," + this.data.startTime},
            ticketType:this.data.ticketType
        }
        //订单信息中是否包含返程信息
        if(obj.type === 1){
            obj.back = {startCity:this.data.endCity,endCity:this.data.startCity,time:this.data.FEdate.currentday + "," + this.data.backTime};
        }
        wx.navigateTo({
          url: '/pages/creatOrder/creatOrder',
          success: function(res) {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('sendCreateOrderInfo', obj);
          }
        })
    },
    //选择出行/返程时间
    bindTimeChange(e){
        const type = e.currentTarget.dataset.type;
        const value = e.detail.value;
        if(type == "start"){
            this.setData({startTime:value});
        } else if(type == "back"){
            this.setData({backTime:value});
        }
    },
    //选择出行日期
    bindDateChange: function(e){//绑定选择时间的函数
        // console.log(e);
        var type = e.currentTarget.dataset.type;
        switch (type) {
          case '1':
            this.setData({
              FSdate: {
                date: dateFormat.formatTime(new Date(e.detail.value)),
                week: dateFormat.formatWeek(new Date(e.detail.value)),
                startday: this.data.FSdate.startday,
                currentday: dateFormat.formatDay(new Date(e.detail.value))
              },
              FEdate: {
                date: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateFormat.formatTime(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateFormat.formatTime(new Date(this.data.FEdate.currentday)),
                week: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateFormat.formatWeek(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateFormat.formatWeek(new Date(this.data.FEdate.currentday)),
                startday: dateFormat.formatDay(new Date(new Date(e.detail.value).getTime() + oneDay)),//todo
                currentday: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateFormat.formatDay(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateFormat.formatDay(new Date(this.data.FEdate.currentday))
              },
              HSdate: {
                date: dateFormat.formatTime(new Date(e.detail.value)),
                week: dateFormat.formatWeek(new Date(e.detail.value)),
                startday: this.data.HSdate.startday,
                currentday: dateFormat.formatDay(new Date(e.detail.value))
              },
              HEdate: {
                date: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateFormat.formatTime(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateFormat.formatTime(new Date(this.data.FEdate.currentday)),
                week: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateFormat.formatWeek(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateFormat.formatWeek(new Date(this.data.FEdate.currentday)),
                startday: this.data.HEdate.startday,
                currentday: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateFormat.formatDay(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateFormat.formatDay(new Date(this.data.FEdate.currentday))
              }
            })
            break;
          case '2':
            this.setData({
              FEdate: {
                date: dateFormat.formatTime(new Date(e.detail.value)),
                week: dateFormat.formatWeek(new Date(e.detail.value)),
                startday: this.data.FEdate.startday,
                currentday: dateFormat.formatDay(new Date(e.detail.value))
              },
              HEdate: {
                date: dateFormat.formatTime(new Date(e.detail.value)),
                week: dateFormat.formatWeek(new Date(e.detail.value)),
                startday: this.data.HEdate.startday,
                currentday: dateFormat.formatDay(new Date(e.detail.value))
              }
            })
            break;
          case '3':
            this.setData({
              HSdate: {
                date: dateFormat.formatTime(new Date(e.detail.value)),
                week: dateFormat.formatWeek(new Date(e.detail.value)),
                startday: this.data.HSdate.startday,
                currentday: dateFormat.formatDay(new Date(e.detail.value))
              },
              HEdate: {
                date: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateFormat.formatTime(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateFormat.formatTime(new Date(this.data.FEdate.currentday)),
                week: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateFormat.formatWeek(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateFormat.formatWeek(new Date(this.data.FEdate.currentday)),
                startday: dateFormat.formatDay(new Date(new Date(e.detail.value).getTime() + oneDay)),//todo
                currentday: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateFormat.formatDay(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateFormat.formatDay(new Date(this.data.FEdate.currentday))
              }
            })
            break;
          case '4':
            this.setData({
              HEdate: {
                date: dateFormat.formatTime(new Date(e.detail.value)),
                week: dateFormat.formatWeek(new Date(e.detail.value)),
                startday: this.data.HEdate.startday,
                currentday: dateFormat.formatDay(new Date(e.detail.value))
              }
            })
            break;
        }
    },
    compareDay: function(startday,endday){
        var startSecond = new Date(startday).getTime();
        var endSecond = new Date(endday).getTime();
        if((endSecond - startSecond) > oneDay){
          return true;
        }else{
          return false;
        }
    },
    //去酒店，跳转到酒店选择
    goHotel(){
        wx.navigateTo({
          url: '/packageA/pages/hotel/hotel',
        })
    },
    //生命周期
    onLoad(){
        this.setData({
            FSdate: {
              date: dateFormat.formatTime(new Date(Date.now() + oneDay)),
              week: dateFormat.formatWeek(new Date(Date.now() + oneDay)),
              startday: dateFormat.formatDay(new Date(Date.now() + oneDay)),
              currentday: dateFormat.formatDay(new Date(Date.now() + oneDay))
            },
            FEdate: {
              date: dateFormat.formatTime(new Date(Date.now() + 2*oneDay)),
              week: dateFormat.formatWeek(new Date(Date.now() + 2*oneDay)),
              startday: dateFormat.formatDay(new Date(Date.now() + 2*oneDay)),
              currentday: dateFormat.formatDay(new Date(Date.now() + 2*oneDay))
            },
            HSdate: {
              date: dateFormat.formatTime(new Date(Date.now() + oneDay)),
              week: dateFormat.formatWeek(new Date(Date.now() + oneDay)),
              startday: dateFormat.formatDay(new Date(Date.now() + oneDay)),
              currentday: dateFormat.formatDay(new Date(Date.now() + oneDay))
            },
            HEdate: {
              date: dateFormat.formatTime(new Date(Date.now() + 2*oneDay)),
              week: dateFormat.formatWeek(new Date(Date.now() + 2*oneDay)),
              startday: dateFormat.formatDay(new Date(Date.now() + 2*oneDay)),
              currentday: dateFormat.formatDay(new Date(Date.now() + 2*oneDay))
            }
        })
    },
    onShow(){
        //获取城市选择页存储的本地数据
        const selectStartCity = wx.getStorageSync('selectStartCity');
        const selectEndCity = wx.getStorageSync('selectEndCity');
        if(selectStartCity != ''){
            this.setData({
                startCity:selectStartCity.city
            })
        }
        if(selectEndCity != '' && selectStartCity.city != selectEndCity.city){
            this.setData({
                endCity:selectEndCity.city
            })
        }
    }
})
