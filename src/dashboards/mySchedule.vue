<template>
    <div class="container">
      <table>
      <tr>
          <th>Termini</th>
          <th>Data</th>
          <th>Dita</th>
          <th>Koha</th>
        </tr>
        
        <tr>
          <td><b>Termini 1</b></td>
          
            <td>{{ formatDate(schedule.firstDate) }}</td>
          
          <td>{{ getDayOfWeek(schedule.firstDate) }}</td>
          <td>08:00 AM</td>
        </tr>
        <tr>
          <td><b>Termini 2</b></td>
          
            <td>{{ formatDate(schedule.secondDate) }}</td>
          
          <td>{{ getDayOfWeek(schedule.secondDate) }}</td>
          <td>10:45 AM</td>
        </tr>
        <tr>
          <td><b>Termini 3</b></td>
          
            <td>{{ formatDate(schedule.thirdDate) }}</td>
          
          <td>{{ getDayOfWeek(schedule.thirdDate) }}</td>
          <td>02:00 PM</td>
        </tr>
        <tr>
          <td><b>Termini 4</b></td>
          
            <td>{{ formatDate(schedule.fourthDate) }}</td>
        
          <td>{{ getDayOfWeek(schedule.fourthDate) }}</td>
          <td>04:45 PM</td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { getUserIdFromToken } from '../authorization/authUserId';
  
  export default {
    data() {
      return {
        userId: '',
        schedule: {}
      };
    },
    mounted() {
      this.userId = getUserIdFromToken();
      this.fetchData();
    },
    methods: {
      fetchData() {
        axios.get('http://localhost:5051/api/Schedule/GetScheduleByUserId', {
            params: {
              userId: this.userId
            }
          })
          .then(response => {
            this.schedule = response.data;
            console.log(this.schedule)
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
    height: 300px;
    margin-left:8%;
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
  