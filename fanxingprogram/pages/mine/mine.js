Page({
  data: {

  },
  favorite() {
    wx.navigateTo({
      url: '/pages/favorite/favorite'
    });
  },
  checkinPeople() {
    wx.navigateTo({
      url: '/pages/checkinPeople/checkinPeople'
    });
  }
})