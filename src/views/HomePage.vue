<template>
    <NavBar @hap-modal="hapModalinEkomponentitTeFoto"></NavBar>
    <ContactUsModal @hapModal="modalVisible = true"></ContactUsModal>
    <BannerT></BannerT>
    <PageFooter></PageFooter>
</template>
<script>
import NavBar from '../components/nav.vue';
import BannerT from '../components/banner.vue';
import PageFooter from '../components/footer.vue';
import ContactUsModal from '../components/ContactUsModal.vue';

export default {
  name: 'HomePage',
  components: {
    NavBar,
    ContactUsModal,
    BannerT,
    PageFooter,
  },
  data() {
    return {
      modalVisible: false
    };
  },
  methods: {
    hapModalinEkomponentitTeFoto() {
      // Logjika për modalin e fotove
    }
  }
}

</script>