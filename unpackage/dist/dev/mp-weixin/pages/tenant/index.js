"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchKey: "",
      tenantList: [
        {
          id: 1,
          name: "张三",
          gender: "男",
          phone: "13800138000",
          avatar: "https://img.icons8.com/color/48/000000/user-male-circle--v1.png",
          status: "normal",
          statusText: "正常",
          houseName: "阳光小区1号楼2单元301",
          startDate: "2024-01-01",
          endDate: "2024-12-31",
          rent: 3500
        },
        {
          id: 2,
          name: "李四",
          gender: "女",
          phone: "13900139000",
          avatar: "https://img.icons8.com/color/48/000000/user-female-circle--v1.png",
          status: "arrears",
          statusText: "欠费",
          houseName: "望京新城4号楼1单元502",
          startDate: "2024-03-01",
          endDate: "2025-02-28",
          rent: 5e3
        }
      ]
    };
  },
  methods: {
    goToDetail(id) {
      common_vendor.index.navigateTo({
        url: `/pages/tenant/detail?id=${id}`
      });
    },
    callTenant(tenant) {
      common_vendor.index.makePhoneCall({
        phoneNumber: tenant.phone
      });
    },
    renewContract(tenant) {
      common_vendor.index.navigateTo({
        url: `/pages/contract/renew?tenantId=${tenant.id}`
      });
    },
    collectRent(tenant) {
      common_vendor.index.navigateTo({
        url: `/pages/payment/collect?tenantId=${tenant.id}`
      });
    },
    addTenant() {
      common_vendor.index.navigateTo({
        url: "/pages/tenant/add"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.searchKey,
    b: common_vendor.o(($event) => $data.searchKey = $event.detail.value),
    c: common_vendor.f($data.tenantList, (tenant, index, i0) => {
      return {
        a: tenant.avatar,
        b: common_vendor.t(tenant.name),
        c: common_vendor.t(tenant.gender),
        d: common_vendor.t(tenant.phone),
        e: common_vendor.t(tenant.statusText),
        f: common_vendor.n(tenant.status),
        g: common_vendor.t(tenant.houseName),
        h: common_vendor.t(tenant.startDate),
        i: common_vendor.t(tenant.endDate),
        j: common_vendor.t(tenant.rent),
        k: common_vendor.o(($event) => $options.callTenant(tenant), index),
        l: common_vendor.o(($event) => $options.renewContract(tenant), index),
        m: common_vendor.o(($event) => $options.collectRent(tenant), index),
        n: index,
        o: common_vendor.o(($event) => $options.goToDetail(tenant.id), index)
      };
    }),
    d: common_vendor.o((...args) => $options.addTenant && $options.addTenant(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
