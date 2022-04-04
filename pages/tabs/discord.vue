<template>
  <view class="discord">
    <view class="top">
      <u-search :clearabled="true" :show-action="false"></u-search>
    </view>
    胜多负少范德萨范德萨发的
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
  onShow () {
    console.log('bbb')
  },
  onLoad () {},
  methods: {}
}
</script>

<style lang="scss">
.discord {
  .top {
    padding: 40rpx;
  }
}
</style>
