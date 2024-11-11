<template>
  <div class="category-container">
    <section>
      <h2 class="heading">Categories</h2>
      <hr/>
      <div v-for="category in categories" :key="category.id" class="category-item">
        <div>
          <label class="category-label">Name: {{ category.name }} </label>
          <br />
          <label class="category-label">Description: {{ category.description }} </label>
          <br />
          <button @click="deleteCategory(category.id)" class="button delete-button">Delete Category</button>
          <button @click="fillUpdateCategoryForm(category.id)" class="button update-button">Update</button>
          <hr />
        </div>
      </div>

      <div id="category-form" class="form-container">
        <h3>Create category</h3>
        <label> Name: </label>
        <input v-model="name" type="text" id="category-name" class="input-field" />
        <br />

        <label> Description: </label>
        <input v-model="description" type="text" id="category-description" class="input-field" />
        <br />

        <button @click="createCategory" class="button create-button">Create</button>
      </div>
      <hr />
      <div id="category-update-form" class="form-container">
        <h3>Update Category</h3>
        <label> Id: </label>
        <input
          v-model="categoryUpdateId"
          type="text"
          disabled
          id="category-show-id"
          class="input-field"
        />

        <label> Name: </label>
        <input v-model="categoryUpdateName" type="text" id="category-name" class="input-field" />
        <br />
        <label> Description: </label>
        <input
          v-model="categoryUpdateDescription"
          type="text"
          id="category-description"
          class="input-field"
        />
        <br />
        <button @click="updateCategory" class="button update-button">Update</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CategoriesPage",
  data() {
    return {
      name: "",
      description: "",
      categoryUpdateId: 0,
      categoryUpdateName: "",
      categoryUpdateDescription: "",
      categories: [],
    };
  },
  async mounted() {
    await this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      return axios.get("http://localhost:5051/api/Category").then((result) => {
        if (result.status !== 200) {
          console.error("could not find categories!");
          alert("Could not fetch categories");
          return;
        }
        const categories = result.data;
        this.categories = categories;
      });
    },

    async createCategory() {
      return axios
        .post("http://localhost:5051/api/Category", {
          Name: this.name,
          Description: this.description,
        })
        .then(async (result) => {
          alert(result.data);
          await this.fetchCategories();
        });
    },

    async deleteCategory(id) {
      return axios
        .delete(`http://localhost:5051/api/Category/${id}`)
        .then(async (result) => {
          alert(result.data);
          await this.fetchCategories();
        })
        .catch((err) => {
          console.log({ err });
        });
    },

    async fillUpdateCategoryForm(id) {
      const category = this.categories.find((x) => x.id == id);
      this.categoryUpdateId = category.id;
      this.categoryUpdateName = category.name;
      this.categoryUpdateDescription = category.description;
    },

    async updateCategory() {
      try {
        const result = await axios.put(
          `http://localhost:5051/api/Category/${this.categoryUpdateId}`,
          {
            Name: this.categoryUpdateName,
            Description: this.categoryUpdateDescription,
          }
        );
        alert(result.data);
        await this.fetchCategories();
      } catch (error) {
        console.error("Error updating category:", error);
        alert("Failed to update category. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
/* Overall container */
.category-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Heading style */
.heading {
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

/* Category item styling */
.category-item {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}

.category-label {
  font-weight: bold;
  color: #444;
}

/* Form container */
.form-container {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

/* Input fields */
.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

/* Button styling */
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.create-button {
  background-color: #4CAF50;
}

.update-button {
  background-color: #0c5b75;
}

.delete-button {
  background-color: #aa1207;
}

/* Hover effects for buttons */
.button:hover {
  opacity: 0.8;
}
</style>
