<template>
  <view
    class="status-placeholder"
    :style="{ height: statusBarHeight + 'px'}"
  ></view>
</template>

<script>
export default {
  props: {

  },
  data () {
    return {
      statusBarHeight: 20
    }
  },
  created () {
    // 手机系统信息+状态栏高度
    const info = getApp().globalData.systemInfo
    this.statusBarHeight = info.statusBarHeight
  }
}
</script>

<style lang="scss">
.status-placeholder {
  position: relative;
}
</style>
