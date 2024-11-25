<template>
    <view class="container">
      <!-- 收费统计 -->
      <view class="payment-stats">
        <view class="stat-card">
          <text class="stat-title">本月待收</text>
          <text class="stat-amount">¥28,500</text>
          <text class="stat-count">8笔待收</text>
        </view>
        <view class="stat-card">
          <text class="stat-title">本月已收</text>
          <text class="stat-amount">¥42,000</text>
          <text class="stat-count">12笔完成</text>
        </view>
      </view>
  
      <!-- 收费类型切换 -->
      <scroll-view class="type-tabs" scroll-x>
        <view 
          v-for="(tab, index) in tabs" 
          :key="index"
          :class="['tab-item', currentTab === index ? 'active' : '']"
          @tap="switchTab(index)"
        >
          {{tab}}
        </view>
      </scroll-view>
  
      <!-- 收费列表 -->
      <view class="payment-list">
        <view class="payment-item" v-for="(payment, index) in paymentList" :key="index">
          <view class="payment-header">
            <view class="payment-info">
              <text class="payment-title">{{payment.title}}</text>
              <view :class="['payment-status', payment.status]">{{payment.statusText}}</view>
            </view>
            <text class="payment-amount">¥{{payment.amount}}</text>
          </view>
          
          <view class="payment-detail">
            <view class="detail-row">
              <text class="label">房屋信息：</text>
              <text class="value">{{payment.houseName}}</text>
            </view>
            <view class="detail-row">
              <text class="label">租客姓名：</text>
              <text class="value">{{payment.tenantName}}</text>
            </view>
            <view class="detail-row">
              <text class="label">收费周期：</text>
              <text class="value">{{payment.period}}</text>
            </view>
            <view class="detail-row">
              <text class="label">截止日期：</text>
              <text class="value">{{payment.dueDate}}</text>
            </view>
          </view>
          
          <view class="payment-actions">
            <button 
              class="action-btn" 
              v-if="payment.status === 'pending'"
              @tap="collectPayment(payment)"
            >收款</button>
            <button 
              class="action-btn" 
              v-if="payment.status === 'pending'"
              @tap="sendReminder(payment)"
            >催收</button>
            <button 
              class="action-btn" 
              @tap="viewDetail(payment)"
            >详情</button>
          </view>
        </view>
      </view>
  
      <!-- 添加按钮 -->
      <view class="add-btn" @tap="addPayment">
        <image src="https://img.icons8.com/ios/50/ffffff/plus.png"></image>
      </view>
    </view>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentTab: 0,
        tabs: ['全部', '租金', '水电费', '物业费', '其他'],
        paymentList: [
          {
            id: 1,
            title: '3月份租金',
            amount: 3500,
            status: 'pending',
            statusText: '待收取',
            houseName: '阳光小区1号楼2单元301',
            tenantName: '张三',
            period: '2024-03',
            dueDate: '2024-03-10'
          },
          {
            id: 2,
            title: '2月份水电费',
            amount: 238,
            status: 'completed',
            statusText: '已完成',
            houseName: '望京新城4号楼1单元502',
            tenantName: '李四',
            period: '2024-02',
            dueDate: '2024-03-05'
          }
        ]
      }
    },
    methods: {
      switchTab(index) {
        this.currentTab = index
        // 根据tab切换加载不同数据
      },
      collectPayment(payment) {
        uni.navigateTo({
          url: `/pages/payment/collect?id=${payment.id}`
        })
      },
      sendReminder(payment) {
        // 发送催收提醒
      },
      viewDetail(payment) {
        uni.navigateTo({
          url: `/pages/payment/detail?id=${payment.id}`
        })
      },
      addPayment() {
        uni.navigateTo({
          url: '/pages/payment/add'
        })
      }
    }
  }
  </script>
  
  <style>
  .container {
    padding: 30rpx;
    background: #F0F8FF;
    min-height: 100vh;
  }
  
  .payment-stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30rpx;
  }
  
  .stat-card {
    background: #fff;
    padding: 30rpx;
    border-radius: 12rpx;
    width: 45%;
  }
  
  .stat-title {
    font-size: 28rpx;
    color: #666;
  }
  
  .stat-amount {
    font-size: 40rpx;
    font-weight: bold;
    color: #333;
    margin: 10rpx 0;
    display: block;
  }
  
  .stat-count {
    font-size: 24rpx;
    color: #999;
  }
  
  .type-tabs {
    background: #fff;
    padding: 20rpx;
    border-radius: 12rpx;
    white-space: nowrap;
    margin-bottom: 30rpx;
  }
  
  .tab-item {
    display: inline-block;
    padding: 10rpx 30rpx;
    font-size: 28rpx;
    color: #666;
    margin-right: 20rpx;
    border-radius: 30rpx;
  }
  
  .tab-item.active {
    background: #409EFF;
    color: #fff;
  }
  
  .payment-list {
    margin-bottom: 100rpx;
  }
  
  .payment-item {
    background: #fff;
    border-radius: 12rpx;
    padding: 20rpx;
    margin-bottom: 20rpx;
  }
  
  .payment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
  }
  
  .payment-info {
    display: flex;
    align-items: center;
  }
  
  .payment-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-right: 20rpx;
  }
  
  .payment-status {
    padding: 4rpx 12rpx;
    border-radius: 6rpx;
    font-size: 24rpx;
  }
  
  .payment-status.pending {
    background: #FFF3E0;
    color: #F57C00;
  }
  
  .payment-status.completed {
    background: #E8F5E9;
    color: #388E3C;
  }
  
  .payment-amount {
    font-size: 36rpx;
    font-weight: bold;
    color: #f56c6c;
  }
  
  .payment-detail {
    border-top: 1rpx solid #eee;
    border-bottom: 1rpx solid #eee;
    padding: 20rpx 0;
    margin-bottom: 20rpx;
  }
  
  .detail-row {
    display: flex;
    margin-bottom: 10rpx;
  }
  
  .detail-row:last-child {
    margin-bottom: 0;
  }
  
  .label {
    width: 160rpx;
    font-size: 26rpx;
    color: #666;
  }
  
  .value {
    flex: 1;
    font-size: 26rpx;
    color: #333;
  }
  
  .payment-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 24rpx;
    gap: 20rpx;
  }
  
  .action-btn {
    min-width: 160rpx;
    height: 64rpx;
    margin-left: 20rpx;
    font-size: 26rpx;
    padding: 0 36rpx;
    border-radius: 32rpx;
    background: linear-gradient(135deg, #409EFF, #3B87FF);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4rpx 12rpx rgba(64,158,255,0.3);
    transition: all 0.3s ease;
  }
  
  .action-btn:active {
    transform: scale(0.98);
    box-shadow: 0 2rpx 6rpx rgba(64,158,255,0.2);
  }
  
  .action-btn image {
    width: 32rpx;
    height: 32rpx;
    margin-right: 12rpx;
  }
  
  .add-btn {
    position: fixed;
    right: 40rpx;
    bottom: 60rpx;
    width: 120rpx;
    height: 120rpx;
    background: linear-gradient(135deg, #409EFF, #3B87FF);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6rpx 20rpx rgba(64,158,255,0.4);
    transition: all 0.3s ease;
  }
  
  .add-btn:active {
    transform: scale(0.95);
    box-shadow: 0 4rpx 12rpx rgba(64,158,255,0.3);
  }
  
  .add-btn image {
    width: 56rpx;
    height: 56rpx;
  }
  </style>