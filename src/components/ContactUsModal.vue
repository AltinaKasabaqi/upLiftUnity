<template>
    <div>
      <NavBar @hap-modal="hapModalinEkomponentitTeFoto"></NavBar>
      <ContactUsModal v-model="modalVisible"></ContactUsModal>
      <BannerT></BannerT>
      <PageFooter></PageFooter>
    </div>
  </template>
  
  <script>
  import NavBar from '../components/nav.vue';
  import ContactUsModal from '../components/ContactUsModal.vue';
  import BannerT from '../components/banner.vue';
  import PageFooter from '../components/footer.vue';
  
  export default {
    name: 'ContactUs',
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