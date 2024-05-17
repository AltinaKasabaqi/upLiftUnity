<template>
  <div class="rating">
    <span
      v-for="n in maxStars"
      :key="n"
      @mouseover="hoverRating(n)"
      @click="selectRating(n)"
      @mouseleave="resetHover"
      :class="{ 'filled': n <= hoverValue || n <= value }"
    >
      ★
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    maxStars: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      hoverValue: 0
    };
  },
  methods: {
    hoverRating(value) {
      this.hoverValue = value;
    },
    selectRating(value) {
      this.$emit('input', value);
      this.hoverValue = value;
      console.log(value);
    },
    resetHover() {
      this.hoverValue = 0;
    },
    watch: {
    value(newValue) {
      this.hoverValue = newValue;
    }
  }
  },
  watch: {
    value(newValue) {
      this.hoverValue = newValue;
    }
  },
  created() {
    this.hoverValue = this.value; // Initialize hoverValue with current value
  }
};
</script>

<style scoped>
.rating {
  font-size: 50px;
  margin-left: 60px;
  margin-bottom: 20px;
}

.rating span {
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
  color: #d4bd90; /* Highlight color on hover */
}

.rating span:hover {
  color: #ffbb33; /* Highlight color on hover */
  transform: scale(1.2); /* Scale effect on hover */
}

.rating .filled {
  color: #ffbb33; /* Filled star color */
}
</style>
