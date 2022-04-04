<template>
  <view
    class="status-placeholder"
    :style="{ height: statusBarHeight + 'px','background-color': bgColor}"
  ></view>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: 'rgb(255, 241, 210)'
    }
  },
  data () {
    return {
      statusBarHeight: 20
    }
  },
  created () {
    // 手机系统信息+状态栏高度
    const info = uni.getSystemInfoSync()
    this.statusBarHeight = info.statusBarHeight
  }
}
</script>

<style lang="scss">
.status-placeholder {
  position: relative;
}
</style>
