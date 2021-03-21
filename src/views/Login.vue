<template>
<div class="wrapper">
<div class="splashscreendiv mt-5">
      <img
        class="img-fluid mx-auto d-block splash-logo"
        src="./../assets/logo.svg"
        alt="logo"
      />      
    </div>
      <div class="d-flex flex-column h-100 ">
    <div class="container-fluid pt-5">
      <div class="row justify-content-center form-align">
        <div class="col-4">
          <form @submit.prevent="login" id="login-form">
            <div class="form-group mb-4">
              <label>User Name</label>
              <b-form-input type="text"
              placeholder="Username"
              name="email"
              id="email"
              v-model="form.email"></b-form-input>
            </div>

            <div class="form-group mb-5">
              <label>Password</label>
              <b-form-input
              type="password"
              placeholder="Password"
              name="password"
              id="pass"
              v-model="form.password"></b-form-input>
            </div>

            <div class="mt">
                <b-button block variant="primary" type="submit" :disabled="isProcessing">Login</b-button>
            </div>

            <small
              class="error__control"
              v-if="Object.keys(error).length !== 0"
              >{{ error }}</small
            >
            <br />
          </form>
        </div>
      </div>
    </div>
  </div>

    <FlashMessage position="right bottom" class="flashmessage"></FlashMessage>
</div>
</template>
<script type="text/javascript">
import Auth from "../assets/store/auth";
import { get, post } from "../assets/helpers/api";
import Status from "../assets/helpers/status";
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: {},
      isProcessing: false,
      res_message: '',
      auth: null,
      status: null
    };
  },
  created() {
    if (Auth.state.api_token !== "" && Auth.state.api_token !== null) {
      //alert('if values are not null');
      this.$router.push({ path: "/sendmail" });
    } else {
      Auth.set("", "", "");
      //alert('if values are null then redirect login');
      this.$router.push({ path: "/login" });
    }
    if (Auth.state.error) {
      //alert('if values are null then redirect third');
      this.error = Auth.state.error.includes("+")
        ? Auth.state.error.replace(/\+/gi, " ")
        : Auth.state.error;
    }
  },
  computed: {},
  methods: {
    login() {
      this.isProcessing = true;
      this.error = {};
      post("/api/login", this.form)
        .then(response => {
          if (response.data.user.authenticated) {
            Auth.set(
              response.data.user.api_token,
              response.data.user.user_id
            );
            Status.setSuccess("You have successfully logged in!");
            this.auth = Auth;
            this.status = Status;
            setTimeout(
              function() {
                this.$router.push({ path: "/sendmail" });
              }.bind(this),
              2000
            );
          }
          this.isProcessing = false;
        })
        .catch(err => {
         this.isProcessing = false;

          if (err.response.data.error) {
            // console.log("inside here error");
            //if(err.response.data.error){
            //this.error = err.response.data.errors;

            this.flashMessage.error({
              title: "Error",
              message: err.response.data.error,
              time: 5000,
              flashMessageStyle: {
                backgroundColor: "linear-gradient(#e66465, #9198e5)"
              }
            });
          }
           if (err.response.data.error) {
            // console.log("inside here errors");

            //console.log(typeof err.response.data.errors.email);
            if(typeof err.response.data.error.email !== "undefined"){
                if(err.response.data.error.email[0] !== ""){
                  this.res_message = err.response.data.error.email[0];
                }
            }
            if(typeof err.response.data.error.password !== "undefined"){
                if(err.response.data.error.password[0] !== ''){
                  this.res_message = err.response.data.error.password[0];
                }
            }
            if(typeof err.response.data.error.email !== "undefined" && typeof err.response.data.error.password !== "undefined"){
                if(err.response.data.error.email[0] !== '' && err.response.data.error.password[0] !== ''){
                  this.res_message = "Email and password fields are required";
                }
            }

            this.flashMessage.error({
              title: "Error",
              message: (this.res_message !== '') ? this.res_message : err.response.data.error,
              time: 5000,
              flashMessageStyle: {
                backgroundColor: "linear-gradient(#e66465, #9198e5)"
              }
            });
          }
          this.isProcessing = false;
          // this.form = "";
        });
    },
            onCancel() {
              console.log('User cancelled the loader.')
            }
  }
};
</script>

<style>
.marginedclass {
  margin-top: 100px !important;
}
.navbar {
  display: none;
}
.cursors {
  cursor: pointer;
}
</style>
