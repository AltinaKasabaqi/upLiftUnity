<template>
  <div class="page-background">
    <div class="donation-form">
      <h1>Donation Form</h1>
      <div class="form-group">
        <label for="amount">Amount ($)</label>
        <input type="number" v-model.number="amount" id="amount" class="form-control">
      </div>

      <div class="form-group">
        <input type="radio" id="cash" value="cash" v-model="paymentMethod">
        <label for="cash">Cash</label>
      </div>

      <div class="form-group">
        <input type="radio" id="stripe" value="stripe" v-model="paymentMethod">
        <label for="stripe">Credit Card (Stripe)</label>
      </div>

      <p v-if="paymentMethod">Selected Payment Method: {{ paymentMethod }}</p>

      <button @click="donate" class="btn btn-primary">Donate</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: 0,
      paymentMethod: 'cash',
    };
  },
  methods: {
    donate() {
      if (this.paymentMethod === 'cash') {
        // Process cash donation
        alert(`Thank you for your cash donation of $${this.amount}`);
      } else if (this.paymentMethod === 'stripe') {
        // You can add Stripe integration here if needed
        alert("Stripe integration is not available.");
      }
    }
  }
};
</script>

<style scoped>
.page-background {
  background-image: url('../assets/donate.jpg'); /* Add your image path here */
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.donation-form {
  max-width: 900px;
  padding: 70px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: rgba(193, 190, 190, 0.623); /* Add background color with opacity for better readability */
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
