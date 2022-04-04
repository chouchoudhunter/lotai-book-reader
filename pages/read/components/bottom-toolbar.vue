<template>
  <view class="bottom-toolbar" :style="{'transform':!isShow?'translateY(60px)':'none' }">
    <image
      src="../../../static/tabs/discord.png"
      mode="widthFix"
      class="image"
    ></image>
    <image
      src="../../../static/tabs/discord.png"
      mode="widthFix"
      class="image"
    ></image>
    <image
      src="../../../static/tabs/discord.png"
      mode="widthFix"
      class="image"
    ></image>
  </view>
</template>

<script>
export default {
  name: 'bottom-toolbar',
  prop: {
    isShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.bottom-toolbar {
  background-color: white;
  height: 60px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  transition: all 0.5s;

  .image {
    width: 40rpx;
  }
}
</style>
