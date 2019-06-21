const db = wx.cloud.database();
const app = getApp();

Component({
  data: {
    addHotel: {
      name: '',
      bedNum: 0,
      bedroomNum: 0,
      checkinTime: '14:00',
      checkoutTime: '12:00',
      city: '',
      description: '',
      facilities: [],
      location: '',
      peopleNum: 0,
      kitchenNum: 0,
      livingroomNum: 0,
      price: 0,
      recieveTime: '14:00~23:00',
      recommend: false,
      rules: '',
      toiletNum: 0,
      type: '公寓',
      picture: []
    }
  },
  methods: {
    bindHotelNameInput(e){
      this.data.addHotel.name=e.detail.value;
      console.log(this.data.addHotel);
    },
    bindHotelbedNumInput(e) {
      this.data.addHotel.bedNum = e.detail.value;
      console.log(this.data.addHotel);
    },
    bindHotelbedroomNumInput(e) {
      this.data.addHotel.bedroomNum = e.detail.value;
      console.log(this.data.addHotel);
    },
    bindHotelcityInput(e) {
      this.data.addHotel.city = e.detail.value;
      console.log(this.data.addHotel);
    },
    bindHoteldescriptionInput(e) {
      this.data.addHotel.description = e.detail.value;
      console.log(this.data.addHotel);
    },
    bindHotelfacilitiesInput(e) {
      this.data.addHotel.facilities = e.detail.value;
      console.log(this.data.addHotel);
    },
    bindHotellocationInput(e) {
      this.data.addHotel.location = e.detail.value;
      console.log(this.data.addHotel);
    },
    bindHotelpeopleNumInput(e) {
      this.data.addHotel.peopleNum = e.detail.value;
      console.log(this.data.addHotel);
    },
    bindHotelkitchenNumInput(e) {
      this.data.addHotel.kitchenNum = e.detail.value;
      console.log(this.data.addHotel);
    },
    bindHotellivingroomNumInput(e) {
      this.data.addHotel.livingroomNum = e.detail.value;
      console.log(this.data.addHotel);
    },
    bindHotelpriceInput(e) {
      this.data.addHotel.price = e.detail.value;
      console.log(this.data.addHotel);
    },
    bindHoteltoiletNumInput(e) {
      this.data.addHotel.toiletNum = e.detail.value;
      console.log(this.data.addHotel);
    },
    bindHotelpictureInput(e) {
      this.data.addHotel.picture = e.detail.value;
      console.log(this.data.addHotel);
    },
    bindHotelrulesInput(e) {
      this.data.addHotel.rules = e.detail.value;
      console.log(this.data.addHotel);
    },
    //管家添加Hotel
    addHotelByManager() {
      db.collection('Hotel').add({
        data:{
          name: this.data.addHotel.name,
          bedNum: this.data.addHotel.bedNum,
          bedroomNum: this.data.addHotel.bedroomNum,
          checkinTime: this.data.addHotel.checkinTime,
          checkoutTime: this.data.addHotel.checkoutTime,
          city: this.data.addHotel.city,
          dataUsed: [],
          description: this.data.addHotel.description,
          geopoint: this.data.addHotel.geopoint,
          kitchenNum: this.data.addHotel.kitchenNum,
          livingroomNum: this.data.addHotel.livingroomNum,
          location: this.data.addHotel.location,
          peopleNum: this.data.addHotel.peopleNum,
          picture: this.data.addHotel.picture,
          facilities:this.data.addHotel.facilities,
          price: this.data.addHotel.price,
          recieveTime: this.data.addHotel.recieveTime,
          geopoint: '',
          recommend: this.data.addHotel.recommend,
          rules: this.data.addHotel.rules,
          toiletNum: this.data.addHotel.toiletNum,
          type: this.data.addHotel.type,
        },
        success: res => {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 100,
            mask: true
          });
          wx.navigateTo({
            url: '',
          })
        }
      })
      this.data.addHotel;
    }
  }
})
