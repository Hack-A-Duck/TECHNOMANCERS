<template>
  <div :class="'d-flex justify-content-'+alignLoader+' mb-5'" style="margin-top: 106px">
    <b-spinner :style="'width: '+size+ 'rem; height:'+ size+ 'rem'" label="Large Spinner"></b-spinner>
  </div>
</template>

<script>
export default {
    props: {
        alignLoader: {
            type: String,
            default: "center"
        },
        size: {
            type: Number,
            default: 5
        }
    }
}
</script>
