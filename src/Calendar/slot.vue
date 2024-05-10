<template>
    <div class="bottom flex-grow h-30 py-1 w-full cursor-pointer">
      <div v-if="events.length === 0" class="text-gray-500">No events</div>
      <div v-else>
        <div v-for="event in day.events" :key="event.id" class="event-slot">
          <!-- <span class="event-name">{{ event.Id }}</span> -->
          <span class="time">{{ event.UserId }} </span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      events: {
        type: Array,
        default: () => []
      }
    }
  };
  </script>