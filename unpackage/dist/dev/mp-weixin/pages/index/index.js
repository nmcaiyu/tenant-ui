"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      unreadCount: 2,
      quickActions: [
        {
          name: "房屋管理",
          icon: "/static/icons/house.png",
          path: "/pages/house/index",
          bgColor: "#E8F4FF"
        },
        {
          name: "租客管理",
          icon: "/static/icons/tenant.png",
          path: "/pages/tenant/index",
          bgColor: "#FFF3E8"
        },
        {
          name: "收费管理",
          icon: "/static/icons/payment.png",
          path: "/pages/payment/index",
          bgColor: "#E8FFF3"
        },
        {
          name: "维修管理",
          icon: "/static/icons/repair.png",
          path: "/pages/repair/index",
          bgColor: "#FFE8E8"
        }
      ],
      todoList: [
        {
          content: "1号房待收租金",
          date: "2024-03-20",
          type: "rent",
          typeText: "租金"
        },
        {
          content: "2号房水电费待缴纳",
          date: "2024-03-22",
          type: "utility",
          typeText: "水电"
        },
        {
          content: "3号房合同即将到期",
          date: "2024-03-25",
          type: "contract",
          typeText: "合同"
        }
      ],
      incomeData: [
        { month: "10月", amount: "21000", percentage: 70 },
        { month: "11月", amount: "19500", percentage: 65 },
        { month: "12月", amount: "23000", percentage: 77 },
        { month: "1月", amount: "20800", percentage: 69 },
        { month: "2月", amount: "21500", percentage: 72 },
        { month: "3月", amount: "24000", percentage: 80 }
      ],
      // 图表配置
      chartOpts: {
        padding: [15, 15, 0, 15],
        enableScroll: false,
        legend: {
          show: false
        },
        xAxis: {
          disableGrid: true,
          itemCount: 6
        },
        yAxis: {
          gridType: "dash",
          dashLength: 2,
          data: [{
            min: 0,
            max: 3e4
          }]
        },
        extra: {
          line: {
            type: "curve",
            width: 2,
            activeType: "hollow"
          },
          tooltip: {
            showBox: true,
            boxPadding: 3,
            boxBgColor: "#fff",
            boxBorderColor: "#eee"
          }
        }
      },
      // 图表数据
      chartData: {
        categories: ["10月", "11月", "12月", "1月", "2月", "3月"],
        series: [{
          name: "月收入",
          data: [21e3, 19500, 23e3, 20800, 21500, 24e3],
          format: (val) => {
            return "¥" + val.toLocaleString();
          }
        }]
      },
      cWidth: 0,
      cHeight: 0
    };
  },
  onReady() {
    setTimeout(() => {
      this.initChart();
    }, 100);
  },
  methods: {
    navigateTo(path) {
      common_vendor.index.navigateTo({ url: path });
    },
    goToMessage() {
      common_vendor.index.navigateTo({ url: "/pages/message/index" });
    },
    handleTodo(item) {
    },
    scanCode() {
      common_vendor.index.scanCode({
        success: (res) => {
          console.log(res);
        }
      });
    },
    showHelp() {
      common_vendor.index.navigateTo({ url: "/pages/help/index" });
    },
    initChart() {
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select("#lineCanvas").fields({ node: true, size: true }).exec((res) => {
        if (res[0]) {
          const canvas = res[0].node;
          const ctx = canvas.getContext("2d");
          const dpr = common_vendor.index.getSystemInfoSync().pixelRatio;
          canvas.width = res[0].width * dpr;
          canvas.height = res[0].height * dpr;
          this.showLineChart(canvas, ctx, this.chartData);
        }
      });
    },
    showLineChart(canvas, ctx, chartData) {
      new common_vendor.uCharts({
        type: "line",
        context: ctx,
        canvas2d: true,
        width: canvas.width,
        height: canvas.height,
        categories: chartData.categories,
        series: chartData.series,
        animation: true,
        background: "#FFFFFF",
        padding: [15, 15, 0, 15],
        legend: { show: false },
        xAxis: {
          disableGrid: true,
          fontColor: "#666666",
          fontSize: 12,
          itemCount: 6
        },
        yAxis: {
          gridType: "dash",
          gridColor: "#EEEEEE",
          splitNumber: 5,
          min: 0,
          max: 3e4,
          format: (val) => {
            return val / 1e3 + "k";
          }
        },
        extra: {
          line: {
            type: "curve",
            width: 2,
            activeType: "hollow"
          },
          tooltip: {
            showBox: true,
            boxPadding: 3,
            boxBgColor: "#fff",
            boxBorderColor: "#eee"
          }
        },
        color: ["#409EFF"],
        point: {
          size: 3,
          borderWidth: 2,
          strokeColor: "#409EFF",
          fillColor: "#fff"
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0,
    b: $data.unreadCount
  }, $data.unreadCount ? {
    c: common_vendor.t($data.unreadCount)
  } : {}, {
    d: common_vendor.o((...args) => $options.goToMessage && $options.goToMessage(...args)),
    e: common_vendor.f($data.quickActions, (item, index, i0) => {
      return {
        a: item.icon,
        b: item.bgColor,
        c: common_vendor.t(item.name),
        d: index,
        e: common_vendor.o(($event) => $options.navigateTo(item.path), index)
      };
    }),
    f: common_vendor.o(($event) => $options.navigateTo("/pages/income/detail")),
    g: common_vendor.o(($event) => $options.navigateTo("/pages/todo/list")),
    h: common_vendor.f($data.todoList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.typeText),
        b: common_vendor.n(item.type),
        c: common_vendor.t(item.content),
        d: common_vendor.t(item.date),
        e: index,
        f: common_vendor.o(($event) => $options.handleTodo(item), index)
      };
    }),
    i: common_vendor.o((...args) => $options.scanCode && $options.scanCode(...args)),
    j: common_vendor.o((...args) => $options.showHelp && $options.showHelp(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
