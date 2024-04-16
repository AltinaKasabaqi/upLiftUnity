<template>
    <div class="container">
        <div class="left">
            <h1>Këtu për ty</h1>
            <h3>Telefono në: +311 222 345</h3>
            <p>Çfarëdo që të kaloni, UpLift Unity do ta përballojë atë me ju. Ne jemi këtu 24 orë në ditë, 365 ditë në vit.</p>
        </div>
        <img src="../assets/plant.gif">
    </div>
   <div class="bottomContainer">
        <img src="../assets/vpydh7mq.png">
        <p>UpLift Unity është qendër telefonike për parandalim të vetëvrasjes e cila ofron shërbim telefonik konfidencial dhe pa pagesë për të gjithë personat me mendime për vetëvrasje çdo ditë 24h.</p>
   </div>
   <div class="Activities">
    <h1>Aktivitetet </h1>
      <div class="activity-images">
          <img src="../assets/image-4.webp">
          <img src="../assets/p.png">
          <img src="../assets/vpydh7mq.png">
      </div>
    </div>

   <div class="Info">
    <div class="left">
      <img src="../assets/sign.webp" alt="">
    </div>
    <div class="right">
      <p>Kur ndjeheni nën presion ose keni mendime të vështira, jemi këtu për t'ju ndihmuar në çdo kohë. Telefononi në UpLift Unity, një shërbim falas, në numrin +311 222 345. Ne jemi të disponueshëm 24/7, 365 ditë në vit, për t'ju ofruar mbështetje dhe dëgjim.</p>
   </div>
  </div>
</template>

<script>
export default {
  name: 'BannerT'
}
</script>
<style scoped>
.container {
  display: flex;
  align-items: center;
}

.left {
  flex-grow: 1; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center; 
}

.left>h1{
    font-size: 60px;
}

h3{
    color: rgb(53, 53, 53);
   
}
.left>p{
    width: 70%;
    font-size: 14px;
    color: rgb(73, 73, 73);
}
.container> img{
    float: right;
    width:50%;
    border-radius: 10%;
}
.bottomContainer{
    margin: 10% 5%;
    display: flex;
   align-items: center;
   
    
}
.bottomContainer>img{
    width: 40%;
    float: left;
    
    border-radius: 100px;
}

.bottomContainer>p{
    color: rgb(79, 79, 79);
    font-size: 25px;
}
.Activities>h1{
    color: rgb(79, 79, 79);
}
.Activities {
  text-align: center; /* Vendos titullin në qendër */
}

.activity-images {
  display: flex;
  justify-content: center; /* Vendos elementet në qendër horizontalisht */
  align-items: center;
  flex-wrap: wrap; /* Përdor wrap për të bërë elementet të zbrastë (nëse ka më shumë se një rresht) */
}

.activity-images img {
  width: 30%;
  padding: 3%;
  margin: 0; /* Fshij marginin që mund të ketë ndonjëherë në dispozicion */
}

.activity-images img:hover {
  filter: brightness(50%);
}


.Info {
  display: flex;
  align-items: center;
  margin: 10% 15%;
}

.left {
  flex-shrink: 0; /* Mos lejo foto-n të zgjerohet përtej madhësisë së saj origjinale */
  margin-right: 5%; /* Rregullo distancën midis fotos dhe tekstit */
}

.right {
  flex-grow: 1;
  width: 100%; /* Vendos paragrafin të zënë gjithë hapësirën e disponueshme */
  margin-top: 0; /* Fshij marginin e sipërm që mund të ketë paragrafi */
  font-size: 20px;
}

.Info>img {
  width: 30%;
  
}
</style>