<template>
  <div class="container">
    <section class="row mt-3">
      <!-- User info -->
      <section class="col-lg-4">
        <UserInfo />
      </section>
      <!-- User posts -->
      <section class="col-lg-8">
        <div class="card shadow p-3">
          <b-nav tabs justified>
            <b-nav-item active>Posts</b-nav-item>
            <b-nav-item>Comments</b-nav-item>
            <b-nav-item>Likes </b-nav-item>
            <b-nav-item>Something else</b-nav-item>
          </b-nav>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import UserInfo from '../../components/UserInfo'
export default {
  components: {
    UserInfo,
  }
}
</script>

<style>

</style>