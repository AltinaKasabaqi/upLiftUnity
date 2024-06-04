<template>
  <div>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Na Kontakto</h2>
          <router-link to="/"><button @click="closeModal">X</button></router-link>
        </div>
        <div class="modal-content">
          <div class="company-info">
            <div class="contact-info">
              <div class="contact-item">
                <img src="@/assets/Call.icon.jpg" alt="Ikona e telefonit" class="phone-icon">
                <span>Telefono: +311 222 345</span>
              </div>
              <div class="contact-item">
                <img src="@/assets/email.icon.jpg" alt="Ikona e emailit" class="email-icon">
                <span>Email: UpLiftUnity@outlook.com</span>
              </div>
            </div>
            <p>Ne do të dëshironim të dëgjonim nga ju</p>
          </div>
          

          <div class="rating-system">
            <form @submit.prevent="submitFeedback"  >
            <p>Vlerëso shërbimin tonë:</p>
            <div class="stars">
              <span
                v-for="index in 5"
                :key="index"
                class="star"
                :class="{ active: index <= rating, hover: index <= hoverRating }"
                @click="rate(index)"
                @mouseover="setHover(index)"
                @mouseleave="clearHover"
              >
                &#9733;
              </span>
            </div>
            <div class="feedback-form">
              <p>Na tregoni çfarë mendoni rreth nesh :</p>
              <textarea v-model="suggestion" placeholder="Shkruani këtu..." rows="5"></textarea>
              <button type='submit'>Dërgo</button>
            </div>
          </form>
          </div>
          
          
        </div>
        
      </div>
 
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from '../api/axios.js';

export default {
  data() {
    return {
      showModal: true,
      rating: 0,
      hoverRating: 0,
      suggestion: '',
      formData :{}
    
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    rate(star) {
      this.rating = star;
      console.log(`Rated ${star} stars`);
    },
    setHover(index) {
      this.hoverRating = index;
    },
    clearHover() {
      this.hoverRating = 0;
    },
    async submitFeedback() {
      if (!this.rating || !this.suggestion) {
        await Swal.fire({
          icon: 'error',
          title: 'Gabim',
          text: 'Ju lutem plotësoni të gjitha fushat.'
        });
        return;
      }
      this.formData = {
        rating :this.rating,
        suggestion : this.suggestion
      }
      try {
        const response = await axios.post('http://localhost:5051/api/feedback/AddFeedBack', this.formData);
        if (response && response.status === 200) {
          await Swal.fire({
            icon: 'success',
            title: 'Sukses',
            text: 'Vleresimi u dergua!'
          });
          this.$router.push({ name: 'HomePage' });
        }
      } catch (error) {
        console.error('Gabim në shtimin e vleresimit:', error.response.data);
        if (error.response.status === 409) {
          this.errorMessage = 'Gabime gjatë shtimit te vleresimit: ' + error.response.data;
        } else {
          this.errorMessage = error.response.data;
        }
        await Swal.fire({
          icon: 'error',
          title: 'Gabim',
          text: this.errorMessage || 'Gabim gjatë shtimit te vleresimeve!'
        });
      }
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(235, 246, 238, 0.927);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-container {
  background: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  width: 800px;
  box-shadow: 0px 0px 20px #b8ddbe;}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.modal-header h2 {
  font-size: 200%;
  margin: 0;
  color: #333;
}

.modal-header button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #cb3434;
}

.modal-header button:hover {
  color: #555;
}

.modal-content {
  display: flex;
}

.company-info {
  flex: 1;
  padding-right: 20px;
}

.rating-system {
  flex: 1;
  text-align: center;
 
}

.contact-info {
  font-size: 110%;
  line-height: 1.5;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}

.contact-item img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.company-info img {
  max-width: 50%;
  border-radius: 8px;
}

.stars {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}


.star {
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  transition: color 0.3s ease;
}

.star.active,
.star.hover {
  color: #ffd700;
}

.feedback-form {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}

.feedback-form p {
  margin-bottom: 10px;
}

.feedback-form textarea {
  width: 90%;
  padding: 10px;
  border: 1px solid #b8ddbe;
  border-radius: 10px;
  resize: none;
}

.feedback-form button {
  background-color: #52a086;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 10px;
 
}

.feedback-form button:hover {
  background-color: #b8ddbe;
}
</style>
