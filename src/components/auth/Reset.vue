<template>
  <div class="container">
    <div class="row min100vh align-items-center justify-content-md-center">
      <div class="col col-md-6 col-lg-4">
        <form action="/reset" class="form-center mb15" method="POST">
          <h1 class="mb15">Reset Password</h1>
          <input
            id="email"
            class="form-control mb5"
            type="email"
            name="email"
            placeholder="Email address"
            required autofocus>
          <input type="hidden" name="_csrf" value="<%= csrfToken %>">
          <button class="btn btn-info btn-block" type="submit">Reset Password</button>
          <router-link class="btn btn-link mt-3 goto-login" to="/login">Back to Login</router-link>
        </form>
      </div>
    </div>
  </div>
</template>
