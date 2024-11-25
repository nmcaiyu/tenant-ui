"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchKey: "",
      houseList: [
        {
          id: 1,
          name: "阳光小区1号楼2单元301",
          address: "北京市朝阳区阳光小区1号楼2单元301室",
          image: "https://img.alicdn.com/imgextra/i3/6000000004304/O1CN01UoAqwN1hm6vwfQVmZ_!!6000000004304-0-tbvideo.jpg",
          area: 90,
          layout: "两室一厅",
          direction: "南北通透",
          price: 3500,
          status: "rented",
          statusText: "已出租"
        },
        {
          id: 2,
          name: "望京新城4号楼1单元502",
          address: "北京市朝阳区望京新城4号楼1单元502室",
          image: "https://img.alicdn.com/imgextra/i4/6000000005754/O1CN01K6LAX51rM32s9FDMS_!!6000000005754-0-tbvideo.jpg",
          area: 120,
          layout: "三室两厅",
          direction: "东南",
          price: 5e3,
          status: "vacant",
          statusText: "空置中"
        }
      ]
    };
  },
  methods: {
    showFilter() {
    },
    goToDetail(id) {
      common_vendor.index.navigateTo({
        url: `/pages/house/detail?id=${id}`
      });
    },
    editHouse(house) {
      common_vendor.index.navigateTo({
        url: `/pages/house/edit?id=${house.id}`
      });
    },
    manageHouse(house) {
      common_vendor.index.navigateTo({
        url: `/pages/house/manage?id=${house.id}`
      });
    },
    addHouse() {
      common_vendor.index.navigateTo({
        url: "/pages/house/add"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.searchKey,
    b: common_vendor.o(($event) => $data.searchKey = $event.detail.value),
    c: common_vendor.o((...args) => $options.showFilter && $options.showFilter(...args)),
    d: common_vendor.f($data.houseList, (house, index, i0) => {
      return {
        a: house.image,
        b: common_vendor.t(house.name),
        c: common_vendor.t(house.statusText),
        d: common_vendor.n(house.status),
        e: common_vendor.t(house.address),
        f: common_vendor.t(house.area),
        g: common_vendor.t(house.layout),
        h: common_vendor.t(house.direction),
        i: common_vendor.t(house.price),
        j: common_vendor.o(($event) => $options.editHouse(house), index),
        k: common_vendor.o(($event) => $options.manageHouse(house), index),
        l: index,
        m: common_vendor.o(($event) => $options.goToDetail(house.id), index)
      };
    }),
    e: common_vendor.o((...args) => $options.addHouse && $options.addHouse(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
