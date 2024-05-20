<template>
    <NavBar></NavBar>
    <div class="container">
        <div class="content">
                <div class="uplift-unity">
                    <div class="uplift-text">
                     <h2 class="subtitle">UpLift Unity</h2>
                        <p>Në përpjekje për të adresuar një nga sfidat më të rëndësishme shoqërore në botë,</p> 
                        <p>u themelua "UpLift Unity", një linjë telefonike ndihmëse që synon parandalimin</p>  
                        <p>e vetëvrasjeve dhe ofrimin e mbështetjes për komunitetin.</p>    
                        <p>Me një ekip të trajnuar dhe të përkushtuar, ky projekt është krijuar në bashkëpunim </p>   
                        <p>me partnerët lokalë dhe ndërkombëtarë, duke përdorur teknologjinë dhe praktikat më  </p>   
                        <p>të mira për të siguruar një shërbim cilësor dhe efektiv.</p>
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
                    <p>Ekipi ynë i udhëheqjes është një grup vullnetarësh të profesionalizuar në fushën </p> 
                    <p>e psikologjisë, të cilët janë të përkushtuar ndaj qëllimit për të ndihmuar individë </p>
                    <p> që përballen me vështirësi dhe sfida në jetën e tyre.</p>     
                    <p>Me një përvojë të thellë dhe njohuri të specializuara, ata kombinojnë aftësitë e tyre  </p>
                    <p> për të ofruar një mbështetje cilësore dhe të përshtatshme për nevojat e klientëve tanë. </p>    
                    <p>Me një angazhim të palëkundur dhe një përkushtim të vërtetë ndaj mirëqenies, ekipi ynë </p>    
                    <p>punon me pasion për të siguruar ndihmë dhe mbështetje në çdo hap të rrugës së</p>    
                    <p>tyre, drejt shëndetit dhe lumturisë së tyre emocionale.</p>   
                </div>
                <div class="leadership-image">
                    <img src="../assets/download.jpg" alt="Leadership Image" width="70%">
                </div>
            </div>
            <div class="map-section">
                <div class="map-text">
                    <h2 class="subtitle">Ne Jemi Këtu Për Ju</h2>
                    <!-- <p>Këtu mund të shkruani paragrafin shtesë sipas nevojës tuaj.</p> -->
                </div>
                <div class="map-image">
                    <img src="../assets/MapAnimation.gif" alt="Map Image">
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
    margin-top:5%;
}

.uplift-unity {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
}

.uplift-text {
    flex: 1;
    margin-left: 5%;
    color: rgb(128, 123, 123);
}

.image-section, .mission-image, .map-image, .leadership-image {
    flex: 1;
    text-align: right; 
}

.mission-section, .map-section, .leadership-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    color: rgb(128, 123, 123);
}

.mission-image {
    margin-left: 5%;
}

.map-image {
    margin-right: 30%;
}

.mission-text {
    margin-right: 80px;
    color: rgb(128, 123, 123);
}

.map-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 7%;
}

.leadership-text {
    flex: 1;
    margin-left: 5%;
    margin-top: 5%;
    color: rgb(128, 123, 123,)
}

.title, .subtitle {
    color: rgb(128, 123, 123);
}

.intro-section, .mission-section, .map-section, .leadership-section {
    font-family: 'Times New Roman', Times, serif;
    margin-bottom: 20px;
}

.image-section img {
    max-width: 100%;
    height: auto;
}

.mission-image img {
    max-width: 90%;
    height: auto;
    margin-right: 30%;
}

.leadership-image img {
    max-width: 100%;
    height: auto;
    margin-right: 15%;
    margin-top: 18%;
}

.map-image img {
    max-width: 50%;
    height: auto;
    margin-right: 3%;
}
</style>
