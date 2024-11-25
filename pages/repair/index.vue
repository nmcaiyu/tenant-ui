<template>
    <view class="container">
      <!-- 维修状态统计 -->
      <view class="repair-stats">
        <view class="stat-card">
          <text class="stat-number">5</text>
          <text class="stat-text">待处理</text>
        </view>
        <view class="stat-card">
          <text class="stat-number">3</text>
          <text class="stat-text">处理中</text>
        </view>
        <view class="stat-card">
          <text class="stat-number">28</text>
          <text class="stat-text">已完成</text>
        </view>
      </view>
  
      <!-- 维修列表 -->
      <view class="repair-list">
        <view class="repair-item" v-for="(repair, index) in repairList" :key="index" @tap="goToDetail(repair.id)">
          <view class="repair-header">
            <view class="repair-type">{{repair.type}}</view>
            <view :class="['repair-status', repair.status]">{{repair.statusText}}</view>
          </view>
          
          <view class="repair-content">
            <view class="repair-house">{{repair.houseName}}</view>
            <view class="repair-desc">{{repair.description}}</view>
            <view class="repair-images" v-if="repair.images && repair.images.length">
              <image 
                v-for="(img, idx) in repair.images" 
                :key="idx" 
                :src="img"
                mode="aspectFill"
                @tap.stop="previewImage(repair.images, idx)"
              ></image>
            </view>
          </view>
          
          <view class="repair-info">
            <view class="info-row">
              <text class="label">报修人：</text>
              <text class="value">{{repair.reporter}}</text>
            </view>
            <view class="info-row">
              <text class="label">联系电话：</text>
              <text class="value">{{repair.phone}}</text>
            </view>
            <view class="info-row">
              <text class="label">报修时间：</text>
              <text class="value">{{repair.createTime}}</text>
            </view>
          </view>
          
          <view class="repair-actions">
            <button 
              class="action-btn" 
              v-if="repair.status === 'pending'"
              @tap.stop="assignRepair(repair)"
            >派单</button>
            <button 
              class="action-btn" 
              v-if="repair.status === 'processing'"
              @tap.stop="completeRepair(repair)"
            >完工</button>
            <button 
              class="action-btn"
              @tap.stop="callReporter(repair)"
            >联系</button>
          </view>
        </view>
      </view>
  
      <!-- 添加按钮 -->
      <view class="add-btn" @tap="addRepair">
      <image src="https://img.icons8.com/ios/50/ffffff/plus.png"></image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      repairList: [
        {
          id: 1,
          type: '水电维修',
          status: 'pending',
          statusText: '待处理',
          houseName: '阳光小区1号楼2单元301',
          description: '厨房水龙头漏水，需要维修',
          images: [
            'https://img.alicdn.com/imgextra/i3/6000000004304/O1CN01UoAqwN1hm6vwfQVmZ_!!6000000004304-0-tbvideo.jpg'
          ],
          reporter: '张三',
          phone: '13800138000',
          createTime: '2024-03-19 14:30'
        },
        {
          id: 2,
          type: '家具维修',
          status: 'processing',
          statusText: '处理中',
          houseName: '望京新城4号楼1单元502',
          description: '衣柜门轴松动，需要维修',
          images: [
            'https://img.alicdn.com/imgextra/i4/6000000005754/O1CN01K6LAX51rM32s9FDMS_!!6000000005754-0-tbvideo.jpg'
          ],
          reporter: '李四',
          phone: '13900139000',
          createTime: '2024-03-18 09:15'
        }
      ]
    }
  },
  methods: {
    goToDetail(id) {
      uni.navigateTo({
        url: `/pages/repair/detail?id=${id}`
      })
    },
    previewImage(urls, current) {
      uni.previewImage({
        urls,
        current: urls[current]
      })
    },
    assignRepair(repair) {
      uni.navigateTo({
        url: `/pages/repair/assign?id=${repair.id}`
      })
    },
    completeRepair(repair) {
      uni.navigateTo({
        url: `/pages/repair/complete?id=${repair.id}`
      })
    },
    callReporter(repair) {
      uni.makePhoneCall({
        phoneNumber: repair.phone
      })
    },
    addRepair() {
      uni.navigateTo({
        url: '/pages/repair/add'
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

.repair-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30rpx;
}

.stat-card {
  background: #fff;
  padding: 20rpx;
  border-radius: 12rpx;
  width: 30%;
  text-align: center;
}

.stat-number {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  display: block;
}

.stat-text {
  font-size: 24rpx;
  color: #666;
  margin-top: 10rpx;
}

.repair-list {
  margin-bottom: 100rpx;
}

.repair-item {
  background: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.repair-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.repair-type {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.repair-status {
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
  font-size: 24rpx;
}

.repair-status.pending {
  background: #FFF3E0;
  color: #F57C00;
}

.repair-status.processing {
  background: #E3F2FD;
  color: #1976D2;
}

.repair-status.completed {
  background: #E8F5E9;
  color: #388E3C;
}

.repair-content {
  margin-bottom: 20rpx;
}

.repair-house {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.repair-desc {
  font-size: 26rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.repair-images {
  display: flex;
  flex-wrap: wrap;
}

.repair-images image {
  width: 160rpx;
  height: 160rpx;
  margin-right: 10rpx;
  margin-bottom: 10rpx;
  border-radius: 8rpx;
}

.repair-info {
  border-top: 1rpx solid #eee;
  border-bottom: 1rpx solid #eee;
  padding: 20rpx 0;
  margin-bottom: 20rpx;
}

.info-row {
  display: flex;
  margin-bottom: 10rpx;
}

.info-row:last-child {
  margin-bottom: 0;
}

.label {
  width: 140rpx;
  font-size: 26rpx;
  color: #666;
}

.value {
  flex: 1;
  font-size: 26rpx;
  color: #333;
}

.repair-actions {
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