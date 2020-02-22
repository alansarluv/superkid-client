<template>
  <div class="container container-100vh">
    <div class="row min100vh align-items-center justify-content-md-center">
      <div class="col col-md-6 col-lg-3">
        <form @submit.prevent="onSubmit" class="form-center is-register-form">
          <h3 class="mb15 text-center">Register</h3>
          <input
            class="form-control mb5 <%= validationErrors.find(e => e.param === 'email') ? 'is-invalid' : '' %>"
            type="email"
            name="email"
            placeholder="Email address"
            v-model="email"
            required autofocus>
          <input 
            id="password"
            class="form-control mb5 <%= validationErrors.find(e => e.param === 'password') ? 'is-invalid' : '' %>"
            type="password"
            name="password"
            placeholder="Password"
            v-model="password"
            required>
          <input 
            id="confirmPassword"
            class="form-control mb15 <%= validationErrors.find(e => e.param === 'password') ? 'is-invalid' : '' %>"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            v-model="confirmPassword"
            required>
          <input type="hidden" name="_csrf" value="<%= csrfToken %>">
          <button class="btn btn-info btn-block" :class="{'btn-disabled': (password !== confirmPassword || password.length === 0)}" type="submit">Register</button>
          <router-link class="btn btn-link mt-3 goto-login" to="/login">Back to Login</router-link>
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
        password: '',
        confirmPassword: ''
      }
    },
    methods: {
      onSubmit () {
        if (this.password.length > 0 && this.password === this.confirmPassword) {
          const formData = {
            email: this.email,
            password: this.password
          }
          this.$store.dispatch('signup', formData);
        }
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