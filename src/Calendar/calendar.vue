<template>
  <div class="container mx-auto mt-10">
    <div class="wrapper bg-white rounded shadow w-full">
      <div class="header flex justify-between border-b p-2">
        <span class="text-lg font-bold">
          {{ currentDate.format('YYYY MMMM') }}
        </span>
        <div class="buttons">
          <button class="p-1" @click="prevMonth">
            <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left-circle"  xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path fill-rule="evenodd" d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z" />
              <path fill-rule="evenodd" d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z" />
            </svg>
          </button>
          <button class="p-1" @click="nextMonth">
            <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right-circle"  xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path fill-rule="evenodd" d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z" />
              <path fill-rule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z" />
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
          <!-- Calendar rows -->
          <tr v-for="week in calendar" :key="week[0].date">
            <td v-for="day in week" :key="day.date" class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
              <div class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                <div class="top h-5 w-full">
                  <span class="text-gray-500">{{ day.date }}</span>
                </div>
                <div class="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                  <!-- Render events for the day -->
                  <Eventslot :events="day.events"></Eventslot>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Eventslot from './slot.vue';
import moment from 'moment';

export default {
  name: "CalendarV",
  components: {
    Eventslot
  },
  data() {
    return {
      currentDate: moment(),
      calendar: [] // Holds the generated calendar data
    };
  },
  methods: {
    // Method to navigate to the previous month
    prevMonth() {
      this.currentDate.subtract(1, 'month');
      this.generateCalendar();
    },
    // Method to navigate to the next month
    nextMonth() {
      this.currentDate.add(1, 'month');
      this.generateCalendar();
    },
    // Function to generate calendar dates for the current month
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
          week.push({
            date: currentDate.format('D'),
            events: [] // Placeholder for events (if any) for this day
          });
          currentDate.add(1, 'day');
        }
        calendar.push(week);
        week = [];
      }

      this.calendar = calendar;
    }
  },
  mounted() {
    this.generateCalendar();
  }
};
</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>