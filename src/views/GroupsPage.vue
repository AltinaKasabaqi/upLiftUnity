<template>
  <div>
    <section>
      <h2>Groups</h2>
      <hr />
      <div v-for="group in groups" :key="group.id">
        <div>
          <label>Name: {{ group.groupName }} </label>
          <br />
          <label>Description: {{ group.description }} </label>
          <br />
          <button @click="deleteGroup(group.id)">Delete Group</button>
          <button @click="fillUpdateGroupForm(group.id)">Update</button>
          <hr />
        </div>
      </div>

      <div id="group-form">
        <h3>Create Group</h3>
        <label> Name: </label>
        <input v-model="groupName" type="text" id="group-name" />
        <br />

        <label> Description: </label>
        <input v-model="groupDescription" type="text" id="group-description" />
        <br />

        <button @click="createGroup">Create</button>
      </div>
      <hr />
      <div id="group-update-form">
        <h3>Update Group</h3>
        <label> Id: </label>
        <input
          v-model="groupUpdateId"
          type="text"
          disabled
          id="group-show-id"
        />

        <label> Name: </label>
        <input v-model="groupUpdateName" type="text" id="group-name" />
        <br />

        <label> Description: </label>
        <input
          v-model="groupUpdateDescription"
          type="text"
          id="group-description"
        />
        <br />
        <button @click="updateGroup">Update</button>
      </div>
    </section>

    <section>
      <h2>Members</h2>
      <hr />
      <div v-for="member in members" :key="member.id">
        <div>
          <label>Name: {{ member.name }} </label>
          <br />
          <label>Description: {{ member.role }} </label>
          <br />
          <label>GroupName: {{ member.groupName }} </label>
          <hr />
        </div>
      </div>

      <div id="member-form">
        <label> Name: </label>
        <input v-model="memberName" type="text" id="member-name" />
        <br />

        <label> Description: </label>
        <input v-model="memberRole" type="text" id="member-role" />
        <br />

        <label> Groups </label>
        <select v-model="memberGroupId">
          <option v-for="group in groups" :key="group.id" :value="group.id">
            {{ group.groupName }}
          </option>
        </select>

        <button @click="createMember">Submit</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GroupsPage",
  data() {
    return {
      groupName: "",
      groupDescription: "",
      groupUpdateId: 0,
      groupUpdateName: "",
      groupUpdateDescription: "",
      memberName: "",
      memberRole: "",
      memberGroupId: 0,
      groups: [],
      members: [],
    };
  },
  async mounted() {
    await this.fetchGroups();
    await this.fetchMembers();
  },
  methods: {
    async fetchGroups() {
      return axios.get("http://localhost:5051/api/groups").then((result) => {
        if (result.status !== 200) {
          console.error("could not find groups!");
          alert("Could not fetch groups");
          return;
        }

        const groups = result.data;

        this.groups = groups;
      });
    },

    async fetchMembers() {
      return axios.get("http://localhost:5051/api/member").then((result) => {
        if (result.status !== 200) {
          console.error("could not find members!");
          alert("Could not fetch members");
          return;
        }

        const members = result.data;

        this.members = members;

        console.log({ members });
      });
    },

    async createGroup() {
      console.log("clicked!!");
      console.log({ groupName: this.groupName, desc: this.groupDescription });

      return axios
        .post("http://localhost:5051/api/groups", {
          groupName: this.groupName,
          description: this.groupDescription,
        })
        .then(async (result) => {
          console.log({ result });
          alert(result.data);
          await this.fetchGroups();
        });
    },

    async deleteGroup(id) {
      console.log("duhet me delete: ", id);
      return axios
        .delete(`http://localhost:5051/api/groups/${id}`)
        .then(async (result) => {
          alert(result.data);
          await this.fetchGroups();
        })
        .catch((err) => {
          console.log({ err });
        });
    },

    async createMember() {
      console.log("Clicked create member");
      console.log({
        memberName: this.memberName,
        role: this.memberRole,
        groupId: this.memberGroupId,
      });

      return axios
        .post("http://localhost:5051/api/member", {
          name: this.memberName,
          role: this.memberRole,
          groupId: this.memberGroupId,
        })
        .then(async (result) => {
          console.log({ result });
          alert(result.data);
          await this.fetchMembers();
        });
    },

    async fillUpdateGroupForm(id) {
      console.log({ id });
      const group = this.groups.find((x) => x.id == id);
      console.log({ group });
      this.groupUpdateId = group.id;
      this.groupUpdateName = group.groupName;
      this.groupUpdateDescription = group.description;
    },

    
    async updateGroup() {
      try {
        const result = await axios.put(
          `http://localhost:5051/api/groups/${this.groupUpdateId}`,
          {
            groupName: this.groupUpdateName,
            description: this.groupUpdateDescription,
          }
        );

        console.log({ result });
        alert(result.data);
        await this.fetchGroups();
      } catch (error) {
        console.error("Error updating group:", error);
        alert("Failed to update group. Please try again.");
      }
    },
  },
  /*
        - emrat e requestave te POST ne object, duhet me match me DTO ne swagger (API)
        - v-modeli mapimi dy-anshem (2 way data binding)
    */
};
</script>
