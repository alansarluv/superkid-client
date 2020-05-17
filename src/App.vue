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
    .container-100vh {
      min-height: calc(100vh - 120px);
      background-color: #efefef;
      margin: 20px;
      width: auto;
      max-width: unset;
      box-shadow: 0 3px 8px -5px #555;
      -webkit-box-shadow: 0 3px 8px -5px #555;
      -moz-box-shadow: 0 3px 8px -5px #555;
    }
    .container-content {
      display: flex;
      padding: 0;      
      min-height: calc(100vh - 120px);
      max-height: calc(100vh - 120px);
      background-color: #efefef;
      margin: 20px;
      width: auto;
      max-width: unset;
      box-shadow: 0 3px 8px -5px #555;
      -webkit-box-shadow: 0 3px 8px -5px #555;
      -moz-box-shadow: 0 3px 8px -5px #555;
      .sidebar {
        padding: 20px 25px;
        min-width: 280px;
        max-width: 280px;
        width: 280px;
        border-right: 1px solid #d4d4d4;        
      }
      .right-content {
        padding: 20px 25px;
        width: 100%;
        overflow: auto;
      }
    }
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

  .scrollable-box {
    padding: 15px;
    background-color: #efefef;
    border-radius: 4px;
    max-height: calc(100vh - 200px);
    overflow: auto;
  }

  .card-box-route {
    color: inherit;
    &:hover {
      color: inherit;
      text-decoration: none;
    }
    .card {
      -webkit-transition: all .3s;
      -moz-transition: all .3s;
      transition: all .3s;
      background-color: #B98968;
      color: white;
      &:hover {
        -webkit-box-shadow: 0px 0px 14px -2px rgba(0,0,0,0.8);
        -moz-box-shadow: 0px 0px 14px -2px rgba(0,0,0,0.8);
        box-shadow: 0px 0px 14px -2px rgba(0,0,0,0.8);      
      }
    }
  }

  .card { height: 100%; }
  .btn-disabled {
    opacity: .5;
    cursor: not-allowed;
    pointer-events: none;    
  }

  .alert-animation {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    width: 70vw;
    z-index: 3;
  }

  .alert-slide-top {
    position: fixed;
    top: 50px;
    width: 100%;
    max-width: 500px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    .hidden {
      display: none;
    }
  }

  .c-pointer { cursor: pointer; }
  hr.separator {border-top-width: 10px; border-style: dotted;}
  .tc { text-align : center; }
  .min100vh { min-height: 100vh; }
  .mt15 { margin-top: 15px; }
  .mt30 { margin-top: 30px; }
  .mt-100 { margin-top: 100px; }
  .mt-125 { margin-top: 125px; }
  .my-100 { margin-top: 100px; margin-bottom: 100px; }
  .my15 { margin-top: 15px; margin-bottom: 15px; }
  .m0 { margin: 0; }
  .mr5 { margin-right: 5px; }
  .mb5 { margin-bottom: 5px; }
  .mb15 { margin-bottom: 15px; }  
</style>