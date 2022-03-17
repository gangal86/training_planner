<template>
  <q-page class="row items-center justify-evenly">
    <TrainingProgram />

    <TrainingCycle />

    <TrainingCalendar />
  </q-page>
</template>

<script>
import TrainingProgram from '../components/TrainingProgram.vue';
import TrainingCycle from '../components/TrainingCycle.vue';
import TrainingCalendar from '../components/TrainingCalendar.vue';

export default {
  name: 'MainPage',
  components: {
    TrainingProgram,
    TrainingCycle,
    TrainingCalendar,
  },
  setup() {
    return {};
  },
};
</script>
