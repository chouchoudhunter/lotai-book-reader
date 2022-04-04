<template>
  <view class="user">
    <u-navbar :is-back="false" :border-bottom="false">
      <u-icon name="email" size="38"></u-icon>
      <view slot="right">
        <u-icon name="chat" size="38"></u-icon>
        <u-icon name="setting" size="38"></u-icon>
      </view>
    </u-navbar>
    <view>
      <u-image
        width="200rpx"
        height="200rpx"
        :src="src"
        shape="circle"
        mode="aspectFit"
        src="https://img0.baidu.com/it/u=1967997459,1022958762&fm=26&fmt=auto"
      ></u-image>
    </view>
    <u-gap height="16" bg-color="rgb(245, 245, 245)"></u-gap>
  </view>
</template>

<script>
export default {
  data () {
    return {
      title: 'Hello',
      isLight: true
    }
  },
  onLoad () {},
  methods: {
    change () {
      this.isLight = !this.isLight
    }
  }
}
</script>

<style lang="scss">
</style>
