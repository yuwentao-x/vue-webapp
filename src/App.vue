<template>
  <div id="app">
    <!-- 需要被缓存的页面，建议使用视图命名来解决 -->
    <keep-alive>
      <router-view name="alive"></router-view>
    </keep-alive>
    
    <!-- 不需要被缓存的组件，用default容器来显示 -->
    <router-view></router-view>

  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style lang="scss">
html,body{
  margin: 0;
  padding: 0;
  background: #f6f6f6;
}
.van-checkbox{
  &>div {
    margin: 0 auto;
  }
}
</style>
