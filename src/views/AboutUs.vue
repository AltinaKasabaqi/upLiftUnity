<template>
    <NavBar></NavBar>
    <div class="container">
        <div class="content">
            <div class="uplift-unity">
                <div class="uplift-text">
                    <h2 class="subtitle">UpLift Unity</h2>
                    <p>Në përpjekje për të adresuar një nga sfidat më të rëndësishme shoqërore të Kosovës,</p> 
                    <p>u themelua "UpLift Unity", një linjë telefonike ndihmëse që synon parandalimin</p>  
                    <p>e vetëvrasjeve dhe ofrimin e mbështetjes për komunitetin.</p>    
                    <p>Me një ekip të trajnuar dhe të përkushtuar, ky projekt është krijuar në bashkëpunim </p>   
                    <p>me partnerët lokalë dhe ndërkombëtarë, duke përdorur teknologjinë dhe praktikat më të mira </p>   
                    <p>për të siguruar një shërbim cilësor dhe efektiv.</p>
                </div>
                <div class="image-section">
                    <img src="../assets/image-4.webp" alt="Image">
                </div>
            </div>
            <div class="mission-section">
                <div class="mission-image">
                    <img src="../assets/image-3.webp" alt="Mission Image">
                </div>
                <div class="mission-text">
                    <h2 class="subtitle">Misioni Ynë</h2>
                    <p>Në qendër të misionit tonë është një synim i thellë për të sjellë ndryshime të rëndësishme dhe</p>
                    <p>për të ofruar ndihmë të nevojshme për ata që përballen me sfida dhe vështirësi në rrugën e tyre.</p>   
                    <p>Ne besojmë në fuqinë e bashkëpunimit dhe solidaritetit ndaj njëri-tjetrit,</p>
                    <p>duke e krijuar një mjedis ku çdo zë ka vlerë dhe çdo problem ka zgjidhje.</p>
                </div>
            </div>
            <div class="leadership-section">
                <div class="leadership-text">
                    <h2 class="subtitle">Ekipi i Udheheqjes</h2>
                    <p>Ekipi ynë i udhëheqjes është një grup vullnetarësh të profesionalizuar në fushën e psikologjisë,</p> 
                    <p>të cilët janë të përkushtuar ndaj qëllimit për të ndihmuar individë që përballen me vështirësi </p>
                    <p>dhe sfida në jetën e tyre.</p>     
                    <p> Me një përvojë të thellë dhe njohuri të specializuara, ata kombinojnë aftësitë e tyre për të ofruar </p>
                    <p>një mbështetje cilësore dhe të përshtatshme për nevojat e klientëve tanë. </p>    
                    <p>Me një angazhim të palëkundur dhe një përkushtim të vërtetë ndaj mirëqenies së tyre,</p>    
                    <p>ekipi ynë punon me pasion për të siguruar ndihmë dhe mbështetje në çdo hap të rrugës së tyre</p>    
                    <p>drejt shëndetit dhe lumturisë së tyre emocionale.</p>   
                </div>
                <div class="leadership-image">
                    <img src="../assets/download.jpg" alt="Leadership Image" width="400px">
                </div>
            </div>
            <div class="additional-section">
                <div class="additional-text">
                    <h2 class="subtitle">Ne Jemi Këtu Për Ju</h2>
                    <!-- <p>Këtu mund të shkruani paragrafin shtesë sipas nevojës tuaj.</p> -->
                </div>
                <div class="additional-image">
                    <img src="../assets/kosovo-map.gif" alt="Additional Image" width="300px">
                </div>
            </div>
        </div>
    </div>
    <PageFooter></PageFooter>
</template>

<script>
import NavBar from '../components/nav.vue';
import PageFooter from '../components/footer.vue';

export default {
    name: 'HomePage',
    components: {
        NavBar,
        PageFooter,
    },
}
</script>

<style scoped>
.container {
    font-family: 'Times New Roman';
}

.content {
    display: flex;
    flex-direction: column; 
}

.uplift-unity {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
}

.uplift-text {
    flex: 1;
    margin-right: 20px;
}

.image-section, .mission-image, .additional-image, .leadership-image {
    flex: 1;
    text-align: right; 
}

.mission-section, .additional-section, .leadership-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
}

.mission-image, .additional-image {
    margin-right: 20px;
}

.mission-text {
    margin-right: 80px;
}

.additional-section {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.leadership-text {
    flex: 1;
    margin-right: 20px;
}

.title, .subtitle {
    color: rgb(0, 0, 0);
}

.intro-section, .mission-section, .additional-section, .leadership-section {
    font-family: 'Times New Roman', Times, serif;
    margin-bottom: 20px;
}

/* Stili për fotografine e UpLift Unity */
.image-section img {
    max-width: 100%;
    height: auto;
}

/* Stili për fotografitë e misionit */
.mission-image img {
    max-width: 90%;
    height: auto;
    margin-right: 60px;
}

/* Stili për fotografitë e ekipit të udhëheqjes */
.leadership-image img {
    max-width: 100%;
    height: auto;
    margin-right: 50px;
}

/* Stili për Gif-in */
.additional-image img {
    max-width: 600%;
    height: auto;
    margin-left: 30px;
}
</style>
