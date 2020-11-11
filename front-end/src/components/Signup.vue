<template>
    <div class="signup_container" style="backgroundImage: url('/src/assets/background.png');margin-top: 56px">
    <app-alert :msg="alertMsg" :alertType="alertType" v-if="showAlert"></app-alert>
        <h1 class="h1">SIGN UP</h1>
    <form class="center signup_form" @submit.prevent="signupHandler()">

        <div>
            <label for="name" class="h5">FULL NAME</label>
            <input type="text" name="first" placeholder="Name" v-model="formData.name" required>
        </div>

        <div id="email">
            <label for="Email" class="h5">E-MAIL ID</label>
            <input type="email" name="Email" v-model="formData.email" required><br>
        </div>

        <div id="num">
            <label for="num" class="h5">PHONE NUMBER</label>
            <input type="tel" name="num" v-model="formData.number" required>
        </div>

        <div id="pass">
            <label for="Password" class="h5">PASSWORD</label>
            <input type="password" name="Password" v-model="formData.password" required><br>
        </div>

        <div id="cpass">
            <label for="cPassword" class="h5">CONFIRM PASSWORD</label>
            <input type="password" name="cPassword" v-model="formData.confirmPassword" required><br>
        </div>

        <div id="rem">
            <input type="checkbox" name="rem">
            <label for="rem">Remember Me !</label>
        </div>

        <div>
            <p class="p">By creating an account you agree to our <a href="">Terms & Privacy</a></p>
        </div>

        <button id="login" type="submit">SIGN UP</button>
    </form>
    </div>
</template>

<script>
import appAlert from "./Alert";
export default {
    data(){
        return {
            formData: {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                number: ""
            },
            alertMsg: "",
            alertType: "",
            showAlert: false
        }
    },
    components: {
        appAlert
    },
    methods: {
        async signupHandler(){
            try {
                const res = await fetch("https://goodifie.herokuapp.com/api/v1/users/signup", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(this.formData)
                });
                const resData = await res.json();
                if(resData.status==="success"){
                    this.alertMsg= "successfully signed up";
                    this.alertType= "success";
                    this.showAlert=true;
                    setTimeout(()=>{
                        this.$router.push({name: "login"});
                    },3000)
                }
                else{
                    this.alertMsg= resData.message;
                    this.alertType= "danger";
                    this.showAlert=true;
                    setTimeout(()=>{
                        this.showAlert=false;
                    },3000)
                }
            } catch (error) {
                this.alertMsg= "something went wrong";
                    this.alertType= "danger";
                    this.showAlert=true;
                    setTimeout(()=>{
                        this.showAlert=false;
                    },3000)
            }

        }
    }
}
</script>

<style scoped>
.signup_form{
    width: 40%;
    margin: auto;
}

@media screen and (max-width: 768px){
    .signup_form{
        width: 95%;
    }
}

.signup_container{
    /* width: 100%; */
    margin: auto;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    color: #4c4c4c;
    padding: 15px;
    /* background-image: url(background.png); */
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed
}
h1 {
    font-size: 32px;
    font-weight: 300;
    color: #4c4c4c;
    text-align: center;
    padding-top: 10px;
    margin-bottom: 10px;
  }
  input[type=text],input[type=email],input[type=tel], input[type=password] {
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
  }

  input[type=text]:focus,input[type=email]:focus,input[type=tel]:focus, input[type=password]:focus {
    background-color: #ddd;
    outline: none;
  }
  button {
    background-color: #3dc4ce;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
  }

  button:hover {
    opacity:1;
    background-color: #50c493;

  }

  #rem{
      text-align: center;
  }
</style>
