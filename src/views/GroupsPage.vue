<template>
 <div>
    <section>
        <h2> Groups </h2> 
        <hr/>
        <div v-for="group in groups" :key="group.id">
            <div>
                <label>Name: {{ group.groupName }} </label> 
                <br/>
                <label>Description: {{ group.description }} </label> 
                <hr/>
            </div>
        </div>

        <div id="group-form">
            <label> Name: </label>
            <input v-model="groupName" type="text" id="group-name" />
            <br/>

            <label> Description: </label>
            <input v-model="groupDescription" type="text" id="group-description" />
            <br/>

            <button @click="createGroup">Submit</button>
        </div>
    </section>

    <section>
        <h2> Members </h2> 
        <hr/>
        <div v-for="member in members" :key="member.id">
            <div>
                <label>Name: {{ member.groupName }} </label> 
                <br/>
                <label>Description: {{ member.description }} </label> 
                <hr/>
            </div>
        </div>
    </section>

 </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'GroupsPage',
    data() {
        return {
            groupName: '',
            groupDescription: '',
            groups: [],
            members: []
        }
    },
    async mounted() {
        await this.fetchGroups();
        await this.fetchMembers();
    },
    methods: {
        async fetchGroups() {
            return axios.get('http://localhost:5051/api/groups')
            .then((result) => {
                if(result.status !== 200){
                    console.error("could not find groups!")
                    alert('Could not fetch groups')
                    return;
                }

                const groups = result.data;

                this.groups = groups;
            })
        },

        async fetchMembers(){ 
            return axios.get('http://localhost:5051/api/member')
            .then((result) => {
                if(result.status !== 200){
                    console.error("could not find members!")
                    alert('Could not fetch members')
                    return;
                }

                const members = result.data;

                this.members = members;

                console.log({members})
            })
        },

        async createGroup(){
            console.log("clicked!!")
            console.log({ groupName: this.groupName, desc: this.groupDescription })

            return axios.post('http://localhost:5051/api/groups', {
                groupName: this.groupName,
                description: this.groupDescription
            })
            .then(async (result) => {
                console.log({result})
                alert(result.data)
                await this.fetchGroups();
            })
          
        }
    }
}
</script>
