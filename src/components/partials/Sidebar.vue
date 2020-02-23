<template>
  <div class="sidebar">
    <ul>
      <li>
        <router-link to="/atec/form" class="">
          <i class="far fa-list-alt"></i>
          <span class="ml-2">Mengisi atec</span>
        </router-link>
      </li>
      <li>
        <router-link to="/atec/report" class="">
          <i class="fas fa-tasks"></i>
          <span class="ml-2">Laporan atec</span>
        </router-link>
      </li>
      <li>
        <router-link to="/weekly-note/form" class="">
          <i class="fas fa-calendar-week"></i>
          <span class="ml-2">Perkembangan mingguan</span>
        </router-link>
      </li>
      <li>
        <router-link to="/weekly-note/report" class="">
          <i class="fas fa-calendar-check"></i>
          <span class="ml-2">Laporan mingguan</span>
        </router-link>
      </li>
      <li>
        <router-link to="/drug-multivitamin" class="">
          <i class="fas fa-pills"></i>
          <span class="ml-2">Review multivitamin</span>
        </router-link>
      </li>
      <li>
        <router-link to="/doctor" class="">
          <i class="fas fa-user-md"></i>
          <span class="ml-2">Referensi dokter</span>
        </router-link>
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
          color: #212121;
          transition: all .3s;
          -webkit-transition: all .3s;
          -moz-transition: all .3s;
          &.router-link-active,
          &:hover {
            font-weight: bold;
            padding-bottom: 3px;
            text-decoration: none;         
          }
        }
      }
    }
  }
</style>