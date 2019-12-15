<template>
  <div class="cointainer">
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
