"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      currentTab: 0,
      tabs: ["全部", "租金", "水电费", "物业费", "其他"],
      paymentList: [
        {
          id: 1,
          title: "3月份租金",
          amount: 3500,
          status: "pending",
          statusText: "待收取",
          houseName: "阳光小区1号楼2单元301",
          tenantName: "张三",
          period: "2024-03",
          dueDate: "2024-03-10"
        },
        {
          id: 2,
          title: "2月份水电费",
          amount: 238,
          status: "completed",
          statusText: "已完成",
          houseName: "望京新城4号楼1单元502",
          tenantName: "李四",
          period: "2024-02",
          dueDate: "2024-03-05"
        }
      ]
    };
  },
  methods: {
    switchTab(index) {
      this.currentTab = index;
    },
    collectPayment(payment) {
      common_vendor.index.navigateTo({
        url: `/pages/payment/collect?id=${payment.id}`
      });
    },
    sendReminder(payment) {
    },
    viewDetail(payment) {
      common_vendor.index.navigateTo({
        url: `/pages/payment/detail?id=${payment.id}`
      });
    },
    addPayment() {
      common_vendor.index.navigateTo({
        url: "/pages/payment/add"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tabs, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab),
        b: index,
        c: common_vendor.n($data.currentTab === index ? "active" : ""),
        d: common_vendor.o(($event) => $options.switchTab(index), index)
      };
    }),
    b: common_vendor.f($data.paymentList, (payment, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(payment.title),
        b: common_vendor.t(payment.statusText),
        c: common_vendor.n(payment.status),
        d: common_vendor.t(payment.amount),
        e: common_vendor.t(payment.houseName),
        f: common_vendor.t(payment.tenantName),
        g: common_vendor.t(payment.period),
        h: common_vendor.t(payment.dueDate),
        i: payment.status === "pending"
      }, payment.status === "pending" ? {
        j: common_vendor.o(($event) => $options.collectPayment(payment), index)
      } : {}, {
        k: payment.status === "pending"
      }, payment.status === "pending" ? {
        l: common_vendor.o(($event) => $options.sendReminder(payment), index)
      } : {}, {
        m: common_vendor.o(($event) => $options.viewDetail(payment), index),
        n: index
      });
    }),
    c: common_vendor.o((...args) => $options.addPayment && $options.addPayment(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
