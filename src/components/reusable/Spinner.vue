<template>
  <div class="d-flex justify-content-center">
    <div 
      class="spinner-border text-secondary" 
      :class="`spinner-border-${spinnerType}`"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
    <div class="loading-text" v-if="loadingText">{{loadingText}}</div>      
  </div>
</template>
<script>
  export default {
    props: ['spinnerType', 'loadingText']
  }
</script>
<style lang="scss" scoped>
  .d-flex {
    &.justify-content-center {
      align-items: center;
      .loading-text {
        margin-left: 8px;
      }
    }
  }
</style>
