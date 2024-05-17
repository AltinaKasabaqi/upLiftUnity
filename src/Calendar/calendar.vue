<template>
  <div class="container mx-auto mt-10">
    <div class="wrapper bg-white rounded shadow w-full">
      <div class="header flex justify-between border-b p-2">
        <span class="text-lg font-bold">
          {{ currentDate.format('YYYY MMMM') }} 
        </span>
        <div class="buttons">
          <button class="p-1" @click="prevMonth">
            <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left-circle" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path fill-rule="evenodd" d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z"/>
              <path fill-rule="evenodd" d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"/>
            </svg>
          </button>
          <button class="p-1" @click="nextMonth">
            <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right-circle" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path fill-rule="evenodd" d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"/>
              <path fill-rule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </button>
        </div>
      </div>
      <table class="w-full">
        <thead>
          <tr>
            <th class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
              <span class="xl:block lg:block md:block sm:block hidden">Sunday</span>
              <span class="xl:hidden lg:hidden md:hidden sm:hidden block">Sun</span>
            </th>
            <th class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
              <span class="xl:block lg:block md:block sm:block hidden">Monday</span>
              <span class="xl:hidden lg:hidden md:hidden sm:hidden block">Mon</span>
            </th>
            <th class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
              <span class="xl:block lg:block md:block sm:block hidden">Tuesday</span>
              <span class="xl:hidden lg:hidden md:hidden sm:hidden block">Tue</span>
            </th>
            <th class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
              <span class="xl:block lg:block md:block sm:block hidden">Wednesday</span>
              <span class="xl:hidden lg:hidden md:hidden sm:hidden block">Wed</span>
            </th>
            <th class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
              <span class="xl:block lg:block md:block sm:block hidden">Thursday</span>
              <span class="xl:hidden lg:hidden md:hidden sm:hidden block">Thu</span>
            </th>
            <th class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
              <span class="xl:block lg:block md:block sm:block hidden">Friday</span>
              <span class="xl:hidden lg:hidden md:hidden sm:hidden block">Fri</span>
            </th>
            <th class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
              <span class="xl:block lg:block md:block sm:block hidden">Saturday</span>
              <span class="xl:hidden lg:hidden md:hidden sm:hidden block">Sat</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in calendar" :key="week[0].date">
            <td v-for="day in week" :key="day.date" class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
              <div class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                <div class="top h-5 w-full">
                  <span class="text-gray-500">{{ day.date }}</span>
                </div>
             
                  <div class="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                      <div v-if="day.events.length === 0" class="text-gray-500"></div>
                      <div v-else>
                        <div v-for="event in day.events" :key="event.id" class="event-slot">
                          <div class="event bg-blue-400 text-white rounded p-1 text-sm mb-1" style="background-color: #52a086;">
                          <span class="time">{{ event.time }} </span>
                        </div>
                        </div>
                      </div>
                  
                  <div class="plus-icon">
                    <button class="text-gray-500 hover:text-gray-800 focus:outline-none" @click="showAddEventModal(day.date, currentDate.month(), currentDate.year())">
                      <svg width="1.5em" fill="currentColor" height="1.5em" viewBox="0 0 16 16" class="bi bi-plus-circle" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path fill-rule="evenodd" d="M7.5 4.5a.5.5 0 0 1 .5.5V7h2a.5.5 0 0 1 0 1H8v2a.5.5 0 0 1-1 0V8H5.5a.5.5 0 0 1 0-1H7V5a.5.5 0 0 1 .5-.5z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-show="showModal" class="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
  <div class="bg-white p-4 rounded shadow relative">
    <button @click="closeModal" class="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800 focus:outline-none">
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <div class="mb-4">
     
      <p v-if="selectedEventDates.length === 0"><b> Orari i parë :</b></p>
      <p v-if="selectedEventDates.length === 1"><b> Orari i dytë :</b></p>
      <p v-if="selectedEventDates.length === 2"><b> Orari i tretë :</b></p>
      <p v-if="selectedEventDates.length === 3"><b> Orari i katërt :</b></p>
    </div>
    <form @submit.prevent="addEvent()">
      <div class="flex items-center">
        <select v-model="eventTime" class="border rounded p-2 mb-2" style="width: 250px; padding: 10px; font-size: 16px;">
          <option disabled selected>Zgjedh Slotin</option>
          <option v-for="slot in slots" :key="slot" :value="slot">{{ slot }}</option>
        </select>

      </div>
      <button type="submit" class="bg-blue-500 text-white rounded px-5 py-2" style="background-color: #52a086;">  Ruaj  </button>
    </form>
  </div>
</div>

</template>

<script>
import moment from 'moment';
import axios from '../api/axios.js';
import { getUserIdFromToken } from '@/authorization/authUserId';
import Swal from 'sweetalert2';

