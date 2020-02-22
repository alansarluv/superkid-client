<template>
  <div class="container container-100vh">
    <div class="row min100vh align-items-center justify-content-md-center">
      <div class="col col-md-6 col-lg-3">
        <form @submit.prevent="onSubmit" class="form-center mb15">
          <h1 class="mb15">Please sign in</h1>
          <input
            id="email-login"
            class="form-control mb5"
            type="email"
            name="email"
            placeholder="Email address"
            v-model="email"
            required autofocus>
          <input
            id="pass-login"
            class="form-control mb15"
            type="password"
            name="password"
            placeholder="Password"
            v-model="password"
            required>
          <div class="text-center">
            <input type="hidden" name="_csrf" value="">
            <button class="btn btn-info btn-block" type="submit">L O G I N</button>
            <router-link class="btn btn-link btn-block text-danger" to="/reset">Reset Password</router-link>
            <router-link class="btn btn-link btn-block" to="/signup">Have no account? Register your email</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data (){
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('login', formData);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .min100vh {
    min-height: calc(100vh - 120px);
  }
  .btn.btn-info {
    background-color: #ffc40c;
    border-color: #ffc40c;
    color: #212121;
    transition: all .3s;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    &:hover {
      background-color: #212121;
      color: #ffbc41;
    }
  }
</style>