<template>
  <div class="d-flex flex-column justify-content-center h-100 splashMain">
    <div class="splashscreendiv">
      <img
        class="img-fluid mx-auto d-block splash-logo"
        src="./../assets/logo.svg"
        alt="logo"
      />
      <!-- <div class="loader-box">
      <img
        class="img-fluid mx-auto d-block loader"
        src="./../assets/images/splash-screen/team-icon.svg"
        alt="logo"
      />
      </div> -->
      <!-- <img
        class="img-fluid mx-auto d-block adeo-logo"
        src="./../assets/images/splash-screen/adeo-ffs.png"
        alt="logo"
      /> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      display: "none"
    };
  },
  created() {
    localStorage.removeItem("site_settings");
    setTimeout(
      function() {
       this.$router.push({ path: "/login" });
      }.bind(this),
      3000
    );
  }
};
</script>

<style scoped>
.navbar {
  display: none;
}
.splash-logo{
  width: 300px;
}
</style>
