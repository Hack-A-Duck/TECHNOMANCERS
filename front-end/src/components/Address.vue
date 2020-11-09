<template>
    <app-loader v-if="show"></app-loader>
    <div v-else style="margin-top: 56px;">
        <app-alert :msg="alertMsg" :alertType="alertType" v-if="showAlert" class="alert_1"></app-alert>
            <p><center>Bag ------- <b id="head">Address</b> ------- Payment</center></p>

    <div id="address-container" style="margin: auto">

        <form class="address" @submit.prevent="orderHandler">
            <h3>CONTACT DETAILS</h3>
            <input type="text" name="name" class="form" id="name" placeholder="Name*" v-model="formData.name" required><br>
            <input type="tel" name="mobile" class="form" id="mobile" placeholder="Mobile No.*" v-model="formData.number" required><br>
            <h3>ADDRESS</h3>
            <input type="text" id="pin-code" name="pin-code" class="form" pattern="[0-9]{6}" title="Pin Code" placeholder="Pin Code*" v-model="formData.pincode" required><br>
            <input type="text" name="address" class="form" id="address" placeholder="Address (House No,Building,Street,Area)" v-model="formData.address" required><br>
            <input type="text" name="city" class="form" id="city" placeholder="City/District*" v-model="formData.city" required>
            <input type="text" name="state" class="form" id="state" placeholder="State" v-model="formData.state" required><br>
            <button id="add" type="submit">{{buttonName}}</button>
        </form>

        <div class="price-details">
             <h3>Price Details</h3>
            <div class="price-left">
                <p>Total MRP : </p>
                <p>Discount on MRP : </p>
                <p><b>Total Amount : </b></p>
                <p><b>Payment Mode : </b></p>
            </div> 
            <div class="price-right">
                <p>&#8377; {{calculatePrice.toFixed(2)}}</p>
                <p>- <em class="off">&#8377; {{discountPrice.toFixed(2)}}</em></p>
                <p><b>&#8377; {{finalPrice.toFixed(2)}}</b></p>
                <p><b>Cash on Delivery</b></p>
            </div>  
        </div>
        <p style="color: red;margin-left: 10px">* This site is under construction. Online Payment is not available right now.</p>
    </div>
    </div>
</template>

<script>
import appLoader from "./Loader.vue"
import appAlert from "./Alert"
export default {
    components: {
        appLoader,
        appAlert
    },
    data(){
        return {
            show: true,
            cartItem: [],
            alertMsg: "",
            alertType: "",
            showAlert: false,
            formData: {
                name: "",
                number: "",
                pincode: "",
                address: "",
                city: "",
                state: ""
            },
            buttonName: "CONFIRM ORDER"
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
            if(resData.data.length===0){
                this.$router.push("/");
            }
            else{
                this.cartItem= resData.data;
                this.show=false;
            }
        }
        
    },
    methods: {
        async orderHandler(){
            this.buttonName = "CONFIRMING";
            const orders = this.cartItem.map((el)=>{
                return {
                    product_id: el.product_id,
                    address: this.formData.address,
                    pincode: this.formData.pincode,
                    city: this.formData.city + this.formData.state
                }
            })
            console.log(orders);
            try {
                const res = await fetch(`https://goodifie.herokuapp.com/api/v1/orders`, {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({orders}),
                    credentials: "include"  
                });
                const resData = await res.json();
                if(resData.status==="success"){
                    this.buttonName= "CONFIRM ORDER";
                    this.alertMsg= "Your order has been confirmed !";
                    this.alertType= "success";
                    this.showAlert=true;
                    setTimeout(()=>{
                        this.showAlert= false;
                        this.$router.push("/orders");
                    },3000)
                }
                else{
                    this.buttonName= "CONFIRM ORDER";
                    this.alertMsg= "Something went wrong!";
                    this.alertType= "danger";
                    this.showAlert=true;
                    setTimeout(()=>{
                        this.showAlert= false;
                    },3000)
                }
            } catch (error) {
                this.buttonName= "CONFIRM ORDER";
                this.alertMsg= "Something went wrong!";
                this.alertType= "danger";
                this.showAlert=true;
                setTimeout(()=>{
                    this.showAlert= false;
                },3000)
            }
        }
    }
}
</script>

<style scoped>
    #address-container{
    margin: auto;
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    /* border: 1px solid rgb(197, 193, 193); */
}

.form{
    width: 50%;
    margin-bottom: 8px;
    padding: 10px;
    outline: none;
    border: 2px solid rgb(197, 193, 193);
    border-radius: 5px;
    background-color: rgb(247, 247, 247);
}

#city,#state{
    width: 25%;
}

#add{
    font-size: 20px;
    width: 53%;
    padding: 10px;
    outline: none;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    display: block;
    /* font-weight: bold; */
    color:white;
    background-color: rgb(231, 114, 114);
    float: center;
    border: 2px solid rgb(218, 156, 156);
    border-radius: 8px;
}

#add:hover{
    background-color: rgb(253, 180, 180);    
}

.address{
    width: 60%;
    text-align: center;
    border: 1px solid grey;
    margin: 10px;
    /* border-top-left-radius: 50px;
    border-bottom-left-radius: 50px; */
    background-image: linear-gradient(to right, rgb(175, 175, 175) , white);
}

.price-details{
    width: 30%;
    /*text-align: center;*/
    border: 1px solid grey;
    margin: 10px;
    padding: 10px;
    /* border-top-right-radius: 50px;
    border-bottom-right-radius: 50px; */
    background-image: linear-gradient(to left, rgb(175, 175, 175) , white);
}

.price-left{
    float: left;
}

.price-right{
    float: right;
}

.off{
    color: red;
}

a{
    text-decoration: none;
    color: blue;
}

#head{
    color: rgb(15, 175, 15);
    border-bottom: 2px solid green;
}

@media(max-width: 800px)
{
    .address,.price-details{
        width: 100%;
    }

}
</style>

