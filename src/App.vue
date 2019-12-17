<template>
  <div>
    <navigation-header></navigation-header>
    <main>
      <router-view></router-view>
    </main>
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

  .wrapper-center {
    width: 100%;
    margin: 10% auto;
    font-family: sans-serif;

    &.is-small {
      max-width: 400px;
    }
    &.is-medium {
      max-width: 800px;
    }
    &.is-large {
      max-width: 1200px;
    }
  }
  
  .wrapper-fluid {
    margin: 80px 0;
    padding: 0 50px;
    display: flex;
  
    .content {
      width: calc(100% - 190px);
      height: calc(100vh - 150px);
      padding: 10px 30px;
      overflow: auto;
  
      h1 {
        margin-top: 0;
      }  
    }
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