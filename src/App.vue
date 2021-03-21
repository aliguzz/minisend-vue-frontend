<template>
  <div id="app">
    <!-- <span v-if="checkAuthStatus" class="logoutbtn" @click.stop="logout">Logout</span> -->

    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
import Auth from "./assets/store/auth";
import { get, post } from "./assets/helpers/api";
export default {
  created() {
      Auth.initialize(this.$cookie.get("authentication"));
    this.$cookie.delete("authentication");
    document.cookie = 'authentication' + '=' + // NO value here
    ';path=' + '/' +
    ';domain=' + '.natovapp.com' +
    ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
    console.log(Auth.state);
    if (Auth.state.redirect) {
      this.$router.push(Auth.state.redirect);
    }
  },
  data() {
    return {
      auth: Auth.state
    };
  },
  computed: {
    checkAuthStatus() {
      if (this.auth.api_token && this.auth.user_id) {
        return true;
      }
      return false;
    }
  },
  methods: {
    logout() {
      //Auth.set('','','');
      get("/api/logout").then(
        response => {
          if (response.data.logged_out) {
            Auth.set("", "");
            Auth.remove();
            this.$router.push({ path: "/login" });
          }
        }
      );
    }
  }
};
</script>

<style>
.logoutbtn {
  position: absolute;
  float: right;
  top: 20px;
  color: #fff;
  /* border: 2px solid red; */
  width: 50px;
  right: 20px;
  cursor: pointer;
  font-size: 17px;
}
body{
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
  }
</style>
