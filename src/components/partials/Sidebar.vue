<template>
  <div class="sidebar" :class="{'collapsed': (collapseSidebar)}">
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
        <router-link to="/weekly-note/form" class="disabled">
          <i class="fas fa-calendar-week"></i>
          <span class="ml-2">Perkembangan mingguan</span>
        </router-link>
      </li>
      <li>
        <router-link to="/weekly-note/report" class="disabled">
          <i class="fas fa-calendar-check"></i>
          <span class="ml-2">Laporan mingguan</span>
        </router-link>
      </li>
      <li>
        <router-link to="/drug-multivitamin" class="disabled">
          <i class="fas fa-pills"></i>
          <span class="ml-2">Review multivitamin</span>
        </router-link>
      </li>
      <li>
        <router-link to="/doctor" class="disabled">
          <i class="fas fa-user-md"></i>
          <span class="ml-2">Referensi dokter</span>
        </router-link>
      </li>
      <!-- review suplemen -->
      <!-- review obat -->
      <!-- review cemilan -->
      <!-- review terapi -->
    </ul>
    <button class="sidebar-toggle" @click="collapseSidebar = !collapseSidebar">&lt;</button>
  </div>  
</template>
<script>
  export default {
    data() {
      return {
        collapseSidebar : false
      }
    }
  }
</script>
<style lang="scss">
  .sidebar {
    padding: 0 18px 16px;
    position: sticky;
    top: 100px;
    transition: all .5s;
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
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
          &.disabled {
            pointer-events: none;
            color: #a9a9a9;
          }
        }
      }
    }
    &.collapsed {
      min-width: unset !important;
      width: unset !important;
      max-width: 70px !important;
      padding: 20px 15px !important;
      ul {
        li {
          a {
            span {
              display: none;
            }
          }
        }
      }
      .sidebar-toggle {
        transition: all .5s;
        -webkit-transition: all .5s;
        -moz-transition: all .5s;
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        opacity: 1;
      }
    }
    .sidebar-toggle {
      opacity: 0;
      position: absolute;
      right: -16px;
      top: 5%;
      border-radius: 50px;
      padding: 3px 10px 5px 10px;
      text-align: center;
      height: 30px;
      line-height: 0px;
      border: none;

      &:focus {
        outline: none;
      }
    }
    &:hover {
      .sidebar-toggle { opacity: 1; }
    }
  }
  @media only screen and (max-width: 1021px) {
    .sidebar {
      display: none;
    }
  }
</style>