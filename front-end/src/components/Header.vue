<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top" style="position: fixed">
  <div class="container-fluid">
      <div class="col-6">
        <router-link to="/">
          <img id="brandlogo" src="/src/assets/logo2.png" alt="logo">
          GOODIFIE
        </router-link>
      </div>

      <button class="navbar-toggler nav-fill ml-auto navbar-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>


  </div>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">

     <ul class="navbar-nav navbar-right">

       <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
          Profile</a>
          <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
            <router-link to="/account" v-if="user.id">
              <img id="profile" src="/src/assets/profile.jpg" alt=""> {{user.name.split(" ")[0]}}
            </router-link>
            <button v-if="user.id" class="nav-link" @click="logout()" style="background-color: inherit; border: none">Logout</button>
            <template v-else>
                <router-link to="/signup" class="nav-link" ><i class="fas fa-user"></i> Sign Up</router-link>
                <router-link to="/login" class="nav-link"><i class="fas fa-sign-in-alt"></i> Login</router-link>
            </template>
        </div>
      </li>
       <li class="nav-item" v-if="user.id">
         <router-link to="/orders" class="nav-link">Orders</router-link>
       </li>
       <li class="nav-item" v-if="user.id">
         <router-link to="/checkout" class="nav-link">Cart</router-link>
       </li>
       <!-- <li class="nav-item">
         <router-link to="/orders" class="nav-link">Contact</router-link>
       </li> -->
</ul>
   </div>
  </nav>
</template>
<script>
export default {
    computed: {
        user(){
            return this.$store.getters.getUser;
        }
    },
    methods: {
        async logout(){
            const resData = await fetch("https://goodifie.herokuapp.com/api/v1/users/logout", {credentials: "include"});
            location.reload("/");
        }
    }
}
</script>

<style scoped>
    .navbar
{
  position: relative;
}
.container{
  padding-left: 0;
  margin-left: 0;
  padding-right: 0;
  margin-right: 0;
  padding-bottom: 2%;
}
.nav-item{
  text-align: left;
  float: left;
}
#profile
{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
#navbarDropdown{
  text-align: left;
}

#brandlogo
{
  width:30px;
  height: 28px;
}

#top-container
{
  margin-top: 2%;
  /* background: rgb(234,44,98);
  background: linear-gradient(40deg, rgba(234,44,98,1) 0%, rgba(245,180,97,1) 50%, rgba(252,248,118,1) 100%); */
  padding:0 0 6%;

}
#categories-container{
  padding: 1% 0 3%;
}
#footer{
  padding: 5% 10%;
  text-align: center;
}
.social-icon{
  padding: 2% 1%;
}
.col-4{
  float: left;
  padding: 3% 3%;
}
h1{
  text-align: center;
  font-family: 'Pacifico', cursive;
}
.mid-icons
{
  color: #ea2c62;
  padding:5% 5%;
}
#mid-container{
  padding: 5% 5%;
  text-align: center;
}
h3 {
padding-top: 2%;
font-size: 20px;
}
h2 {
  padding-top: 3%;
  text-align: center;
    font-family: 'Pacifico', cursive;
}
p {
  font-size: 15px;
}
.d-block{
  /* height: 25rem; */
}

.diya{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
}
.diya:hover{
  opacity: 90%;
}
.mid-icons:hover{
   color:#ff9a8c;
}
.card-deck{
  padding: 2% 3%;
  margin: 2% 3%;
}
.card {
  background-color: #ffd5cd;
}
.card:hover{
  opacity: 75%;
  box-shadow: 5px 5px 5px grey;
}
.social-icon{
color:#555555;
}
.social-icon:hover{
   color:#ea2c62;
}
.s{
  text-decoration: none;
  cursor: default;
}
a:hover{
    text-decoration: none;
    }
a{
    color: white;
}
</style>
