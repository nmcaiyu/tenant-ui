<template>
    <view class="container">
      <!-- 搜索栏 -->
      <view class="search-bar">
        <view class="search-box">
          <image class="search-icon" src="https://img.icons8.com/ios/50/000000/search--v1.png"></image>
          <input type="text" v-model="searchKey" placeholder="搜索房屋编号/地址" />
        </view>
        <view class="filter-btn" @tap="showFilter">
          <image src="https://img.icons8.com/ios/50/000000/filter--v1.png"></image>
        </view>
      </view>
  
      <!-- 房屋状态统计 -->
      <view class="status-cards">
        <view class="status-card">
          <text class="status-number">8</text>
          <text class="status-text">已出租</text>
        </view>
        <view class="status-card">
          <text class="status-number">4</text>
          <text class="status-text">空置中</text>
        </view>
        <view class="status-card">
          <text class="status-number">2</text>
          <text class="status-text">待维修</text>
        </view>
      </view>
  
      <!-- 房屋列表 -->
      <view class="house-list">
        <view class="house-item" v-for="(house, index) in houseList" :key="index" @tap="goToDetail(house.id)">
          <image class="house-image" :src="house.image" mode="aspectFill"></image>
          <view class="house-info">
            <view class="house-title">
              <text>{{house.name}}</text>
              <view :class="['house-status', house.status]">{{house.statusText}}</view>
            </view>
            <text class="house-address">{{house.address}}</text>
            <view class="house-attrs">
              <text>{{house.area}}㎡</text>
              <text>{{house.layout}}</text>
              <text>{{house.direction}}</text>
            </view>
            <view class="house-bottom">
              <text class="house-price">¥{{house.price}}/月</text>
              <view class="house-actions">
                <button class="action-btn" @tap.stop="editHouse(house)">编辑</button>
                <button class="action-btn" @tap.stop="manageHouse(house)">管理</button>
              </view>
            </view>
          </view>
        </view>
      </view>
  
      <!-- 添加按钮 -->
      <view class="add-btn" @tap="addHouse">
        <image src="https://img.icons8.com/ios/50/ffffff/plus.png"></image>
      </view>
    </view>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchKey: '',
        houseList: [
          {
            id: 1,
            name: '阳光小区1号楼2单元301',
            address: '北京市朝阳区阳光小区1号楼2单元301室',
            image: 'https://img.alicdn.com/imgextra/i3/6000000004304/O1CN01UoAqwN1hm6vwfQVmZ_!!6000000004304-0-tbvideo.jpg',
            area: 90,
            layout: '两室一厅',
            direction: '南北通透',
            price: 3500,
            status: 'rented',
            statusText: '已出租'
          },
          {
            id: 2,
            name: '望京新城4号楼1单元502',
            address: '北京市朝阳区望京新城4号楼1单元502室',
            image: 'https://img.alicdn.com/imgextra/i4/6000000005754/O1CN01K6LAX51rM32s9FDMS_!!6000000005754-0-tbvideo.jpg',
            area: 120,
            layout: '三室两厅',
            direction: '东南',
            price: 5000,
            status: 'vacant',
            statusText: '空置中'
          }
        ]
      }
    },
    methods: {
      showFilter() {
        // 显示筛选面板
      },
      goToDetail(id) {
        uni.navigateTo({
          url: `/pages/house/detail?id=${id}`
        })
      },
      editHouse(house) {
        uni.navigateTo({
          url: `/pages/house/edit?id=${house.id}`
        })
      },
      manageHouse(house) {
        uni.navigateTo({
          url: `/pages/house/manage?id=${house.id}`
        })
      },
      addHouse() {
        uni.navigateTo({
          url: '/pages/house/add'
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
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;
  }
  
  .search-box {
    flex: 1;
    height: 80rpx;
    background: #fff;
    border-radius: 40rpx;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    margin-right: 20rpx;
  }
  
  .search-icon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 20rpx;
  }
  
  .filter-btn {
    width: 80rpx;
    height: 80rpx;
    background: #fff;
    border-radius: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .filter-btn image {
    width: 40rpx;
    height: 40rpx;
  }
  
  .status-cards {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30rpx;
  }
  
  .status-card {
    background: #fff;
    padding: 20rpx;
    border-radius: 12rpx;
    width: 30%;
    text-align: center;
  }
  
  .status-number {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    display: block;
  }
  
  .status-text {
    font-size: 24rpx;
    color: #666;
    margin-top: 10rpx;
  }
  
  .house-list {
    margin-bottom: 100rpx;
  }
  
  .house-item {
    background: #fff;
    border-radius: 12rpx;
    margin-bottom: 20rpx;
    overflow: hidden;
  }
  
  .house-image {
    width: 100%;
    height: 300rpx;
  }
  
  .house-info {
    padding: 20rpx;
  }
  
  .house-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rpx;
  }
  
  .house-title text {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
  }
  
  .house-status {
    padding: 4rpx 12rpx;
    border-radius: 6rpx;
    font-size: 24rpx;
  }
  
  .house-status.rented {
    background: #E8F5E9;
    color: #388E3C;
  }
  
  .house-status.vacant {
    background: #FFF3E0;
    color: #F57C00;
  }
  
  .house-address {
    font-size: 26rpx;
    color: #666;
    margin-bottom: 10rpx;
  }
  
  .house-attrs {
    display: flex;
    margin-bottom: 20rpx;
  }
  
  .house-attrs text {
    font-size: 24rpx;
    color: #999;
    margin-right: 20rpx;
  }
  
  .house-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .house-price {
    font-size: 32rpx;
    color: #f56c6c;
    font-weight: bold;
  }
  
  .house-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20rpx;
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