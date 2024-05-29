<template>
  <div class="notes-chat-container">
    <div class="notes-chat ">
      <header class="notes-header">
        <div class="notes-header-title">
          <i class="fas fa-comment-alt"></i> Notes
        </div>
      </header>
      <main class="note-chat notes-window">
        <div
          v-for="(note, index) in notes"
          :key="index"
          class="note-message"
        >
          <div class="note-bubble">
            <div>
              <div
                v-if="!note.editingTitle"
                @dblclick="startEditingTitle(note)"
                class="editable"
              >
                Titulli: {{ note.title }}
              </div>
              <input
                v-else
                v-model="note.title"
                @blur="stopEditingTitle(note)"
                class="edit-mode"
              />

              <div
                v-if="!note.editingContent"
                @dblclick="startEditingContent(note)"
                class="editable"
              >
                {{ note.content }}
              </div>
              <textarea
                v-else
                v-model="note.content"
                @blur="stopEditingContent(note)"
                class="edit-mode"
              ></textarea>
            </div>
            <div class="note-actions">
              <i
                id="icon-bin"
                class="fas fa-trash-alt delete-icon"
                @click="deleteNoteConfirm(note)"
              ></i>
            </div>
          </div>
        </div>
      </main>

      <form class="note-inputarea input-field" @submit.prevent="addNote">
        <input
          v-model.trim="newNote.title"
          type="text"
          placeholder="Note Title"
        />
        <textarea
          v-model.trim="newNote.content"
          placeholder="Enter your note"
        ></textarea>
        <button type="submit" class="input-btn">Add Note</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getUserIdFromToken } from "../../authorization/authUserId.js";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      notes: [],
      newNote: {
        title: "",
        content: "",
      },
    };
  },
  created() {
    this.fetchUserNotes();
  },
  methods: {
    async deleteNoteConfirm(note) {
      const confirmResult = await Swal.fire({
        icon: "warning",
        text: "Ky shënim do të fshihet përgjithmonë.",
        showCancelButton: true,
        confirmButtonText: "Fshij",
        cancelButtonText: "Anulo",
      });

      if (confirmResult.isConfirmed) {
        await this.deleteNoteFromDatabase(note);
      }
    },

    async deleteNoteFromDatabase(note) {
      try {
        const noteID = note.noteId;
        const response = await axios.delete(
          `http://localhost:5051/notes/Delete/${noteID}`
        );
        if (response.status === 200) {
          await this.fetchUserNotes();

          Swal.fire({
            icon: "success",
            text: "Shënimet u fshin me sukses.",
          });
        } else {
          throw new Error("Delete operation failed.");
        }
      } catch (error) {
        console.error("Error deleting note:", error.response.data);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Provoni përsëri",
        });
      }
    },
    async fetchUserNotes() {
      const userId = getUserIdFromToken();

      try {
        const response = await axios.get(
          `http://localhost:5051/notes/user/${userId}`
        );
        this.notes = response.data.map((note) => ({
          ...note,
          editingTitle: false,
          editingContent: false,
        }));
      } catch (error) {
        console.error("Error fetching user notes:", error.response.data);
      }
    },
    async addNote() {
      if (!this.newNote.title || !this.newNote.content) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Plotesoni të gjitha fushat",
        });

        return;
      }

      const userId = getUserIdFromToken();
      this.newNote.userId = userId;

      try {
        const response = await axios.post(
          "http://localhost:5051/notes",
          this.newNote
        );
        console.log(response.data);

        await this.fetchUserNotes();

        this.newNote.title = "";
        this.newNote.content = "";

        Swal.fire({
          icon: "success",
          title: "Sukses!",
          text: "Shenimet u shtuan me sukses.",
        });
      } catch (error) {
        console.error("Error creating note:", error.response.data);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Provoni përsëri.",
        });
      }
    },
    startEditingTitle(note) {
      note.editingTitle = true;
    },
    stopEditingTitle(note) {
      note.editingTitle = false;
      this.updateNoteInDatabase(note);
    },
    startEditingContent(note) {
      note.editingContent = true;
    },
    stopEditingContent(note) {
      note.editingContent = false;
      this.updateNoteInDatabase(note);
    },

    async updateNoteInDatabase(note) {
      try {
        const noteID = note.noteId;
        console.log('id'+ noteID);
        const response = await axios.put(
          `http://localhost:5051/notes/Update/${noteID}`,
          note
        );
        console.log("Note updated successfully:", response.data);
        Swal.fire({
          icon: "success",
          title: "Sukses!",
          text: "Ndryshimet u ruajtën me sukses.",
        });
      } catch (error) {
        console.error("Error updating note:", error.response.data);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Provoni përsëri.",
        });
      }
    },
  },
};
</script>

<style scoped>
.notes-chat-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.notes-chat {
  width: 90%;
  max-width: 900px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.notes-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 2px solid #eee;
  background: #f8f9fa;
  color: #495057;
}

.notes-header-title {
  font-size: 1.2em;
}

.note-chat {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #ffffff;
}

.note-message {
  background-color: #f8f9fa;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
}

.input-field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 20px;
}

.input-field input,
.input-field textarea,
.input-field button {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1em;
}

.input-field button {
  cursor: pointer;
  background-color: #6ea8e6;
  color: #ffffff;
  border: none;
}

.input-btn {
  width: 100%;
}

.note-inputarea {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 15px;
  border-top: 2px solid #eee;
  background: #f8f9fa;
}

.editable {
  cursor: pointer;
}

.edit-mode {
  width: 100%;
  min-height: 100px;
}

#icon-bin {
  margin-left: auto;
}
</style>