export default {
  name: "CalendarV",
  
  data() {
    return {
      currentDate: moment(),
      calendar: [], 
      showModal: false,
      eventDate: null,
      eventTime:'',
      selectedEventDates: [], 
      maxEventDates: 4,
      userId:'',
      slots: ['02:00','08:00', '14:00', '20:00'] 

   
 
    };
  },
  methods: {
    async fetchEvents() {
  try {
    const response = await axios.get('http://localhost:5051/api/Schedule/GetSchedules');
    console.log(response.data);
    const schedules = response.data; 

    schedules.forEach(schedule => {
      console.log(schedule); 
      const { id, firstDate, secondDate, thirdDate, fourthDate } = schedule; // Kthe ID-në e eventit
      if (firstDate) this.addEventToCalendar(id, firstDate); // Përfshijeni ID-në në funksionin addEventToCalendar
      if (secondDate) this.addEventToCalendar(id, secondDate);
      if (thirdDate) this.addEventToCalendar(id, thirdDate);
      if (fourthDate) this.addEventToCalendar(id, fourthDate);
    });
  } catch (error) {
    console.error('Gabim gjatë marrjes së ngjarjeve nga backend-i:', error);
  }



},
addEventToCalendar(id, date) {
  const eventDate = moment(date); 

  console.log('Data e eventit:', eventDate.format('YYYY-MM-DD HH:mm')); // Shfaq datën e eventit në console

  this.calendar.forEach(week => {
    week.forEach(day => {
      if (day.date === eventDate.date().toString()) {
        day.events.push({
          id: id, // Përfshijeni ID-në e eventit në të dhënat e ngjarjes
          time: eventDate.format('HH:mm'), 
        });

        console.log('Eventi u shtua në datën:', day.date); // Shfaq mesazhin kur eventi shtohet në kalendar
        console.log('Lista e eventeve për këtë ditë:', day.events); // Shfaq listën e eventeve për datën e caktuar në console
      }
    });
  });
},

    prevMonth() {
      this.currentDate.subtract(1, 'month');
      this.generateCalendar();
    },
    nextMonth() {
      this.currentDate.add(1, 'month');           
      this.generateCalendar();
    },
    generateCalendar() {
      const startOfMonth = this.currentDate.clone().startOf('month');
      const endOfMonth = this.currentDate.clone().endOf('month');
      const startOfWeek = startOfMonth.clone().startOf('week');
      const endOfWeek = endOfMonth.clone().endOf('week');

      const calendar = [];
      let week = [];
      let currentDate = startOfWeek.clone();

      while (currentDate.isSameOrBefore(endOfWeek, 'day')) {
        for (let i = 0; i < 7; i++) {
          if (currentDate.isSameOrAfter(startOfMonth, 'day') && currentDate.isSameOrBefore(endOfMonth, 'day')) {
            week.push({
              date: currentDate.format('D'),
              events: [] 
            });
          } else {
            week.push({
              date: '',
              events:[]
            });
          }
          currentDate.add(1, 'day');
        }
        calendar.push(week);
        week = [];
      }

      this.calendar = calendar;
    },

 
    showAddEventModal(date, month, year) {
  const formattedDate = moment(`${year}-${month + 1}-${date}`, 'YYYY-MM-DD');
  
    if (formattedDate.date() < 27 || formattedDate.date() > 30) {
      Swal.fire({
        title: "Afati i përzgjedhjes së orarit",
        text: "Nuk është hapur ende afati për përzgjedhjen e orarit.",
        icon: "error"
      });
      return; 
    }
    this.eventDate = formattedDate.format('YYYY-MM-DD HH:mm:ss');
    this.showModal = true;
}, closeModal(){
  this.showModal=false;
},



addEvent() {
    const eventTimeMoment = moment(this.eventTime, 'HH:mm');

    let formattedDateTime = moment(this.eventDate);

    formattedDateTime.set({
        hour: eventTimeMoment.hours(),
        minute: eventTimeMoment.minutes() 
    });
    const eventDateTime = formattedDateTime.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    this.showModal = false;
    this.eventTime = '';

    if (this.selectedEventDates.length < this.maxEventDates) {
        this.selectedEventDates.push(eventDateTime);
        console.log('Te dhenat ne databaze: ' + this.selectedEventDates);

        if (this.selectedEventDates.length === this.maxEventDates) {
            const eventData = {
                firstDate: this.selectedEventDates[0],
                secondDate: this.selectedEventDates[1],
                thirdDate: this.selectedEventDates[2],
                fourthDate: this.selectedEventDates[3],
                userId: this.userId,
            };

         
      axios.post('http://localhost:5051/api/Schedule/AddSchedule', eventData)
          .then((response) => {
              console.log(eventData);
              if (response.status === 200) {
                  Swal.fire({
                      title: "Orari",
                      text: "Ju keni zgjedhur orarin : " + this.selectedEventDates.map(date => moment(date).format('D MMMM YYYY - HH:mm')).join(", "),
                      icon: "success",
                      showCancelButton: false,
                      confirmButtonText: " Ok ",
                      
                  }).then((result) => {
                      if (result.isConfirmed) {
                        this.fetchEvents();
                        this.generateCalendar();
                        
                          console.log('Te dhenat u ruajten me sukses ne server.');
                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                          this.selectedEventDates = [];
                          console.log("Zgjedhja u anullua.");
                      }
                  });
              } 
          })
          .catch(error => {
            if (error.response && error.response.status === 400) {
      
                Swal.fire({
                    title: " ",
                    text: "Ju keni zgjedhur orarin për këtë muaj",
                    icon: "error"
        });
    } else {
            
            Swal.fire({
                title: " ",
                text: "Gabime ne Server",
                icon: "error"
        });
    }
          });
              }
          } else {
              Swal.fire("Gabim", "Ju keni arritur numrin maksimal te datave te zgjedhura.", "error");
          }
      }

  },
  mounted() {
    this.userId = getUserIdFromToken();
    this.currentDate.startOf('month');
    this.generateCalendar();
    this.fetchEvents();
  }
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;


</style>
