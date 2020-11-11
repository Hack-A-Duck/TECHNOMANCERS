<template>
    <div style="text-align: center;margin-top: 56px" v-if="user.id">

        <div class="container-1">            
            <h1>MY PROFILE</h1>
            <img src="/src/assets/profile_icon.jpg" height="110px" width="105px"><br>
		    <p id="name">{{user.name}}</p>
		    <p id="mobile">{{user.number}}</p>
		    <p id="email">{{user.email}}</p><br>
		    <button @click="$router.push('/orders')">MY ORDERS</button>
		    <button @click="$router.push('/checkout')">MY CART</button>
            <h2>&nbsp;</h2>
        </div>

    </div>
</template>

<script>
export default {
    computed: {
        user(){
            return this.$store.getters.getUser;
        }
    },
    created(){
        if(!this.user.id){
            this.$router.back();
        }
    }
}
</script>

<style scoped>
h1{
            /* text-decoration: underline; */
            margin-bottom: 35px;
            border-bottom: 2px solid rgb(99, 99, 99);
            border-radius: 15px;
            /* box-shadow: 0 5px rgb(204, 204, 204); */
            box-shadow: 0 5px rgb(226, 226, 226);
            
        }
        .container-1{
            text-align : center;
            /* border: 1px solid grey; */
            display: inline-block;
            padding: 50px;
            margin: auto;
        }

        #name{
            font-size: 26px;
            font-weight: bold;
            /* text-decoration: underline; */
            text-transform: capitalize;
            border-bottom: 1px solid grey;
            border-left: 3px solid grey;
            border-radius: 8px;
        }

        #mobile , #email{
            font-size: 22px;
            border-bottom: 1px solid grey;
            border-left: 3px solid grey;
            border-radius: 8px;
        }

        button{
            font-size: 18px;
            padding: 5px;
            background-color: rgb(255, 206, 222);
            outline: none;
            border-radius: 7px;            
            margin: 10px;
        }

        button:hover{
            background-color: rgb(240, 152, 192);
        }
</style>