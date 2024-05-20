<template>
    <div class="container">
      <table>
        <thead>
          <tr>
            <th>Emri & Mbiemri</th>
            <th>Data</th>
            <th>Dita</th>
            <th>Koha</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="schedule in schedules" :key="schedule.id">
            <td><b>{{ getUserFullName(schedule.userSch) }}</b></td>
            <td>{{ formatDate(schedule.firstDate) }}</td>
            <td>{{ getDayOfWeek(schedule.firstDate) }}</td>
            <td>{{ getFormattedTime(schedule.firstDate) }}</td>
          </tr>
          <tr v-for="schedule in schedules" :key="schedule.id + '_second'">
            <td><b>{{ getUserFullName(schedule.userSch) }}</b></td>
            <td>{{ formatDate(schedule.secondDate) }}</td>
            <td>{{ getDayOfWeek(schedule.secondDate) }}</td>
            <td>{{ getFormattedTime(schedule.secondDate) }}</td>
          </tr>
          <tr v-for="schedule in schedules" :key="schedule.id + '_third'">
            <td><b>{{ getUserFullName(schedule.userSch) }}</b></td>
            <td>{{ formatDate(schedule.thirdDate) }}</td>
            <td>{{ getDayOfWeek(schedule.thirdDate) }}</td>
            <td>{{ getFormattedTime(schedule.thirdDate) }}</td>
          </tr>
          <tr v-for="schedule in schedules" :key="schedule.id + '_fourth'">
            <td><b>{{ getUserFullName(schedule.userSch) }}</b></td>
            <td>{{ formatDate(schedule.fourthDate) }}</td>
            <td>{{ getDayOfWeek(schedule.fourthDate) }}</td>
            <td>{{ getFormattedTime(schedule.fourthDate) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        schedules: []
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
        fetchData() {
    axios.get('http://localhost:5051/api/Schedule/GetSchedules')
        .then(response => {
        this.schedules = response.data;
        console.log(this.schedules);
        })
        .catch(error => {
        console.error('Gabim gjatë marrjes së të dhënave:', error);
        });
    },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('sq-AL', { day: 'numeric', month: 'long', year: 'numeric' });
      },
      getDayOfWeek(dateString) {
        const daysOfWeek = ['E Diel', 'E Hënë', 'E Martë', 'E Mërkurë', 'E Enjte', 'E Premte', 'E Shtunë'];
        const date = new Date(dateString);
        return daysOfWeek[date.getDay()];
      },
      getFormattedTime(dateString) {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
      },
      getUserFullName(user) {
        return `${user.name} ${user.surname}`;
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    margin: 20px auto;
    width: 70%;
  }
  
  table {
    width: 80%;
    margin-left: 8%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>
  