<template>
  <div class="container p-0">
    <section class="card shadow p-4 m-2">
      <div class="d-flex align-content-center ml-auto mr-auto">
        <img class="svg-content" src="../assets/undraw_winners.svg" height="200" width="">
        <span class="h1 position-absolute center">Badges</span>
      </div>
    </section>
    <section class="row p-3">
      <div v-for="badge in badges" :key="index" 
          class="col-lg-4 col-md-6 pb-2 pr-1 pl-1">
          <div class="rounded-lg shadow-lg card p-4 w-100 h-100 badge-card">
            <header class="d-inline-block text-center badge-container">
              <img class="badge-img" :src="require(`../assets/badges/${badge.icon}`)">
            </header>
            <article class="mt-auto">
              <h2 class="text-center">{{badge.title}}</h2>
              <p class="text-center">{{badge.description}}</p>
            </article>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      badges:[
        {title: "Contributor", description: "Upload 3 documents for a topic or write content for 3 topics.", type: "contribution", icon: "contributor.png"},
        {title: "Frequent Patron", description: "Upload 10 documents for a topic or write content for 10 topics.", type: "contribution", icon: "frequent_patron.png"},
        {title: "Benefactor ", description: "Upload 15 documents for a topic or write content for 15 topics.", type: "contribution", icon: "benefactor.png"},
        
        {title: "Curious Novice", description: "Watch 10 educational videos and read 10 articles.", type: "learning", icon: "curious_novice.png"},
        {title: "Seasoned Savant", description: "Watch 20 educational videos and read 20 articles.", type: "learning", icon: "seasoned_savant.png"},
        {title: "Formidable Expert", description: "Watch 30 educational videos and read 30 articles.", type: "learning", icon: "formidable_expert.png"},
        
        {title: "Contributor", description: "Sign up with an account.", type: "miscellaneous ", icon: "contributor.png"},
        {title: "Locked and Loaded", description: "Download a document/file.", type: "miscellaneous ", icon: "locked_and_loaded.png"},
        {title: "The Eager Learner", description: "Request for new content.", type: "miscellaneous ", icon: "the_eager_learner.png"},
        {title: "Praiseworthy Proofreader", description: "Become an editor for the platform.", type: "miscellaneous ", icon: "praiseworthy_proofreader.png"},
        {title: "The Generous", description: "Donate any amount of money to the website.", type: "miscellaneous ", icon: "the_generous.png"},
      ]
    }
  },
}
</script>

<style scoped>
  .badge-img{
    max-height: 150px;
    max-width: 150px;
  }
  .badge-container{

  }
  .svg-content { 
    display: inline-block;
  }
  .svg-container { 
    display: inline-block;
    position: relative;
    width: 100%;
  }
  .center{
    top:10%;
    left:50%;
    transform: translateX(-50%);
  }
  .h1{
    color: var(--eturo-main-pos6);
  }
  .badge-card{
    transition: 0.5s;
  }
  .badge-card:hover{
    transform:scale(2px);
    border:5px solid var(--eturo-main);
    background: rgb(241, 241, 241);
  }
</style>