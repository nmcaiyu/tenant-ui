"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      repairList: [
        {
          id: 1,
          type: "水电维修",
          status: "pending",
          statusText: "待处理",
          houseName: "阳光小区1号楼2单元301",
          description: "厨房水龙头漏水，需要维修",
          images: [
            "https://img.alicdn.com/imgextra/i3/6000000004304/O1CN01UoAqwN1hm6vwfQVmZ_!!6000000004304-0-tbvideo.jpg"
          ],
          reporter: "张三",
          phone: "13800138000",
          createTime: "2024-03-19 14:30"
        },
        {
          id: 2,
          type: "家具维修",
          status: "processing",
          statusText: "处理中",
          houseName: "望京新城4号楼1单元502",
          description: "衣柜门轴松动，需要维修",
          images: [
            "https://img.alicdn.com/imgextra/i4/6000000005754/O1CN01K6LAX51rM32s9FDMS_!!6000000005754-0-tbvideo.jpg"
          ],
          reporter: "李四",
          phone: "13900139000",
          createTime: "2024-03-18 09:15"
        }
      ]
    };
  },
  methods: {
    goToDetail(id) {
      common_vendor.index.navigateTo({
        url: `/pages/repair/detail?id=${id}`
      });
    },
    previewImage(urls, current) {
      common_vendor.index.previewImage({
        urls,
        current: urls[current]
      });
    },
    assignRepair(repair) {
      common_vendor.index.navigateTo({
        url: `/pages/repair/assign?id=${repair.id}`
      });
    },
    completeRepair(repair) {
      common_vendor.index.navigateTo({
        url: `/pages/repair/complete?id=${repair.id}`
      });
    },
    callReporter(repair) {
      common_vendor.index.makePhoneCall({
        phoneNumber: repair.phone
      });
    },
    addRepair() {
      common_vendor.index.navigateTo({
        url: "/pages/repair/add"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.repairList, (repair, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(repair.type),
        b: common_vendor.t(repair.statusText),
        c: common_vendor.n(repair.status),
        d: common_vendor.t(repair.houseName),
        e: common_vendor.t(repair.description),
        f: repair.images && repair.images.length
      }, repair.images && repair.images.length ? {
        g: common_vendor.f(repair.images, (img, idx, i1) => {
          return {
            a: idx,
            b: img,
            c: common_vendor.o(($event) => $options.previewImage(repair.images, idx), idx)
          };
        })
      } : {}, {
        h: common_vendor.t(repair.reporter),
        i: common_vendor.t(repair.phone),
        j: common_vendor.t(repair.createTime),
        k: repair.status === "pending"
      }, repair.status === "pending" ? {
        l: common_vendor.o(($event) => $options.assignRepair(repair), index)
      } : {}, {
        m: repair.status === "processing"
      }, repair.status === "processing" ? {
        n: common_vendor.o(($event) => $options.completeRepair(repair), index)
      } : {}, {
        o: common_vendor.o(($event) => $options.callReporter(repair), index),
        p: index,
        q: common_vendor.o(($event) => $options.goToDetail(repair.id), index)
      });
    }),
    b: common_vendor.o((...args) => $options.addRepair && $options.addRepair(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
