<template>
<div style="text-align: center;margin-top: 56px">
    <app-alert :msg="alertMsg" :alertType="alertType" v-if="showAlert"></app-alert>
    <div class="container-fluid">
            <div class="top"></div>
            <div class="bottom"></div>
            <div class="center">
            <h2>Please Sign In</h2>
            <form @submit.prevent="loginHandler">
                <input type="email" placeholder="Email" required v-model="email"/>
                <input type="password" placeholder="Password" required v-model="password"/>
                <input type="submit" value="Login">
            </form>
            <div style="text-align: center">
                <router-link to="/signup">SIGN UP</router-link>
            </div>
            <h2>&nbsp;</h2>
            </div>
        </div>
        </div>
</template>

<script>
import appAlert from "./Alert";
export default {
    data(){
        return {
            email: "",
            password: "",
            alertMsg: "",
            alertType: "",
            showAlert: false
        }
    },
    components: {
        appAlert
    },
    methods: {
        async loginHandler(){
            try {
                const resData = await fetch("https://goodifie.herokuapp.com/api/v1/users/signin", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({email: this.email, password: this.password}),
                    credentials: "include"
                });
                const data =await resData.json();
                if(data.status==="success"){
                    this.$store.commit("saveUser",data.data);
                    this.alertMsg= "successfully logged in";
                    this.alertType= "success";
                    this.showAlert=true;
                    setTimeout(()=>{
                        this.$router.push({name: "home"});
                    },3000)
                }
                else{
                    this.alertMsg= "invalid email or password!";
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
.container-fluid {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.container-fluid:hover .top:before, .container-fluid:hover .top:after, .container-fluid:hover .bottom:before, .container-fluid:hover .bottom:after, .container-fluid:active .top:before, .container-fluid:active .top:after, .container-fluid:active .bottom:before, .container-fluid:active .bottom:after {
  margin-left: 200px;
  transform-origin: -200px 50%;
  transition-delay: 0s;
}
.container-fluid:hover .center, .container-fluid:active .center {
  opacity: 1;
  transition-delay: 0.2s;
}
.top:before, .top:after, .bottom:before, .bottom:after {
  content: '';
  display: block;
  position: absolute;
  width: 200vmax;
  height: 200vmax;
  top: 50%;
  left: 50%;
  margin-top: -100vmax;
  transform-origin: 0 50%;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
  z-index: 10;
  opacity: 0.65;
  transition-delay: 0.2s;
}
.top:before {
  transform: rotate(45deg);
  background: #e46569;
}
.top:after {
  transform: rotate(135deg);
  background: #ecaf81;
}
.bottom:before {
  transform: rotate(-45deg);
  background: #60b8d4;
}
.bottom:after {
  transform: rotate(-135deg);
  background: #3745b5;
}
.center {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
  transition-delay: 0s;
  color: #333;
}
.center input {
  width: 100%;
  padding: 15px;
  margin: 5px;
  border-radius: 1px;
  border: 1px solid #ccc;
  font-family: inherit;
}
input[type=submit] {
    background-color: #3dc4ce;
    color: white;
    cursor: pointer;
  }
  input[type=submit]:hover {
    background-color: #50c493;
  }
  
</style>