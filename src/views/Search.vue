<template >
  <div class="wrapper">
    <FlashMessage class="flashmessage"></FlashMessage>
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
                  
                  <span class="text">Search</span>
                </router-link>
              </div>
              <div class="col-2">
                
              </div>
            </div>
          </div>
          <div class="container-fluid flex-grow-1">
          <div class="row">
            
            <div class="col-12">
              

              <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <div class="col-8">      

                    
                

                <b-form-group label="Search by" label-for="search by" label-cols-lg="2">
                <b-form-select
                id="search-by"
                v-model="form.searchby"                
                >
                <template>
                <option value="0">-- Select --</option>
                <option value="sender">Sender</option>
                <option value="recepient">Recepient</option>
                <option value="subject">Subject</option>
                </template>
                </b-form-select>
                </b-form-group>

                <b-form-group
                      id="input-group-2"
                      label="Search String"
                      label-for="input-2"
                      description="Enter any string here to search"
                    >
                      <b-form-input
                        id="input-2"
                        v-model="form.searchstring"
                        type="text"
                        placeholder="Search String"
                        required
                      ></b-form-input>
                    </b-form-group>

                
              </div>
              <div class="col-2">
                <b-button type="submit" variant="primary">Search</b-button>                
                </div>
              </b-form>
              
                                            
            </div>




          </div>

<div class="row mt-5">
  <div class="col-12">
    <table class="table">
      <thead class="thead-dark">
        <tr>
        <th scope="col" style="text-align: left; width: 10rem;">
            From
        </th>
        <th scope="col" style="text-align: left; width: 10rem;">
            To
        </th>
        <th scope="col" style="text-align: left; width: 10rem;">
            Subject
        </th>
        <th scope="col" style="text-align: left; width: 10rem;">
            Status
        </th>
        <th scope="col" style="text-align: left; width: 10rem;">
            Action
        </th>
          
        </tr>
      </thead>
      <tbody slot="body">
        <tr v-for="item in items" :key="item.id">
          <td scope="row">{{ item.from }}</td>                
          <td scope="row">{{ item.to }}</td>                
          <td scope="row">{{ item.subject }}</td>                
          <td scope="row"><span class="sent" v-if="item.id!=''">Sent</span></td>
          <td>
            <router-link
              :to="
                '/viewmail/' +                        
                  item.id
              "
            >
              <button>View email</button>
              <img
                class="img-fluid float-right arrow-space"
                src="@/assets/images/leagues/next-arrow.svg"
                alt="next arrow"
              />
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
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

var today = new Date();
const expiration = new Date(today.getFullYear(), (today.getMonth()), today.getDate() + 1);
export default {
  data() {
    return {
      form: {        
          searchby: '',     
          searchstring: ''
        }, 
        items: [],
        fields: ['From', 'To', 'Subject','Status','Action'],       
        show: true
    };
  },
  methods: {
    
    onSubmit(event) {
      event.preventDefault();         
      //alert(JSON.stringify(this.form))    
      //throw new Error();  
      post("/api/searchmails", this.form)
        .then(response => {
          if (response.data) {  
            this.items =  response.data.all_emails;                                 
            this.flashMessage.success({
              title: "Hurrah",
              message: 'Following emails are listed successfully',
              time: 5000,
              flashMessageStyle: {
                backgroundColor: "linear-gradient(#e66465, #9198e5)"
              }
            });
          }
          this.isProcessing = false;
          console.log(response.data);
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
  .sent{
    color:green;
    font-size: 28px;
  }
</style>
