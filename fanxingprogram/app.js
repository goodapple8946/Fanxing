//app.js
App({
  globalData: {
    userInfo: null,
    search: {
      cityID: 0,
      checkinDate: new Date(2019, 1, 1),
      checkoutDate: new Date(2099, 12, 31),
      peopleNum: 0,
    },
    user: {
      favorites: [],
      checkinPeople: [],
      coupons: []
    }
  }
})