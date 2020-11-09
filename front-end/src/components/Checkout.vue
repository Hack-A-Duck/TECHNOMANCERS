<template>
    <app-loader v-if="show"></app-loader>
    <div v-else  style="margin-top: 60px;">
        <app-alert :msg="alertMsg" :alertType="alertType" v-if="showAlert" class="alert_1"></app-alert>
        <div class="header">
        <div></div>
        <p> <b id="bag">Bag</b> ------- Address ------- Payment</p>
        <img class="head_image" src="/src/assets/secure.jpg" alt="">
    </div>
    <h1 v-if="cartItem.length==0" style="text-align: center">No Items in the cart.</h1>
    <div class="center" v-if="cartItem.length!=0">
        <div class="left">
            <h3>My Shopping Bag</h3>
            <div id="left-center" v-for="item in cartItem" :key="item.id">
                <div>
                <img :src="item.cover_image" alt="" height="200px" width="200px" id="left-center-material">
                </div>

                <div id="left-center-right">
                    <h4>{{item.name}}</h4>
                    <p><b>&#8377; {{item.price - ((item.price*item.discount)/100)}}</b>&nbsp; <s>&#8377; {{item.price}}</s> ( <em class="off">{{item.discount}}% OFF</em> )</p>
                    <div class="remove-add">
                        <button style="border: none;background-color: inherit;color: blue" @click="deleteItem($event, item.id)">DELETE ITEM</button>|
                        <router-link :to="'/itemdesc?id='+item.id">VIEW DETAILS</router-link>
                    </div>                    
                </div>
            </div>
        </div>

        <div class="right" style="max-height: 250px">
            <h3>Price Details</h3>
            <div class="price-detail-left">
                <p>Total MRP : </p>
                <p>Discount on MRP : </p>
                <p><b>Total Amount : </b></p>
            </div>
            <div class="price-detail-right">
                <p>&#8377; {{calculatePrice.toFixed(2)}}</p>
                <p>- <em class="off">&#8377; {{discountPrice.toFixed(2)}}</em></p>
                <p><b>&#8377; {{finalPrice.toFixed(2)}}</b></p>
            </div>
            <div><button id="place-order" @click="goToAddAddress">PLACE ORDER</button></div>
        </div>
    </div>
    </div>
</template>
<script>
import appLoader from "./Loader";
import appAlert from "./Alert"
export default {

    data(){
        return {
            show: true,
            cartItem: [],
            alertMsg: "",
            alertType: "",
            showAlert: false,
        }
    },
    computed: {
        user(){
            return this.$store.getters.getUser;
        },
        calculatePrice(){
            let totalPrice = 0 ;
            this.cartItem.forEach(el => {
                totalPrice+= el.price;
            });
            return totalPrice;
        },
        discountPrice(){
            let discountPrice = 0;
            this.cartItem.forEach(el => {
                discountPrice+= el.price*(el.discount/100);
            });
            return discountPrice;
        },
        finalPrice(){
            return this.calculatePrice - this.discountPrice;
        }

    },
    async mounted() {
        if(!this.user.id)
            this.$router.push("/");
        else{
            const res = await fetch(`https://goodifie.herokuapp.com/api/v1/cart/${this.user.id}`, {credentials: "include"});
            const resData = await res.json();
            console.log(resData);
            this.cartItem= resData.data;
            this.show=false;
        }
        
    },
    components: {
        appLoader,
        appAlert
    },
    methods: {
        async deleteItem(e, id){
            try {
                e.target.textContent = "DELETING";

                const res = await fetch(`https://goodifie.herokuapp.com/api/v1/cart/${id}`,{
                    method: "DELETE",
                    credentials: "include"
                })
                const resData = await res.json();
                if(resData.status==="success"){
                    e.target.textContent = "DELETE ITEM";
                    let index = this.cartItem.findIndex(el=>el.id == id);
                    this.cartItem.splice(index, 1);
                    this.alertMsg= "Item Deleted...";
                    this.alertType= "success";
                    this.showAlert=true;
                    setTimeout(()=>{
                        this.showAlert= false;
                    },3000)
                }
                else{
                    e.target.textContent = "DELETE ITEM";
                    this.alertMsg= "Something went wrong!";
                    this.alertType= "success";
                    this.showAlert=true;
                    setTimeout(()=>{
                        this.showAlert= false;
                    },3000)
                }
            } catch (error) {
                e.target.textContent = "DELETE ITEM";
                    this.alertMsg= "Something went wrong!";
                    this.alertType= "success";
                    this.showAlert=true;
                    setTimeout(()=>{
                        this.showAlert= false;
                    },3000)
                    console.log(error);
            }
        },
        goToAddAddress(){
            this.$router.push("/add_address");
        }
    }
}
</script>

<style scoped>
body{
    margin: 15px;
}

.header{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.center{
    margin-top: 10px;
}

.head_image{
    height: 50px;
    width: 50px;
}

#bag{
    color: rgb(15, 175, 15);
    border-bottom: 2px solid green;
}

.left{
    width: 60%;
    border: 2px solid grey;
    margin: 5px;
    padding: 10px;
}

.right{
    width: 30%;
    border: 2px solid grey;
    margin: 5px;
    padding: 10px;
}

@media(max-width: 800px)
{
    .left,.right{
        width: 100%;
    }

}

.center,#left-center{
    display: flex;
    flex-wrap: wrap;
}

.price-detail-left{
    float: left;
}

.price-detail-right{
    float: right;
}

#left-center-material,#left-center-right{
    padding: 10px;
}

.off{
    color: red;
}

a{
    text-decoration: none;
    color: blue;
}

.remove-add{
    /* font-size: 18px;     */
    border: 1px solid rgb(182, 171, 171);
    background-color: rgb(231, 220, 220);
    /* padding: 1px; */
    padding-left: 10px;
    padding-right: 10px;
}

#place-order{
    display: block;
    width: 60%;
    /* font-weight: bold; */
    color:white;
    font-size: 18px;
    background-color: rgb(231, 114, 114);
    float: right;
    margin: 5px;
    padding: 5px;
    outline: none;
    border: 2px solid rgb(218, 156, 156);
    border-radius: 8px;
}

#footer-gallery{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    /* border: 1px solid rgb(182, 171, 171); */
    background-color: pink;
    padding: 5px;    
}

.gallery-items{
    background-color: white;
    padding: 5px;
    border: 1px solid rgb(182, 171, 171);
    margin: 5px;
}

.gallery-items img{
    opacity: 0.85;
}

.gallery-items img:hover{
    opacity: 1;
}

a:hover{
    color: rgb(7, 170, 89);
}

#footer{
    display: flex;
    justify-content: center;
    /* border: 1px solid rgb(182, 171, 171); */
    margin-top: 20px;
    padding: 3px;
}

.AddToBag{
    text-align: center;
    background-color:rgb(211, 211, 211);
    padding: 5px;
}
.AddToBag a {
    color: black;
}
</style>