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
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
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
    const store = useStore();
    const isTrainingProgram = computed({
      get() {
        return store.getters['storeTrainingPlan/getIsTrainingProgram'];
      },
      set(value) {
        store.dispatch('storeTrainingPlan/updateIsTrainingProgram', value);
      },
    });
    const isTrainingCycle = computed({
      get() {
        return store.getters['storeTrainingPlan/getIsTrainingCycle'];
      },
      set(value) {
        store.dispatch('storeTrainingPlan/updateIsTrainingCycle', value);
      },
    });
    const isTrainingCalendar = computed({
      get() {
        return store.getters['storeTrainingPlan/getIsTrainingCalendar'];
      },
      set(value) {
        store.dispatch('storeTrainingPlan/updateIsTrainingCalendar', value);
      },
    });

    return {
      isTrainingProgram,
      isTrainingCycle,
      isTrainingCalendar,
    };
  },
};
</script>
