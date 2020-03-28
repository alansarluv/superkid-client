<template>
  <div class="container-fluid container-content">
    <atec-sidebar></atec-sidebar>
    <div class="right-content">
      <div class="row justify-content-center sticky-100">
        <h1>Chart</h1>
      </div>
    </div>
  </div>
</template>



<script>
  import Sidebar from '../partials/Sidebar';
  
  export default {
    components: {
      atecSidebar: Sidebar
    }

  }
</script>
