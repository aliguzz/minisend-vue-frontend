<template >
  <div class="wrapper">
    <FlashMessage :position="'bottom right'" :y="100" class="flashmessage"></FlashMessage>
      <div class="content-container">
        <div class="">
          <div class="container-fluid flex-grow-0 bg-gradient p-4 mb-5">
            <div class="row">
              <div class="col-6">
                <h5>Send Email</h5>
                <p class="mb-0">Please fill this form to send email to the user</p>                
              </div>
              <i class="fas fa-envelope toplinks"></i>
              <div class="col-2">
                
                <router-link class="nav-link toplinks" to="/sendmail">
                  
                  <span class="text">Send E-Mails</span>
                </router-link>
              </div>
              <i class="fas fa-search icon toplinks"></i>
              <div class="col-2">
                <router-link class="nav-link toplinks" to="/search">
                  
                  <span class="text">Search Mails</span>
                </router-link>
              </div>
              <div class="col-2">
                
              </div>
            </div>
          </div>
          <div class="container-fluid flex-grow-1">
          <div class="row">
            <div class="col-2">
              </div>
            <div class="col-8">
              <div>
                <b-form @reset="onReset" v-if="show">
                  <b-form-group
                    id="input-group-1"
                    label="From(Sender)"
                    label-for="input-1"
                    description="We'll never share your email with anyone else."
                  >
                    <b-form-input
                      id="from"
                      v-model="form.senderemail"
                      type="email"
                      placeholder="Enter email"
                      required
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="input-group-2"
                    label="To(Recepient)"
                    label-for="input-2"
                    description="We'll never share your email with anyone else."
                  >
                    <b-form-input
                      id="input-2"
                      v-model="form.recepientemail"
                      type="email"
                      placeholder="Enter email"
                      required
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group id="input-group-3" label="Subject" label-for="input-3">
                    <b-form-input
                      id="input-3"
                      v-model="form.subject"
                      placeholder="Enter Subject"
                      required
                    ></b-form-input>
                  </b-form-group>

            <b-form-group id="input-group-4" label="Text Content" label-for="input-4">
                <b-form-textarea
                  id="textcontent"
                  v-model="form.textContent"
                  placeholder="Enter something..."
                  rows="6"      
                ></b-form-textarea>   
            </b-form-group>


            <b-form-group id="input-group-5" label="HTML Content" label-for="input-5">
                <vue-editor
                  v-model="form.htmlContent"
                  placeholder="Enter HTML"            
                ></vue-editor>  
            </b-form-group>


            <b-form-group id="input-group-6" label="Multiple Attachments" label-for="input-6">
                  <b-form-file type="file" id="files" ref="files" multiple class="mt-3" v-on:change="handleFilesUpload" plain></b-form-file>    
            </b-form-group>

                  <b-button type="send" variant="primary" v-on:click="onSubmit">Send</b-button>&nbsp;
                  <b-button type="reset" variant="danger">Reset</b-button>
                </b-form>    
              </div>
            </div>
          </div>
        </div>
      </div>
  <!-- Bottom Navigation -->
  <ul class="nav nav-bottom fixed-bottom nav-pills nav-justified">
    <li class="nav-item">
      <router-link class="nav-link" to="/search">
        <i class="fas fa-search icon"></i>
        <span class="text">Search Mails</span>
      </router-link>
    </li>
    
    <li class="nav-item">
      <a class="nav-link" data-toggle="modal" data-target="#logoutModal" href="#logoutModal">
        <i class="fas fa-sign-out-alt icon"></i>
      <span class="text">Logout</span>
      </a>
    </li>
  </ul>
  <!-- /Bottom Navigation End -->
  </div>
  <!-- Modal Logout -->
    <div class="modal fade" id="logoutModal" tabindex="-1" ref="logoutmodal" role="dialog" aria-labelledby="logoutModalLabel" aria-hidden="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <h5 class="modal-title" id="logoutModalLabel">Log Out</h5>
            <p>You are logging out of Sendmini.</p>
            <div class="form">
              <div class="form-group">
                <div class="row justify-content-center">
                  <div class="col-11">
                    <button type="button" class="btn btn-block btn-primary" @click.stop="logout" data-dismiss="modal">Log Out</button>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row justify-content-center">
                  <div class="col-11">
                    <button type="button" class="btn btn-block btn-secondary" data-dismiss="modal">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Modal Logout -->
  </div>
</template>
<script type="text/javascript">
import Auth from "../assets/store/auth";
import { get, post } from "../assets/helpers/api";
import { VueEditor } from "vue2-editor";
var today = new Date();
const expiration = new Date(today.getFullYear(), (today.getMonth()), today.getDate() + 1);
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      form: {
          senderemail: '',
          recepientemail: '',
          subject: '',
          textContent: '',
          htmlContent: '',
          files: []          
        },        
        show: true
    };
  },
  methods: {

    handleFilesUpload(e){
        let current = this
        let files = e.target.files;
        for( var i = 0; i < files.length; i++ ){
          let file = files[i];
          let reader = new FileReader()
          reader.onloadend = function() {
            current.form.files[current.form.files.length] = reader.result;
          };
          reader.readAsDataURL(file);
        }
      },    
    onSubmit(event) {
      this.isProcessing = true;
      event.preventDefault(); 
      let formData = new FormData();              
      console.log(this.form);
      post("/api/sendandsubmitmail", this.form)
        .then(response => {
          
            this.flashMessage.success({
              title: "Hurrah",
              message: 'Email Sent Successfully',
              time: 5000,             
            });
          
          this.isProcessing = false;            
          alert("Email Sent Successfully");
            this.senderemail= '',
            this.recepientemail= '',
            this.subject= '',
            this.textContent= '',
            this.htmlContent= '',
            this.attachment= []  

            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
            this.show = true
            })
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
    onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.senderemail= '',
        this.recepientemail= '',
        this.subject= '',
        this.textContent= '',
        this.htmlContent= '',
        this.attachment= []  
        
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      logout() {
        console.log("button clicked")
      $("[data-dismiss=modal]").trigger({ type: "click" });
      Auth.set("", "", "");
      //this.$refs['logoutmodal'].modal('hide');
      $("[data-dismiss=modal]").trigger({ type: "click" });
      get("/api/logout")
        .then(response => {
          if (response.data.logged_out) {
            Auth.set("", "", "");
            Auth.remove();
            this.$router.push({ path: "/login" });
          }
        })
        .catch(err => {
          Auth.set("", "", "");
          Auth.remove();
          this.$router.push({ path: "/login" });
        });
    },
  }
};
</script>

<style scoped>
html,
body {
    overflow: hidden;
    position: relative;
    height: 100%;
}
.list-group-item{
  width: 100%;

}
.svg-inline--fa{
  float: right;
  margin-top: 0.2rem;
  font-size: 1.6rem  !important;
}
.content-container {
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
  }

  .event-list{
    font-size: 20px;
  }
  .toplinks{
    color:#fff;
  }
  .flashmessage{
    z-index:111111111;
  }
</style>
