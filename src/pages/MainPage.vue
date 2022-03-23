<template>
  <q-page class="column items-center">
    <TrainingProgram 
      v-if="isTrainingProgram" 
      v-model="isTrainingCycle" 
    />

    <TrainingCycle
      v-if="isTrainingCycle && !isTrainingCalendar"
      v-model="isTrainingCalendar"
      @update:isTrainingProgram="isTrainingProgram = $event"
    />

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
