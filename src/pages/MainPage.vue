<template>
  <q-page class="row items-center justify-center">
    <TrainingProgram v-if="isTrainingProgram" v-model="isTrainingCycle" />

    <TrainingCycle v-if="isTrainingCycle" />

    <TrainingCalendar v-if="isTrainingCalendar" />
  </q-page>
</template>

<script>
import { ref } from 'vue';
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
    const isTrainingProgram = ref(true);
    const isTrainingCycle = ref(false);
    const isTrainingCalendar = ref(false);

    return {
      isTrainingProgram,
      isTrainingCycle,
      isTrainingCalendar,
    };
  },
};
</script>
