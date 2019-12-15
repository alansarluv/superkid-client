<template>
  <div class="container-fluid navbar-header">
    <div class="navbar-logo d-none d-sm-inline-block">
      <router-link to="/">
        <img alt="Vue logo" src="../../assets/logo.png">
      </router-link>
    </div>
    <ul class="navbar-list-menu">
      <li>
        <router-link to="/login">Login</router-link>
        <a class="" href="/login">Login</a>
      </li>
      <li class="d-none d-sm-inline-block">
        <span class="welcome-title">Welcome </span>
      </li>
    </ul>
  </div>
</template>