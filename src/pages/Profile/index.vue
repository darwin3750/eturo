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
          <p class="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, laudantium at modi rem quod ex provident quaerat incidunt quo ducimus praesentium atque perferendis fugiat veritatis ipsum suscipit quas saepe similique!
          </p>
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