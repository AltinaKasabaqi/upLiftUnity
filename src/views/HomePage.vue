<template>
    <NavBar></NavBar>
    <BannerT></BannerT>
    <PageFooter></PageFooter>
</template>
<script>
import NavBar from '../components/nav.vue';
import BannerT from '../components/banner.vue';
import PageFooter from '../components/footer.vue';


export default {
  name: 'HomePage',
  components: {
    NavBar,
    BannerT,
    PageFooter,
  },
  
}

</script>
<style scoped>
body{
  background-color: rgb(253, 250, 245);
}
</style>