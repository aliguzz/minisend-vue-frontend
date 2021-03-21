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

          </div>

      <div class="row mt-5">
        <div class="col-12">
          <table class="table">
            <thead class="thead-dark">
              <tr>
              <th scope="col" style="text-align: left; width: 10rem;">
                 Item
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                  Detail
              </th>              
               
              </tr>
            </thead>
            <tbody slot="body">
              <tr>
                <td scope="row">From</td>                
                <td scope="row">{{ this.items.from }}</td>                                
              </tr>
              <tr>
                <td scope="row">To</td>                
                <td scope="row">{{ this.items.to }}</td>                                
              </tr>
              <tr>
                <td scope="row">Sent At(time)</td>                
                <td scope="row">{{ this.items.created_at }}</td>                                
              </tr>
              <tr>
                <td scope="row">Attachments</td>                
                <td scope="row">{{ this.items.file }}</td>                                
              </tr>
              <tr>
                <td scope="row">Text Content</td>                
                <td scope="row">{{ this.items.textContent }}</td>                                
              </tr>
              <tr>
                <td scope="row">HTML Content</td>                
                <td scope="row" >{{ this.items.htmlContent }}</td>                                
              </tr>
              <tr>
                <td scope="row">Status</td>                
                <td scope="row" v-if="this.items.status== 1">Sent</td>                                
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
        name: this.$route.params.mail_id        
      },
        items: [],
        fields: ['Item', 'Value'],       
        show: true
    };
  },
  created() {
    get("/api/getemaildetail/"+this.$route.params.mail_id)
        .then(response => {
          if (response.data) {  
            this.items =  response.data.mail_detail;      
            console.log(response.data.mail_detail.htmlContent);                                       
          }
          this.isProcessing = false;          
        })
        .catch(err => {
         this.isProcessing = false;

        });

  },
  methods: {
    
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
