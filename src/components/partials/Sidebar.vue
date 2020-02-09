<template>
  <div class="sidebar">
    <ul>
      <li>
        <router-link to="/atec/form" class="">Mengisi atec</router-link>
      </li>
      <li>
        <router-link to="/atec/report" class="">Laporan atec</router-link>
      </li>
      <li>
        <router-link to="/weekly-note/form" class="">Perkembangan mingguan</router-link>
      </li>
      <li>
        <router-link to="/weekly-note/report" class="">Laporan mingguan</router-link>
      </li>
      <li>
        <router-link to="/drug-multivitamin" class="">Review multivitamin</router-link>
      </li>
      <li>
        <router-link to="/doctor" class="">Referensi dokter</router-link>
      </li>
      <!-- review suplemen -->
      <!-- review obat -->
      <!-- review cemilan -->
      <!-- review terapi -->
    </ul>
  </div>  
</template>
<style lang="scss">
  .sidebar {
    padding: 0 18px 16px;
    position: sticky;
    top: 100px;
    ul {
      padding: 0;
      list-style: none;
      margin: 0;

      li {
        margin-bottom: 20px;
        a {
          color: #676262;
          transition: all .3s;
          -webkit-transition: all .3s;
          -moz-transition: all .3s;
          &.router-link-active,
          &:hover {
            font-weight: bold;
            padding-bottom: 3px;
            border-bottom: 2px solid #676262;   
            text-decoration: none;         
          }
        }
      }
    }
  }
</style>