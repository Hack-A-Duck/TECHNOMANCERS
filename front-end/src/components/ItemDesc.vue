<template>
    <div style="margin-top: 70px;">
        <app-loader v-if="show"></app-loader>
        <template v-else>
        <app-alert :msg="alertMsg" :alertType="alertType" v-if="showAlert" class="alert_1"></app-alert>
        <div id="product">
		<div id="itemImage">
		     <img :src="itemDetail.cover_image">		
	    </div>
	    <div id="description">
		     <p id="itemName">{{itemDetail.name}}</p>
		     <p id="itemPrice"><b>&#8377; {{itemDetail.price - ((itemDetail.price*itemDetail.discount)/100)}}</b>&nbsp; <s>&#8377; {{itemDetail.price}}</s> ( <em class="off">{{itemDetail.discount}}% OFF</em> )</p>
		     <p id="itemDescription">{{ itemDetail.description}}</p>
		     <button style="border: none;" id="cart" @click="addToCart($event, itemDetail.id)">{{user.id?buttonName:"SIGNIN TO BUY"}}</button>		
	    </div>
	</div>
	<hr>
	<h3>Some Related suggestions of products:</h3>
	<div id="suggestion" >
		<div class="items" v-for="item in similarItems" :key="item.id">
            <img :src="item.cover_image" alt="" @click="openDetails(item.id)">
            <h4>{{item.name}}</h4>
            <p><b>&#8377; {{item.price - ((item.price*item.discount)/100)}}</b>&nbsp; <s>&#8377; {{item.price}}</s> ( <em class="off">{{item.discount}}% OFF</em> )</p>
            <div class="AddToBag">
                <button style="border: none;background-color: inherit;" @click="addToCart($event, item.id)">{{user.id?"ADD TO BAG":"SIGNIN TO BUY"}}</button>
            </div>
        </div>
	</div>
    </template>
    </div>
</template>

<script>
import appLoader from "./Loader.vue"
import appAlert from "./Alert"
export default {
    data(){
        return{
            itemDetail: {},
            similarItems: [],
            show: true,
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
        id(){
            return this.$route.query.id;
        },
        user(){
            return this.$store.getters.getUser;
        }
    },
    async mounted(){
        await this.getItemDetails();
    },
    methods: {
        async getItemDetails(){
            const res = await fetch(`https://goodifie.herokuapp.com/api/v1/products/${this.id}`);
            const resData = await res.json();
            this.itemDetail = resData.data;
            this.similarItems= resData.data.similarItems;
            console.log(resData);
            this.show= false;
        },
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
    },
    watch: {
        $route(to, from){
            this.show= true;
            this.getItemDetails();
        }
    }
}
</script>

<style scoped>
#product{
			width: 100%;
			margin: 0px;
			padding: 10px;
		}
		#itemImage{
			display: inline-block;
			width: 35%;
		}
		#itemImage img{
			width: 90%;
			margin: auto;
			height: 350px;
			border-style: solid;
			border-radius: 15px;
			border-width: 1px;
			border-color: white;
		}
		#description{
			display: inline-block;
			width: 60%;
			margin: auto;
		}
		#itemName{
			font-size: 24px;
			text-transform: capitalize;
			font-weight: bold;
		}
		#itemPrice{
			font-size: 18px;
			text-transform: capitalize;
			font-weight: bold;
		}
		#itemDescription{
			font-size: 16px;
			text-transform: capitalize;
		}
		#cart{
			display: block;
            width: 30%;
            /* font-weight: bold; */
            color:white;
            font-size: 18px;
            background-color: rgb(231, 114, 114);
            float: center;
            margin: 5px;
            padding: 5px;
            outline: none;
            border: 2px solid rgb(218, 156, 156);
            border-radius: 8px;
		}
		#suggestion{
			display: flex;
	        flex-wrap: wrap;
	        justify-content: space-around;
	        background-color: pink;
            padding: 5px;     
		}
		#suggestion .items{
            background-color: white;
            padding: 5px;
            border: 1px solid rgb(182, 171, 171);
            margin: 5px;
            width: 18%;
        }

        #suggestion .items h4{
			font-size: 24px;
			font-weight: bold;
			text-align: center;
			text-transform: capitalize;
			margin-bottom:  0px;
			margin-top: 5px;
		}

        #suggestion .items img{
            opacity: 0.85;
            width: 100%;
            height: 200px;
        }

        #suggestion .items img:hover{
            opacity: 1;
        }

        a:hover{
            color: rgb(7, 170, 89);
        }

        #suggestion .AddToBag{
            text-align: center;
            background-color:rgb(211, 211, 211);
            padding: 5px;
        }
        #suggestion .AddToBag a {
            color: black;
        }
		@media(max-width: 700px)
		{
			#itemImage{
				display: block;
				width: 100%;
			}
			#description{
				display: block;
				width: 100%;
			}
		}
</style>