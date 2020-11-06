<template>
    <app-loader v-if="show"></app-loader>
    <div id="itemList" v-else>
        <div class="items" v-for="item in items" :key="item.id">
            <img :src="item.cover_image" alt="" @click="openDetails(item.id)">
            <h4>{{item.name}}</h4>
            <p><b>&#8377; {{item.price - ((item.price*item.discount)/100)}}</b>&nbsp; <s>&#8377; {{item.price}}</s> ( <em class="off">{{item.discount}}% OFF</em> )</p>
            <div class="AddToBag">
                <a href="">ADD TO BAG</a>
            </div>
        </div>
    </div>
</template>

<script>
import appLoader from "./Loader.vue"
export default {
    data(){
        return {
            show: true,
            items: []
        }
    },
    components: {
        appLoader
    },
    async mounted(){
        try {
            const res =await fetch("https://goodifie.herokuapp.com/api/v1/products");
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
        }
    }
}
</script>

<style scoped>
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
            width: 24%;
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
</style>