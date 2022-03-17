<template>
  <q-date
    v-model="dateNow"
    mask="YYYY/MM/DD"
    :events="allExercisesDates"
    event-color="orange"
    first-day-of-week="1"
  />
  <q-card class="q-mx-md">
    <q-card-section>
      <q-list separator class="q-my-xs">
        <template v-for="exercise in allExercises" :key="exercise.id">
          <q-item v-if="exercise.exerciseDate === dateNow.toString()">
            <q-item-section>
              <q-item-label class="text-primary"
                >id: {{ exercise.id }}</q-item-label
              >
              <q-item-label class="text-primary"
                >exerciseName: {{ exercise.exerciseName }}</q-item-label
              >
              <q-item-label class="text-primary"
                >trainingDay: {{ exercise.trainingDay }}</q-item-label
              >
              <q-item-label class="text-primary"
                >startingWeight: {{ exercise.startingWeight }}</q-item-label
              >
              <q-item-label class="text-primary"
                >additionalWeight: {{ exercise.additionalWeight }}</q-item-label
              >
              <q-item-label class="text-primary"
                >operatingWeight: {{ exercise.operatingWeight }}</q-item-label
              >
              <q-item-label class="text-primary"
                >repetitionsNumber:
                {{ exercise.repetitionsNumber }}</q-item-label
              >
              <q-item-label class="text-primary"
                >exerciseSetNumber:
                {{ exercise.exerciseSetNumber }}</q-item-label
              >
              <q-item-label class="text-primary"
                >exerciseTime: {{ exercise.exerciseTime }}</q-item-label
              >
              <q-item-label class="text-primary"
                >exerciseDate: {{ exercise.exerciseDate }}</q-item-label
              >
              <q-item-label class="text-primary"
                >exerciseNotes: {{ exercise.exerciseNotes }}</q-item-label
              >
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { date } from 'quasar';

export default {
  setup() {
    const store = useStore();

    const dateNow = ref(date.formatDate(Date.now(), 'YYYY/MM/DD'));

    const allExercises = computed(
      () => store.getters['storeTrainingPlan/getAllExercises']
    );

    const allExercisesDates = computed(
      () => store.getters['storeTrainingPlan/getAllExercisesDates']
    );
    return {
      allExercisesDates,
      dateNow,
      allExercises,
    };
  },
};
</script>
