<template>
  <div class="container-fluid navbar-header">
    <div class="navbar-logo d-none d-sm-inline-block">
      <router-link to="/">
        <img alt="Vue logo" src="../../assets/logo.png">
      </router-link>
    </div>
    <ul class="navbar-list-menu">
      <li v-if="!isAuth">
        <router-link to="/login">Login</router-link>
      </li>
      <template v-if="isAuth">
        <li>
          <router-link to="/atec">Atec</router-link>
        </li>
        <li>
          <span class="welcome-title">Welcome {{ email }} </span>
        </li>
        <li>
          <a @click="onLogout()" >Logout</a>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
  export default {
    computed: {
      email () {
        return this.$store.getters.userEmail
      },
      isAuth () {
        return this.$store.getters.isAuth
      }
    },
    methods: {
      onLogout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location = '/login';
      }      
    }
  }
</script>
<style lang="scss">
  .navbar-header {
    width: 100%;
    height: 80px;
    overflow: hidden;
    position: relative;
    top: 0;
    left: 0;
    box-sizing: border-box;
    box-shadow: 0 3px 8px -5px #555;
    -webkit-box-shadow: 0 3px 8px -5px #555;
    -moz-box-shadow: 0 3px 8px -5px #555;
    z-index: 2;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #ffc40c;
      opacity: 1;
      z-index: -1;
    }

    .navbar-logo {
      display: inline-block;
      width: auto;
      height: 68px;
      max-width: 150px;
      margin: 6px;
      overflow: hidden;
      box-sizing: border-box;
      border-radius: 3px;  
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
      -moz-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);

      img {
        background-color: white;
        height: 100%;
        width: auto;
        padding: 0 15px;
      }
    }

    ul {
      &.navbar-list-menu {
        margin: 0;
        padding: 0;
        height: 100%;
        float: right;

        li {
          display: inline-block;
          height: 100%;
          list-style-type: none;
          position: relative;
          margin-left: 5px;
          
          &:last-child {
            margin-right: 0;
          }
          a {
            padding: 12px 16px;
            display: inline-block;
            text-decoration: none;
            color: #212121;
            cursor: pointer;
            font-family: sans-serif;
            font-weight: normal;
            position: relative;
            top: 50%;
            border-bottom: 0px solid #e89963;
            transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            transition: all .3s;
            -moz-transition: all .3s;
            -webkit-transition: all .3s;

            &:hover {
              font-weight: bold;
            }
          }

          span {
            padding: 12px 16px;
            display: inline-block;
            text-decoration: none;
            color: #212121;
            font-family: sans-serif;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
          }

          form {
            padding: 12px 16px;
            display: inline-block;
            font-family: sans-serif;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
            -moz-transform: translateY(-50%);  
          }
        }
      }
    }
  }

</style>