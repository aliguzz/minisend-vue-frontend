<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col><h1>Projects</h1></b-col>
      <b-col
        ><button class="btn btn-primary" v-b-modal.modal1>
          new project
        </button></b-col
      >
    </b-row>
    <div class="row" v-for="pro in projects" :key="pro.id">
      <div class="col col-sm-2"></div>
      <div class="col col-sm-8">
        <b-list-group>
          <b-list-group-item
            ><a :href="'/pages/' + pro.id + '/' + pro.name">
              {{ pro.name }}</a
            ></b-list-group-item
          >
        </b-list-group>
      </div>
      <div class="col col-sm-2"></div>
    </div>

    <div>
      <!-- Modal Component -->
      <b-modal
        id="modal1"
        title="New Project"
        ref="modal"
        @ok="handleOk"
        @shown="clearName"
      >
        <form @submit.stop.prevent="handleSubmit">
          <b-form-input
            type="text"
            placeholder="Project Name"
            v-model="name"
          ></b-form-input>
        </form>
      </b-modal>
    </div>
    <BlockUI :message="msg" v-if="showLoader"></BlockUI>
  </b-container>
</template>

<script>
const axios = require("axios");
export default {
  name: "projects",
  data() {
    return {
      projects: "",
      name: "",
      authenticated: true,
      showLoader: false,
      msg: "Please wait..."
    };
  },
  mounted() {
    this.$emit("authenticated", true);
    this.showLoader = true;
    let token = localStorage.getItem("token");
    let formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_id"));
    axios
      .post(
        "https://adeo-spark.adeogroup.co.uk/api/project/show_project_by_user_id",
        formData,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + token
          }
        }
      )
      .then(response => (this.projects = response.data.projects.original))
      .then(response => (this.showLoader = false));
  },
  methods: {
    clearName() {
      this.name = "";
    },
    handleOk(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (!this.name) {
        alert("Please enter project name");
      } else {
        this.handleSubmit();
      }
    },
    handleSubmit() {
      this.showLoader = true;
      let token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append("user_id", localStorage.getItem("user_id"));
      formData.append("name", this.name);
      axios
        .post(
          "https://adeo-spark.adeogroup.co.uk/api/project/create",
          formData,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
              Authorization: "Bearer " + token
            }
          }
        )
        .then(response => (this.projects = response.data.projects.original))
        .then(response => (this.showLoader = false));
      this.clearName();
      this.$refs.modal.hide();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
i {
  color: #fff;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
