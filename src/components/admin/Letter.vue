<template>
  <div class="center">
    <form autocomplete="off">
      <h3>Send letter</h3>
      <div class="input-field col">
        <em class="fas fa-align-justify"></em>
        <label for="title" class="active">Title</label>
        <textarea id="title" class="form-control form-control-lg title" type="text" v-model="letter.title" ></textarea>
      </div>
      <div class="input-field col">
        <em class="fas fa-keyboard"></em>
        <label for="text" class="active">Text</label>
        <textarea id="text" class="form-control form-control-lg text" style="white-space: pre-line;" type="text" v-model="letter.text"></textarea>
      </div>
      <div id="controller">
        <button v-on:click="sendLetter" type="button" id="send" class="btn btn-primary btn-lg">
          Send<i class="fas fa-pencil-alt right"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Link from "../navigation/Link";
import axios from "axios";
import Vue from "vue";
import VueToast from "vue-toast-notification";

export default {
  name: "Letter",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      letter: {
        type: Object,
      }
    };
  },

  methods: {
    sendLetter() {
      this.letter.email = this.user.email;
      const concat = this.user.firstName.concat(' ', this.user.lastName);
      console.log(concat);
      this.letter.userName = this.user.firstName.concat(' ', this.user.lastName);
      const headers = Link.methods.getHeaders();
      new Promise((resolve) => {
        axios.post(Link.methods.getSendEmail(), this.letter, {headers})
            .then(() => {
              this.createToast("Email sent")
              resolve();
            });
      })
    },
    createToast(msg) {
      Vue.use(VueToast);
      Vue.$toast.open({
        type: "success",
        message: msg,
        position: "bottom-right",
        duration: 5000
      });
    }
  }

}
</script>

<style scoped lang="scss">

textarea.title {
  max-height: 735px;;
  max-width: 885px;
}

textarea.text {
  min-height: 135px;
  max-height: 735px;
  //min-width: 870px;
  max-width: 1770px;
}

.center {
  margin: auto;
  width: 100%
}

</style>