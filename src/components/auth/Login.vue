<template>
    <div class="container">
      <div class="row min100vh align-items-center justify-content-md-center">
        <div class="col col-md-6 col-lg-4">
          <form action="/login" class="form-center mb15" method="POST">
            <h1 class="mb15">Please sign in</h1>
            <input
              id="email-login"
              class="form-control mb5"
              type="email"
              name="email"
              placeholder="Email address"
              value=""
              required autofocus>
            <input
              id="pass-login"
              class="form-control mb15"
              type="password"
              name="password"
              placeholder="Password"
              value=""
              required>
            <div class="text-center">
              <input type="hidden" name="_csrf" value="">
              <button class="btn btn-info btn-block" type="submit">L O G I N</button>
              <router-link class="btn btn-link btn-block text-danger" to="/reset">Reset Password</router-link>
              <router-link class="btn btn-link btn-block" to="/reset">Have no account? Register your email</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>
