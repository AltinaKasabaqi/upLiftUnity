<template>
  <div class="container mx-auto mt-10">
    <div class="wrapper bg-white rounded shadow w-full max-w-screen-xl mx-auto p-4">
      <div class="header flex justify-between border-b pb-2">
        <span class="text-lg font-bold">
          {{ currentMonthName }}
        </span>
      </div>
      <table class="w-full">
        <thead>
          <tr>
            <th class="p-2 border-r h-10 xl:w-28 lg:w-24 md:w-20 sm:w-16 w-10 xl:text-sm text-xs">
              <span class="xl:block lg:block md:block sm:block hidden">Sunday</span>
              <span class="xl:hidden lg:hidden md:hidden sm:hidden block">Sun</span>
            </th>
            <th class="p-2 border-r h-10 xl:w-28 lg:w-24 md:w-20 sm:w-16 w-10 xl:text-sm text-xs">
              <span class="xl:block lg:block md:block sm:block hidden">Monday</span>
              <span class="xl:hidden lg:hidden md:hidden sm:hidden block">Mon</span>
            </th>
            <th class="p-2 border-r h-10 xl:w-28 lg:w-24 md:w-20 sm:w-16 w-10 xl:text-sm text-xs">
              <span class="xl:block lg:block md:block sm:block hidden">Tuesday</span>
              <span class="xl:hidden lg:hidden md:hidden sm:hidden block">Tue</span>
            </th>
            <th class="p-2 border-r h-10 xl:w-28 lg:w-24 md:w-20 sm:w-16 w-10 xl:text-sm text-xs">
              <span class="xl:block lg:block md:block sm:block hidden">Wednesday</span>
              <span class="xl:hidden lg:hidden md:hidden sm:hidden block">Wed</span>
            </th>
            <th class="p-2 border-r h-10 xl:w-28 lg:w-24 md:w-20 sm:w-16 w-10 xl:text-sm text-xs">
              <span class="xl:block lg:block md:block sm:block hidden">Thursday</span>
              <span class="xl:hidden lg:hidden md:hidden sm:hidden block">Thu</span>
            </th>
            <th class="p-2 border-r h-10 xl:w-28 lg:w-24 md:w-20 sm:w-16 w-10 xl:text-sm text-xs">
              <span class="xl:block lg:block md:block sm:block hidden">Friday</span>
              <span class="xl:hidden lg:hidden md:hidden sm:hidden block">Fri</span>
            </th>
            <th class="p-2 border-r h-10 xl:w-28 lg:w-24 md:w-20 sm:w-16 w-10 xl:text-sm text-xs">
              <span class="xl:block lg:block md:block sm:block hidden">Saturday</span>
              <span class="xl:hidden lg:hidden md:hidden sm:hidden block">Sat</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in calendar" :key="week[0].date">
            <td v-for="day in week" :key="day.date" class="border p-1 h-32 xl:w-28 lg:w-24 md:w-20 sm:w-16 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
              <div class="flex flex-col h-32 mx-auto xl:w-28 lg:w-24 md:w-20 sm:w-full w-10 mx-auto overflow-hidden">
                <div class="top h-5 w-full">
                  <span class="text-gray-500">{{ day.date }}</span>
                </div>
                <div class="bottom flex-grow h-24 py-1 w-full cursor-pointer">
                  <div v-if="day.events.length === 0" class="text-gray-500"></div>
                  <div v-else>
                    <div v-for="event in day.events" :key="event.id" :class="getEventSlotClass(event)" :title="event.userId == userId ? 'Orari im' : ''">
                    <div class="event rounded p-1 text-sm mb-1 text-white">
                        <span class="time">{{ event.time }}</span>
                    </div>
                  </div>
                  </div>
                  <div class="plus-icon">
                    <button class="text-gray-500 hover:text-gray-800 focus:outline-none" @click="showAddEventModal(day.date, currentDate.month()+1, currentDate.year())">
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
  <div v-show="showModal" class="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-4 rounded shadow relative max-w-md w-full">
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
      slots: ['02:00','08:00', '14:00', '20:00'],
      currentMonthName:''

   
 
    };
  },
  methods: {
    async fetchEvents() {
  try {
    const response = await axios.get('http://localhost:5051/api/Schedule/GetSchedules');
    console.log(response.data);
    const schedules = response.data;

    const currentDate = this.currentDate.clone();
    const dayOfMonth = currentDate.date();

    let renderMonth, renderYear;
    if (dayOfMonth >= 27) {
      renderMonth = currentDate.clone().add(1, 'month').month();
      renderYear = currentDate.clone().add(1, 'month').year();
    } else {
      renderMonth = currentDate.month();
      renderYear = currentDate.year();
    }

    schedules.forEach(schedule => {
      const { id, firstDate, secondDate, thirdDate, fourthDate } = schedule;

      if (firstDate && this.isDateInRenderMonth(firstDate, renderMonth, renderYear)) {
        this.addEventToCalendar(id, firstDate, schedule.userId);
      }

      if (secondDate && this.isDateInRenderMonth(secondDate, renderMonth, renderYear)) {
        this.addEventToCalendar(id, secondDate, schedule.userId);
      }
      if (thirdDate && this.isDateInRenderMonth(thirdDate, renderMonth, renderYear)) {
        this.addEventToCalendar(id, thirdDate, schedule.userId);
      }
      if (fourthDate && this.isDateInRenderMonth(fourthDate, renderMonth, renderYear)) {
        this.addEventToCalendar(id, fourthDate, schedule.userId);
      }
    });
  } catch (error) {
    console.error('Gabim gjatë marrjes së ngjarjeve nga backend-i:', error);
  }
},
isDateInRenderMonth(date, renderMonth, renderYear) {
  const eventDate = moment(date);
  return eventDate.month() === renderMonth && eventDate.year() === renderYear;
},
addEventToCalendar(id, date, uId) {
  const eventDate = moment(date); 

  console.log('Data e eventit:', eventDate.format('YYYY-MM-DD HH:mm')); 

  this.calendar.forEach(week => {
    week.forEach(day => {
      if (day.date === eventDate.date().toString()) {
        day.events.push({
          id: id, 
          time: eventDate.format('HH:mm'), 
          userId: uId
        });

        console.log('Eventi u shtua në datën:', day.date); 
        console.log('Lista e eventeve për këtë ditë:', day.events); 

        const lastEvent = day.events[day.events.length - 1];
        console.log('UserId në eventin e fundit të shtuar:', lastEvent.userId);
      }
    });
  });
},
generateCalendar() {
  const currentDate = this.currentDate.clone();
  const dayOfMonth = currentDate.date();

  let targetDate;
  if (dayOfMonth >= 27) {
    targetDate = currentDate.clone().add(1, 'month');
  } else {
    targetDate = currentDate;
  }

  const startOfMonth = targetDate.clone().startOf('month');
  const endOfMonth = targetDate.clone().endOf('month');
  const startOfWeek = startOfMonth.clone().startOf('week');
  const endOfWeek = endOfMonth.clone().endOf('week');

  const calendar = [];
  let week = [];
  let currentDateIterator = startOfWeek.clone();

  while (currentDateIterator.isSameOrBefore(endOfWeek, 'day')) {
    for (let i = 0; i < 7; i++) {
      if (currentDateIterator.isSameOrAfter(startOfMonth, 'day') && currentDateIterator.isSameOrBefore(endOfMonth, 'day')) {
        week.push({
          date: currentDateIterator.format('D'),
          events: [] 
        });
      } else {
        week.push({
          date: '',
          events: []
        });
      }
      currentDateIterator.add(1, 'day');
    }
    calendar.push(week);
    week = [];
  }

  this.calendar = calendar;
},

    showAddEventModal(date, month, year) {
  const formattedDate = moment(`${year}-${month + 1}-${date}`, 'YYYY-MM-DD');
  // const currentDate=moment();
  //   if (currentDate.date() < 27 || currentDate.date() > 31) {
  //     Swal.fire({
  //       title: "Afati i përzgjedhjes së orarit",
  //       text: "Nuk është hapur ende afati për përzgjedhjen e orarit.",
  //       icon: "error"
  //     });
  //     return; 
  //   }
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
    },

    getEventSlotClass(event) {
      return event.userId == this.userId ? 'bg-mine your-schedule' : 'bg-other';
    },


    updateCurrentMonthName() {
      const currentDate = this.currentDate.clone();
      const dayOfMonth = currentDate.date();

      let targetDate;
      if (dayOfMonth >= 27) {
        targetDate = currentDate.clone().add(1, 'month');
      } else {
        targetDate = currentDate;
      }

      this.currentMonthName = targetDate.format('YYYY MMMM');
    }
  

  },
  mounted() {
    this.userId = getUserIdFromToken();
    this.currentDate.startOf('month');
    this.generateCalendar();
    this.fetchEvents();
    this.updateCurrentMonthName();
  }
};
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.bg-mine {
  background-color: rgb(179, 206, 247);
}

.bg-other {
  background-color: rgb(179, 228, 200);
}

.your-schedule:hover::after {
  content: 'Orari im';
  position: absolute;
  background-color: #000;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 10;
}
</style>

