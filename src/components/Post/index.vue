<template>
  <div>
    <h1 class="mb-0"> {{ post.title }} </h1>
    <small class="text-muted"> {{ post.createdAt }} </small>
    <p> {{ post.body }} </p>
  </div>
</template>

<script>
export default {
  props: ['post'],
}
</script>

<style>

</style>