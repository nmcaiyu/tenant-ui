<template>
    <view class="container">
      <!-- 搜索栏 -->
      <view class="search-bar">
        <view class="search-box">
          <image class="search-icon" src="https://img.icons8.com/ios/50/000000/search--v1.png"></image>
          <input type="text" v-model="searchKey" placeholder="搜索租客姓名/手机号" />
        </view>
      </view>
  
      <!-- 租客列表 -->
      <view class="tenant-list">
        <view class="tenant-item" v-for="(tenant, index) in tenantList" :key="index" @tap="goToDetail(tenant.id)">
          <view class="tenant-header">
            <view class="tenant-info">
              <image class="tenant-avatar" :src="tenant.avatar"></image>
              <view class="tenant-basic">
                <view class="tenant-name">
                  <text>{{tenant.name}}</text>
                  <text class="tenant-gender">{{tenant.gender}}</text>
                </view>
                <text class="tenant-phone">{{tenant.phone}}</text>
              </view>
            </view>
            <view :class="['tenant-status', tenant.status]">{{tenant.statusText}}</view>
          </view>
          
          <view class="house-info">
            <text class="house-name">{{tenant.houseName}}</text>
            <view class="contract-info">
              <text>租期：{{tenant.startDate}} 至 {{tenant.endDate}}</text>
              <text>月租：¥{{tenant.rent}}</text>
            </view>
          </view>
          
          <view class="tenant-actions">
            <button class="action-btn" @tap.stop="callTenant(tenant)">
              <image src="https://img.icons8.com/ios/50/ffffff/phone.png"></image>
              联系
            </button>
            <button class="action-btn" @tap.stop="renewContract(tenant)">
              <image src="https://img.icons8.com/ios/50/ffffff/document.png"></image>
              续约
            </button>
            <button class="action-btn" @tap.stop="collectRent(tenant)">
              <image src="https://img.icons8.com/ios/50/ffffff/money.png"></image>
              收租
            </button>
          </view>
        </view>
      </view>
  
      <!-- 添加按钮 -->
      <view class="add-btn" @tap="addTenant">
        <image src="https://img.icons8.com/ios/50/ffffff/plus.png"></image>
      </view>
    </view>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchKey: '',
        tenantList: [
          {
            id: 1,
            name: '张三',
            gender: '男',
            phone: '13800138000',
            avatar: 'https://img.icons8.com/color/48/000000/user-male-circle--v1.png',
            status: 'normal',
            statusText: '正常',
            houseName: '阳光小区1号楼2单元301',
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            rent: 3500
          },
          {
            id: 2,
            name: '李四',
            gender: '女',
            phone: '13900139000',
            avatar: 'https://img.icons8.com/color/48/000000/user-female-circle--v1.png',
            status: 'arrears',
            statusText: '欠费',
            houseName: '望京新城4号楼1单元502',
            startDate: '2024-03-01',
            endDate: '2025-02-28',
            rent: 5000
          }
        ]
      }
    },
    methods: {
      goToDetail(id) {
        uni.navigateTo({
          url: `/pages/tenant/detail?id=${id}`
        })
      },
      callTenant(tenant) {
        uni.makePhoneCall({
          phoneNumber: tenant.phone
        })
      },
      renewContract(tenant) {
        uni.navigateTo({
          url: `/pages/contract/renew?tenantId=${tenant.id}`
        })
      },
      collectRent(tenant) {
        uni.navigateTo({
          url: `/pages/payment/collect?tenantId=${tenant.id}`
        })
      },
      addTenant() {
        uni.navigateTo({
          url: '/pages/tenant/add'
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
  
  .search-bar {
    margin-bottom: 30rpx;
  }
  
  .search-box {
    height: 80rpx;
    background: #fff;
    border-radius: 40rpx;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
  }
  
  .search-icon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 20rpx;
  }
  
  .tenant-list {
    margin-bottom: 100rpx;
  }
  
  .tenant-item {
    background: #fff;
    border-radius: 12rpx;
    padding: 20rpx;
    margin-bottom: 20rpx;
  }
  
  .tenant-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
  }
  
  .tenant-info {
    display: flex;
    align-items: center;
  }
  
  .tenant-avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
    margin-right: 20rpx;
  }
  
  .tenant-name {
    display: flex;
    align-items: center;
  }
  
  .tenant-name text:first-child {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-right: 10rpx;
  }
  
  .tenant-gender {
    font-size: 24rpx;
    color: #666;
  }
  
  .tenant-phone {
    font-size: 26rpx;
    color: #666;
    margin-top: 6rpx;
  }
  
  .tenant-status {
    padding: 4rpx 12rpx;
    border-radius: 6rpx;
    font-size: 24rpx;
  }
  
  .tenant-status.normal {
    background: #E8F5E9;
    color: #388E3C;
  }
  
  .tenant-status.arrears {
    background: #FFEBEE;
    color: #D32F2F;
  }
  
  .house-info {
    border-top: 1rpx solid #eee;
    border-bottom: 1rpx solid #eee;
    padding: 20rpx 0;
    margin-bottom: 20rpx;
  }
  
  .house-name {
    font-size: 28rpx;
    color: #333;
    margin-bottom: 10rpx;
  }
  
  .contract-info {
    display: flex;
    justify-content: space-between;
    font-size: 24rpx;
    color: #666;
  }
  
  .tenant-actions {
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