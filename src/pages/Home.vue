<template>
  <div>
    <section id="p1_landing" class="position-relative d-flex">
      <div class="container vertical-center d-flex">
        <div class="row vertical-center">
          <div class="col-lg-6 col-md-0"></div>
          <div class="col-lg-6 col-md-6">
            <img
              src="../assets/eTuro_banner.png"
              class="main-banner img-fluid d-inline-block text-center"
            />
            <h1 class="slogan">Reforming online learning.</h1>
          </div>
          <div class="col-lg-0 col-md-6"></div>
        </div>
      </div>
    </section>
    <section id="p2_landing" class="position-relative d-flex">
      <div class="container">
        <section class="row">
          <div v-for="index in 5" :key="index" class="col-4 card p-5 shadow">
            <header>
              <h1>Hello from the home page</h1>
            </header>
            <article>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, quas
                aliquid eveniet vero voluptatum velit reiciendis eius, deleniti labore
                repudiandae excepturi aliquam quod modi perspiciatis delectus
                consequatur, voluptas adipisci sed?
              </p>
            </article>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
  #p1_landing::before {
    background-image: url("../assets/person_laptop.jpg");
    background-size: cover;
    background-attachment: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 580px;
    content: "";
    position: absolute;
  }
  #p1_landing {
    height: 580px;
  }
  .vertical-center {
    align-items: center;
  }
  .slogan{
    color:white;
  }
  @media (min-width: 992px) {
    .slogan{color:black;}
    .main-banner{}
    #p1_landing {
      height: 680px;
    }#p1_landing::before {
      height: 680px;
    }
  }
  #p2_landing{
    background: var(--eturo-main-neg6);
  }
</style>