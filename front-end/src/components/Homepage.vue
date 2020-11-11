<template>
    <div  style="margin-top: 56px;">
        <!-- <div class="container"> -->

<!-- </div> -->

  <div id="top-container">
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class="d-block w-100" src="/src/assets/My Post.png" alt="First slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="/src/assets/post3.png" alt="Second slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="/src/assets/post2.png" alt="Third slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="/src/assets/post4.png" alt="Fourth slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="/src/assets/carousel5.png" alt="Fifth slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="/src/assets/carousel6.png" alt="Sixth slide">
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
  </div>
  <div id="categories-container" style="backgroundImage: url('/src/assets/categories-container.png'); background-size:cover;">
    <h1>Browse By Categories..</h1>
    <div id="multi-item-example" class="carousel slide carousel-multi-item" data-ride="carousel">
  <div class="carousel-inner" role="listbox">
    <div class="carousel-item active">
            <div class= "row">
      <div class="col-sm-4 ">
        <div class="card mb-2 mx-auto ">
          <router-link to="/items?category=covid essentials"><img class="card-img-top" height="250" width="150" src="/src/assets/covid-essentials.jpg" alt="Card image cap"></router-link>
          <div class="card-body">
            <h3 class="card-text">Covid Essential</h3>
          </div>
        </div>
      </div>

      <div class="col-sm-4">
        <div class="card mb-2 mx-auto">
          <router-link to="/items?category=electronics"><img class="card-img-top" height="250" width="150" src="/src/assets/electronics.jpg" alt="Card image cap"></router-link>
            <div class="card-body">
            <h3 class="card-text">Electronics</h3>
            </div>
        </div>
      </div>

      <div class="col-sm-4">
        <div class="card mb-2 mx-auto">
          <router-link to="/items?category=health care"><img class="card-img-top" height="250" width="150" src="/src/assets/first-aid.jpg" alt="Card image cap"></router-link>
            <div class="card-body">
            <h3 class="card-text">Health Care</h3>
            </div>
        </div>
      </div>
    </div>

    </div>

    <div class="carousel-item">
            <div class= "row">
        <div class="col-sm-4">
          <div class="card mb-2 mx-auto">
            <router-link to="/items?category=food essentials"><img class="card-img-top" height="250" width="150" src="/src/assets/food.jpg" alt="Card image cap"></router-link>
            <div class="card-body">
              <h3 class="card-text">Food Essentials</h3>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mb-2 mx-auto">
            <router-link to="/items?category=grooming and beauty"><img class="card-img-top" height="250" width="150" src="/src/assets/grooming.jpg" alt="Card image cap"></router-link>
            <div class="card-body">
              <h3 class="card-text">Grooming and Beauty</h3>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card mb-2 mx-auto">
            <router-link to="/items?category=stationery"><img class="card-img-top" height="250" width="150" src="/src/assets/stationary.jpg" alt="Card image cap"></router-link>
            <div class="card-body">
              <h3 class="card-text">Stationery</h3>
            </div>
          </div>
        </div>
        </div>


    </div>

  </div>

  <a class="carousel-control-prev" href="#multi-item-example" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#multi-item-example" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
      </div>
  </div>
  <div id="mid-container">
    <div class="row">
    <div class="col-md-4">
        <i class="fas fa-user-shield fa-5x mid-icons"></i>
        <h3>User Protection</h3>
    </div>
    <div class="col-md-4">
      <i class="fas fa-truck fa-5x mid-icons"></i>
      <h3>Faster Delivery</h3>
    </div>
    <div class="col-md-4">
      <i class="fas fa-exchange-alt fa-5x mid-icons"></i>
      <h3>Easy Returns</h3>
    </div>
    </div>
    <h2>And Much More ..</h2>
  </div>

<!-- 3rd SECTION -->
<div class="shop-now">
  <router-link to="/items">
    <img class="diya" src="/src/assets/diyas.jpg" alt="">
  </router-link>
</div>

<footer class="end-section" id="footer">
  <div class="container-fluid">
    <a class="s" href="https://www.facebook.com/">  <i class="social-icon fab fa-facebook-f"></i></a>
    <a class="s" href="https://mobile.twitter.com/login">  <i class="social-icon fab fa-twitter"></i></a>
    <a class="s" href="https://www.instagram.com/"><i class="social-icon fab fa-instagram"></i></a>
    <a class="s" href="https://mail.google.com/mail/u/0/"><i class="social-icon fas fa-envelope"></i></a>




    <p class="Team">Toll-Free No 1800 XXXXXX</p>
    <p class="Team">© Copyright 2020 GOODIFIE</p>
   <img src="/src/assets/technomancers.png" style="width:300px; flex:left;" alt="">
   
  </div>
</footer>
    </div>
</template>

<script>
export default {

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
  width: 50px;
  height: 60px;
}
#navbarDropdown{
  text-align: left;
}
#brandlogo
{
  width:15%;
  height: 15%;
}

#top-container
{
  margin-top: 2%;
  /* background: rgb(234,44,98);
  background: linear-gradient(40deg, rgba(234,44,98,1) 0%, rgba(245,180,97,1) 50%, rgba(252,248,118,1) 100%); */
  padding:0 0 6%;

}
#categories-container{
  padding: 1% auto 3%;
  display: block;
  text-align: center;

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
  margin-bottom: 2%;
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
  opacity: 0.7;
}
.mid-icons:hover{
   color:#ff9a8c;
}
.card-deck{
  text-align: center;
  padding: 2% 3%;
  margin: 2% 3%;
}
.card {
  background-color: #ffd5cd;
  width: 20rem;
}
.col-sm-4
{
text-align: center;
}
.row{
  text-align: center;
}
.card:hover{
  opacity: 0.7;
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
.Team{
  font-size: 15px;
}
</style>
