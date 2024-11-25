<template>
	<view class="container">
	  <!-- 顶部用户信息 -->
	  <view class="user-info">
		<view class="user-left">
		  <image class="user-avatar" src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png"></image>
		  <view class="user-detail">
			<text class="user-name">房东老王</text>
			<text class="user-role">房东管理员</text>
		  </view>
		</view>
		<view class="notification" @tap="goToMessage">
		  <image src="/static/icons/notification.png"></image>
		  <view class="badge" v-if="unreadCount">{{unreadCount}}</view>
		</view>
	  </view>
  
	  <!-- 顶部统计卡片 -->
	  <view class="statistics-cards">
		<view class="stat-card">
		  <text class="card-title">总房屋数</text>
		  <text class="card-number">12</text>
		  <text class="card-trend">环比 +1</text>
		</view>
		<view class="stat-card">
		  <text class="card-title">已出租</text>
		  <text class="card-number">8</text>
		  <text class="card-trend">出租率 66%</text>
		</view>
		<view class="stat-card">
		  <text class="card-title">本月收入</text>
		  <text class="card-number">¥24,000</text>
		  <text class="card-trend">环比 +12%</text>
		</view>
	  </view>
	  
	  <!-- 快捷功能入口 -->
	  <view class="quick-actions">
		<view class="action-item" v-for="(item, index) in quickActions" :key="index" @click="navigateTo(item.path)">
		  <view class="action-icon-wrapper" :style="{ background: item.bgColor }">
			<image :src="item.icon" class="action-icon"></image>
		  </view>
		  <text class="action-text">{{item.name}}</text>
		</view>
	  </view>
	  
	  <!-- 收入概览 -->
	  <view class="income-overview">
		<view class="section-header">
		  <text class="section-title">收入概览</text>
		  <text class="more-link" @tap="navigateTo('/pages/income/detail')">查看详情 ></text>
		</view>
		
		<!-- 收入统计卡片 -->
		<view class="income-stats">
		  <view class="income-total">
			<text class="total-label">本月总收入</text>
			<text class="total-amount">¥24,000</text>
			<view class="total-compare-wrapper">
			  <text class="total-compare">环比增长 12.5%</text>
			  <text class="trend-icon">↑</text>
			</view>
		  </view>
		</view>
		
		<!-- 图表部分 -->
		<view class="chart-wrapper">
		  <canvas 
			type="2d"
			canvas-id="lineCanvas" 
			id="lineCanvas" 
			class="charts"
		  ></canvas>
		</view>
	  </view>
  
	  <!-- 待办事项 -->
	  <view class="todo-list">
		<view class="section-header">
		  <text class="section-title">待办事项</text>
		  <text class="more-link" @tap="navigateTo('/pages/todo/list')">全部 ></text>
		</view>
		<view class="todo-item" v-for="(item, index) in todoList" :key="index" @tap="handleTodo(item)">
		  <view class="todo-left">
			<view class="todo-tag" :class="item.type">{{item.typeText}}</view>
			<text class="todo-text">{{item.content}}</text>
		  </view>
		  <text class="todo-date">{{item.date}}</text>
		</view>
	  </view>
  
	  <!-- 快捷工具栏 -->
	  <view class="toolbar">
		<view class="tool-item" @tap="scanCode">
		  <image src="https://img.icons8.com/ios/50/000000/qr-code--v1.png"></image>
		  <text>扫码</text>
		</view>
		<view class="tool-item" @tap="showHelp">
		  <image src="https://img.icons8.com/ios/50/000000/help.png"></image>
		  <text>帮助</text>
		</view>
	  </view>
	</view>
  </template>
  
  <script>
  import uCharts from '@qiun/ucharts'
  let lineChart = null;
  
  export default {
	data() {
	  return {
		unreadCount: 2,
		quickActions: [
		  { 
			name: '房屋管理', 
			icon: '/static/icons/house.png', 
			path: '/pages/house/index',
			bgColor: '#E8F4FF'
		  },
		  { 
			name: '租客管理', 
			icon: '/static/icons/tenant.png', 
			path: '/pages/tenant/index',
			bgColor: '#FFF3E8'
		  },
		  { 
			name: '收费管理', 
			icon: '/static/icons/payment.png', 
			path: '/pages/payment/index',
			bgColor: '#E8FFF3'
		  },
		  { 
			name: '维修管理', 
			icon: '/static/icons/repair.png', 
			path: '/pages/repair/index',
			bgColor: '#FFE8E8'
		  }
		],
		todoList: [
		  { 
			content: '1号房待收租金', 
			date: '2024-03-20',
			type: 'rent',
			typeText: '租金'
		  },
		  { 
			content: '2号房水电费待缴纳', 
			date: '2024-03-22',
			type: 'utility',
			typeText: '水电'
		  },
		  { 
			content: '3号房合同即将到期', 
			date: '2024-03-25',
			type: 'contract',
			typeText: '合同'
		  }
		],
		incomeData: [
		  { month: '10月', amount: '21000', percentage: 70 },
		  { month: '11月', amount: '19500', percentage: 65 },
		  { month: '12月', amount: '23000', percentage: 77 },
		  { month: '1月', amount: '20800', percentage: 69 },
		  { month: '2月', amount: '21500', percentage: 72 },
		  { month: '3月', amount: '24000', percentage: 80 }
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
			gridType: 'dash',
			dashLength: 2,
			data: [{
			  min: 0,
			  max: 30000
			}]
		  },
		  extra: {
			line: {
			  type: 'curve',
			  width: 2,
			  activeType: 'hollow'
			},
			tooltip: {
			  showBox: true,
			  boxPadding: 3,
			  boxBgColor: '#fff',
			  boxBorderColor: '#eee'
			}
		  }
		},
		// 图表数据
		chartData: {
		  categories: ['10月', '11月', '12月', '1月', '2月', '3月'],
		  series: [{
			name: '月收入',
			data: [21000, 19500, 23000, 20800, 21500, 24000],
			format: (val) => {
			  return '¥' + val.toLocaleString()
			}
		  }]
		},
		cWidth: 0,
		cHeight: 0
	  }
	},
	onReady() {
	  setTimeout(() => {
		this.initChart();
	  }, 100);
	},
	methods: {
	  navigateTo(path) {
		uni.navigateTo({ url: path })
	  },
	  goToMessage() {
		uni.navigateTo({ url: '/pages/message/index' })
	  },
	  handleTodo(item) {
		// 处理待办事项
	  },
	  scanCode() {
		uni.scanCode({
		  success: (res) => {
			console.log(res)
		  }
		})
	  },
	  showHelp() {
		uni.navigateTo({ url: '/pages/help/index' })
	  },
	  initChart() {
		const query = uni.createSelectorQuery().in(this);
		query.select('#lineCanvas')
		  .fields({ node: true, size: true })
		  .exec((res) => {
			if (res[0]) {
			  const canvas = res[0].node;
			  const ctx = canvas.getContext('2d');
			  
			  const dpr = uni.getSystemInfoSync().pixelRatio;
			  canvas.width = res[0].width * dpr;
			  canvas.height = res[0].height * dpr;
			  
			  this.showLineChart(canvas, ctx, this.chartData);
			}
		  });
	  },
	  showLineChart(canvas, ctx, chartData) {
		lineChart = new uCharts({
		  type: 'line',
		  context: ctx,
		  canvas2d: true,
		  width: canvas.width,
		  height: canvas.height,
		  categories: chartData.categories,
		  series: chartData.series,
		  animation: true,
		  background: '#FFFFFF',
		  padding: [15, 15, 0, 15],
		  legend: { show: false },
		  xAxis: {
			disableGrid: true,
			fontColor: '#666666',
			fontSize: 12,
			itemCount: 6
		  },
		  yAxis: {
			gridType: 'dash',
			gridColor: '#EEEEEE',
			splitNumber: 5,
			min: 0,
			max: 30000,
			format: (val) => {
			  return (val/1000) + 'k'
			}
		  },
		  extra: {
			line: {
			  type: 'curve',
			  width: 2,
			  activeType: 'hollow'
			},
			tooltip: {
			  showBox: true,
			  boxPadding: 3,
			  boxBgColor: '#fff',
			  boxBorderColor: '#eee'
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
  }
  </script>
  
  <style>
  .container {
	padding: 30rpx;
	min-height: 100vh;
	background-color: #F0F8FF;
  }
  
  .user-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30rpx;
  }
  
  .user-left {
	display: flex;
	align-items: center;
  }
  
  .user-avatar {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	margin-right: 20rpx;
  }
  
  .user-detail {
	display: flex;
	flex-direction: column;
  }
  
  .user-name {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
  }
  
  .user-role {
	font-size: 24rpx;
	color: #666;
	margin-top: 6rpx;
  }
  
  .notification {
	position: relative;
  }
  
  .notification image {
	width: 50rpx;
	height: 50rpx;
  }
  
  .badge {
	position: absolute;
	top: -6rpx;
	right: -6rpx;
	background: #ff5b5b;
	color: #fff;
	font-size: 20rpx;
	padding: 2rpx 8rpx;
	border-radius: 20rpx;
	min-width: 30rpx;
	text-align: center;
  }
  
  .statistics-cards {
	display: flex;
	justify-content: space-between;
	margin-bottom: 30rpx;
  }
  
  .stat-card {
	background: linear-gradient(135deg, #fff, #f8f9ff);
	padding: 30rpx;
	border-radius: 15rpx;
	width: 30%;
	box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
  }
  
  .card-title {
	font-size: 24rpx;
	color: #666;
	display: block;
  }
  
  .card-number {
	font-size: 36rpx;
	color: #333;
	font-weight: bold;
	margin: 10rpx 0;
	display: block;
  }
  
  .card-trend {
	font-size: 22rpx;
	color: #4CAF50;
	display: block;
  }
  
  .quick-actions {
	background: #fff;
	padding: 30rpx 20rpx;
	border-radius: 15rpx;
	margin-bottom: 30rpx;
	display: flex;
	flex-wrap: wrap;
  }
  
  .action-item {
	width: 25%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 15rpx 0;
  }
  
  .action-icon-wrapper {
	width: 100rpx;
	height: 100rpx;
	border-radius: 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 10rpx;
  }
  
  .action-icon {
	width: 60rpx;
	height: 60rpx;
  }
  
  .action-text {
	font-size: 24rpx;
	color: #666;
  }
  
  .income-overview {
	background: #fff;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  }
  
  .section-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24rpx;
  }
  
  .section-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #2c3e50;
  }
  
  .more-link {
	font-size: 24rpx;
	color: #409EFF;
	display: flex;
	align-items: center;
  }
  
  .income-stats {
	background: linear-gradient(135deg, #f0f7ff 0%, #e6f3ff 100%);
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 24rpx;
  }
  
  .income-total {
	text-align: center;
  }
  
  .total-label {
	font-size: 26rpx;
	color: #5e6d82;
	margin-bottom: 12rpx;
	display: block;
  }
  
  .total-amount {
	font-size: 52rpx;
	font-weight: bold;
	background: linear-gradient(45deg, #409EFF, #64B5F6);
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
	margin: 16rpx 0;
	display: block;
	font-family: 'DIN Alternate', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  .total-compare-wrapper {
	display: inline-flex;
	align-items: center;
	background: rgba(76, 175, 80, 0.1);
	border-radius: 20rpx;
	padding: 6rpx 16rpx;
  }
  
  .total-compare {
	font-size: 24rpx;
	color: #4CAF50;
  }
  
  .trend-icon {
	color: #4CAF50;
	margin-left: 4rpx;
	font-size: 24rpx;
  }
  
  .chart-wrapper {
	height: 400rpx;
	margin-top: 24rpx;
	background: #fff;
	border-radius: 12rpx;
	padding: 20rpx;
	position: relative;
  }
  
  .charts {
	width: 100%;
	height: 100%;
	background-color: #FFFFFF;
  }
  
  /* 添加图表加载动画 */
  .chart-wrapper::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
	animation: shimmer 1.5s infinite;
	transform: translateX(-100%);
	will-change: transform;
  }
  
  @keyframes shimmer {
	100% {
	  transform: translateX(100%);
	}
  }
  
  .todo-list {
	background: #fff;
	padding: 30rpx;
	border-radius: 15rpx;
	margin-bottom: 30rpx;
  }
  
  .todo-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f5f5f5;
  }
  
  .todo-left {
	display: flex;
	align-items: center;
  }
  
  .todo-tag {
	padding: 4rpx 12rpx;
	border-radius: 6rpx;
	font-size: 22rpx;
	margin-right: 15rpx;
  }
  
  .todo-tag.rent {
	background: #E3F2FD;
	color: #1976D2;
  }
  
  .todo-tag.utility {
	background: #F3E5F5;
	color: #7B1FA2;
  }
  
  .todo-tag.contract {
	background: #E8F5E9;
	color: #388E3C;
  }
  
  .todo-text {
	font-size: 28rpx;
	color: #333;
  }
  
  .todo-date {
	font-size: 24rpx;
	color: #999;
  }
  
  .toolbar {
	position: fixed;
	right: 30rpx;
	bottom: 100rpx;
	display: flex;
	flex-direction: column;
  }
  
  .tool-item {
	width: 80rpx;
	height: 80rpx;
	background: #fff;
	border-radius: 40rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.1);
  }
  
  .tool-item image {
	width: 40rpx;
	height: 40rpx;
  }
  
  .tool-item text {
	font-size: 20rpx;
	color: #666;
	margin-top: 4rpx;
  }
  </style>