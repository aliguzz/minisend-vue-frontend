export default {
  state: {
    api_token: null,
    user_id: null,
    error: null,
    redirect: null
  },
  initialize(cookie) {
    if (cookie) {
      var cookie = JSON.parse(cookie);
      this.state.api_token = cookie.api_token;
      this.state.user_id = cookie.user_id;
      //this.state.site_settings = cookie.site_settings;
      this.set(cookie.api_token, cookie.user_id);
      this.state.error = cookie.error;
      this.state.redirect = cookie.redirect;
    } else {
      this.state.api_token = localStorage.getItem("api_token");
      this.state.user_id = parseInt(localStorage.getItem("user_id"));
      //this.state.site_settings = localStorage.getItem("site_settings");
    }
  },
  set(api_token, user_id) {
    localStorage.setItem("api_token", api_token);
    localStorage.setItem("user_id", user_id);
    //localStorage.setItem("site_settings", JSON.stringify(site_settings));
    this.initialize();
  },
  remove() {
    localStorage.removeItem("api_token");
    localStorage.removeItem("user_id");
    //localStorage.removeItem("site_settings");
    this.initialize();
  }
};
