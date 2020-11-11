<template>
<app-loader v-if="show"></app-loader>
    <div v-else style="margin-top: 80px">

        <h2>MY ORDERS</h2>
        <br>
        <h1 v-if="items.length==0" style="text-align: center">No Previous Orders.</h1>

    <div class="order_container" v-for="item in items" :key="item.id">
        <div id="image" class="items">
            <img :src="item.cover_image" alt="" width="230px" height="275px">
        </div>

        <div id="details" class="items">
            <p>Date of Order : <b>{{new Date(item.order_date).toLocaleString("hi-IN",{dateFormat: "full", timeFormat: "full"})}}</b></p>
            <p>Amount Paid : <b>{{item.price - ((item.price*item.discount)/100)}}</b>&nbsp; <s>&#8377; {{item.price}}</s> ( <em class="off">{{item.discount}}% OFF</em> )</p>
            <p>Payment Mode : <b>Cash On Delivery</b></p>
            <p>Address : <b>{{item.address}}</b></p>
            <p>City/State : <b>{{item.city}}</b></p>
            <p>Pin-Code : <b>{{item.pincode}}</b></p>
            <button id="view" @click="goToItems(item.product_id)">VIEW DETAILS</button>

        </div>
    </div>
    </div>
</template>

<script>
import appLoader from "./Loader"
export default {
    data(){
        return {
            show: true,
            items: [],
            alertMsg: "",
            alertType: "",
            showAlert: false
        }
    },
    components: {
        appLoader
    },
    computed: {
        user(){
            return this.$store.getters.getUser;
        }
    },
    async mounted(){
        if(!this.user.id)
            this.$router.push("/");
        else{
            const res = await fetch(`https://goodifie.herokuapp.com/api/v1/orders/your_orders/${this.user.id}`, {credentials: "include"});
            const resData = await res.json();
            this.items= resData.data;
            this.show=false;
        }
    },
    methods: {
        goToItems(id){
            this.$router.push("/itemdesc?id="+id);
        }
    }
}
</script>

<style scoped>


h2{
    text-align: center;
}

.order_container{
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-around; */
    border: 1px solid grey;
    margin: 5px;
}

.items{
    padding: 10px;
}

#view{
    font-size: 18px;
    padding: 5px;
    background-color: rgb(255, 206, 222);
    outline: none;
    border-radius: 7px; 
}

#view:hover{
    background-color: rgb(240, 152, 192);
}
  

  

</style>