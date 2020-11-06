<template>
    <p
      class="alert"
      :class="'alert-'+alertType"
      style="position:fixed;left:50%;top:100px;transform:translateX(-50%)"
      key="success"
    >{{msg}}</p>

</template>

<script>
export default {
    props: ["alertType","msg"]
}
</script>
