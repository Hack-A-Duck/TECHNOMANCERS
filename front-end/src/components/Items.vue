<template>
    <app-loader v-if="show"></app-loader>
    <div id="itemList" v-else  style="margin-top: 56px;">
        <app-alert :msg="alertMsg" :alertType="alertType" v-if="showAlert" class="alert_1"></app-alert>
        <div class="items" v-for="item in items" :key="item.id">
            <img :src="item.cover_image" alt="" @click="openDetails(item.id)">
            <h4>{{item.name}}</h4>
            <p style="text-align: center"><b>&#8377; {{item.price - ((item.price*item.discount)/100)}}</b>&nbsp; <s>&#8377; {{item.price}}</s> ( <em class="off">{{item.discount}}% OFF</em> )</p>
            <div class="AddToBag">
                <button style="border: none;background-color: inherit;" @click="addToCart($event, item.id)">{{user.id?"ADD TO CART":"SIGNIN TO BUY"}}</button>
            </div>
        </div>
    </div>
</template>

<script>
import appLoader from "./Loader.vue"
import appAlert from "./Alert"
export default {
    data(){
        return {
            show: true,
            items: [],
            alertMsg: "",
            alertType: "",
            showAlert: false,
            buttonName: "ADD TO CART"
        }
    },
    components: {
        appLoader,
        appAlert
    },
    computed: {
        user(){
            return this.$store.getters.getUser;
        }
    },
    async mounted(){
        try {
            let url= "https://goodifie.herokuapp.com/api/v1/products";
            if(this.$route.query.category)
                url = url + `?category=${this.$route.query.category}`;
            const res =await fetch(url);
            const resData = await res.json();
            this.show= false;
            console.log(resData.data);
            this.items = resData.data;
        } catch (error) {
            
        }
            
        

    },
    methods: {
        openDetails(id){
            this.$router.push(`/itemdesc?id=${id}`);
        },
        async addToCart(e, id){
            if(!this.user.id)
                this.$router.push("/login");
            else{
                try {
                    // this.buttonName="ADDING...";
                    e.target.textContent = "ADDING...";
                    const res = await fetch(`https://goodifie.herokuapp.com/api/v1/cart`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({product_id: id}),
                        credentials: "include"
                    })
                    const resData = await res.json();
                    if(resData.status === "success"){
                        e.target.textContent = "ADD TO CART";
                        this.alertMsg= "Added To Cart";
                        this.alertType= "success";
                        this.showAlert=true;
                        setTimeout(()=>{
                            this.showAlert= false;
                        },3000)
                    }
                    else{
                        // this.buttonName = "ADD TO CART";
                        e.target.textContent = "ADD TO CART";
                        this.alertMsg= resData.message;
                        this.alertType= "danger";
                        this.showAlert=true;
                        setTimeout(()=>{
                            this.showAlert= false;
                        },3000)
                    }
                } catch (error) {
                    // this.buttonName = "ADD TO CART";
                    e.target.textContent = "ADD TO CART";
                    this.alertMsg= resData.message;
                    this.alertType= "danger";
                    this.showAlert=true;
                    setTimeout(()=>{
                        this.showAlert= false;
                    },3000)
                }
            }
        }

    }
}
</script>

<style scoped>
.alert_1{
    z-index: 200;
}
#itemList{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            /* border: 1px solid rgb(182, 171, 171); */
            background-color: pink;
            padding: 5px;    
        }

        .items{
            background-color: white;
            padding: 5px;
            border: 1px solid rgb(182, 171, 171);
            margin: 5px;
            /* min-width: 24%; */
        }

        .items h4{
			font-size: 24px;
			font-weight: bold;
			text-align: center;
			text-transform: capitalize;
			margin-bottom:  0px;
			margin-top: 5px;
		}

        .items img{
            opacity: 0.85;
            width: 100%;
            height: 200px;
        }

        .items img:hover{
            opacity: 1;
        }

        a:hover{
            color: rgb(7, 170, 89);
        }

        .AddToBag{
            text-align: center;
            background-color:rgb(211, 211, 211);
            padding: 5px;
        }
        .AddToBag a {
            color: black;
        }
        button:focus{
            outline: none;
        }
</style>