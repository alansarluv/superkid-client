<template>
  <div class="container">
    <navigation-header></navigation-header>
    <router-view></router-view>
  </div>
</template>
<script>
  import Navigation from './components/partials/Navigation.vue';
  export default {
    components: {
      navigationHeader: Navigation
    }
  }
</script>
<style lang="scss">
  body {
    background-color: transparent;
    margin: 0;
  }

  main {
    min-height: calc(100vh - 170px);
  }

  .bg-gradien {
    background-color: #e4e9fd;
    background-image: -webkit-linear-gradient(65deg, #ffdcc4 50%, #fbffe8 50%);
    height: 100vh;
  }

  hr.separator {border-top-width: 10px; border-style: dotted;}
  .tc { text-align : center; }
  .min100vh { min-height: 100vh; }
  .mt15 { margin-top: 15px; }
  .mt30 { margin-top: 30px; }
  .mt-100 { margin-top: 100px; }
  .my-100 { margin-top: 100px; margin-bottom: 100px; }
  .my15 { margin-top: 15px; margin-bottom: 15px; }
  .m0 { margin: 0; }
  .mr5 { margin-right: 5px; }
  .mb5 { margin-bottom: 5px; }
  .mb15 { margin-bottom: 15px; }  
</style>