<template>
  <q-page class="row items-center justify-evenly">
    <div v-if="isGenTrainingCycle">
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
                  <q-item-label class="text-primary">id: {{ exercise.id }}</q-item-label>
                  <q-item-label class="text-primary">exerciseName: {{ exercise.exerciseName }}</q-item-label>
                  <q-item-label class="text-primary">trainingDay: {{ exercise.trainingDay }}</q-item-label>
                  <q-item-label class="text-primary">startingWeight: {{ exercise.startingWeight }}</q-item-label>
                  <q-item-label class="text-primary">additionalWeight: {{ exercise.additionalWeight }}</q-item-label>
                  <q-item-label class="text-primary">operatingWeight: {{ exercise.operatingWeight }}</q-item-label>
                  <q-item-label class="text-primary">repetitionsNumber: {{ exercise.repetitionsNumber }}</q-item-label>
                  <q-item-label class="text-primary">exerciseSetNumber: {{ exercise.exerciseSetNumber }}</q-item-label>
                  <q-item-label class="text-primary">exerciseTime: {{ exercise.exerciseTime }}</q-item-label>
                  <q-item-label class="text-primary">exerciseDate: {{ exercise.exerciseDate }}</q-item-label>
                  <q-item-label class="text-primary">exerciseNotes: {{ exercise.exerciseNotes }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <q-btn
      v-if="!isGenTrainingCycle"
      color="primary"
      label="Сгенерировать тренировочный цикл"
      @click="genTrainingCycle"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { date, uid } from 'quasar';
import { useStore } from 'vuex';
//ссоставить план тренировок
//составить программу тренировок

export default defineComponent({
  name: 'MainPage',
  setup() {
    const store = useStore();
    const isGenTrainingCycle = ref(false);
    const dateNow = ref(date.formatDate(Date.now(), 'YYYY/MM/DD'));

    const allExercises = computed(
      () => store.getters['storeTrainingCycle/getAllExercises']
    );

    const allExercisesDates = computed(
      () => store.getters['storeTrainingCycle/getAllExercisesDates']
    );

    const genTrainingCycle = () => {
      const prepareTrainingPlan = {
        trainingPlanPeriod: {
          start: '2022/03/14',
          finish: '2022/04/30',
        },
        trainingPlan: [
          {
            id: 'id1',
            exerciseName: 'Приседание',
            trainingDay: 1,
            startingWeight: 30,
            additionalWeight: 2.5,
            repetitionsNumber: 8,
            exerciseSetNumber: 3,
            exerciseTime: '15:00',
            exerciseNotes: 'Разминка приседание 20 кг',
          },
          {
            id: 'id2',
            exerciseName: 'Отжимание от пола',
            trainingDay: 3,
            startingWeight: 5,
            additionalWeight: 1.25,
            repetitionsNumber: 8,
            exerciseSetNumber: 3,
            exerciseTime: '15:00',
            exerciseNotes: 'Разминка - отжимание со своим весом',
          },
          {
            id: 'id3',
            exerciseName: 'Становая тяга',
            trainingDay: 5,
            startingWeight: 50,
            additionalWeight: 2.5,
            repetitionsNumber: 8,
            exerciseSetNumber: 3,
            exerciseTime: '15:00',
            exerciseNotes: 'Разминка - отжимание со своим весом',
          },
          {
            id: 'id4',
            exerciseName: 'Подтягивание на турнике',
            trainingDay: 5,
            startingWeight: 0,
            additionalWeight: 0,
            repetitionsNumber: 8,
            exerciseSetNumber: 3,
            exerciseTime: '15:00',
            exerciseNotes: 'Подтягивание со своим весом',
          },
        ],
      };

      const readyTrainingCycle = [];
      const prepareOperatingWeight = [];

      let startTrainingPlanPeriodDate = new Date(prepareTrainingPlan.trainingPlanPeriod.start);
      let breakDate = '';
      let currentDay = 1;

      prepareTrainingPlan.trainingPlan.forEach((item) => {
        let currentOperatingWeight = item.startingWeight;
        let generatedOperatingWeight = [];
        while (true) {
          breakDate = date.formatDate(startTrainingPlanPeriodDate, 'YYYY/MM/DD');

          if (breakDate == prepareTrainingPlan.trainingPlanPeriod.finish) {
            startTrainingPlanPeriodDate = new Date(prepareTrainingPlan.trainingPlanPeriod.start);
            break;
          }

          currentDay = date.getDayOfWeek(startTrainingPlanPeriodDate);
          generatedOperatingWeight.push(currentOperatingWeight);
          currentOperatingWeight += item.additionalWeight;
          startTrainingPlanPeriodDate.setDate(startTrainingPlanPeriodDate.getDate() + 1);
        }
        prepareOperatingWeight.push({
          id: item.id,
          generatedOperatingWeight: generatedOperatingWeight,
        });
      });

      startTrainingPlanPeriodDate = new Date(prepareTrainingPlan.trainingPlanPeriod.start);
      breakDate = '';
      currentDay = 1;

      while (true) {
        breakDate = date.formatDate(startTrainingPlanPeriodDate, 'YYYY/MM/DD');

        if (breakDate == prepareTrainingPlan.trainingPlanPeriod.finish) {
          break;
        }

        currentDay = date.getDayOfWeek(startTrainingPlanPeriodDate);

        prepareTrainingPlan.trainingPlan.forEach((item) => {
          if (item.trainingDay == currentDay) {
            prepareOperatingWeight.forEach((item2) => {
              if (item.id == item2.id) {
                readyTrainingCycle.push({
                  id: uid(),
                  exerciseName: item.exerciseName,
                  trainingDay: item.trainingDay,
                  startingWeight: item.startingWeight,
                  additionalWeight: item.additionalWeight,
                  operatingWeight: item2.generatedOperatingWeight.shift(),
                  repetitionsNumber: item.repetitionsNumber,
                  exerciseSetNumber: item.exerciseSetNumber,
                  exerciseTime: item.exerciseTime,
                  exerciseDate: breakDate,
                  exerciseNotes: item.exerciseNotes,
                });
              }
            });
          }
        });

        startTrainingPlanPeriodDate.setDate(startTrainingPlanPeriodDate.getDate() + 1);
      }

      store.dispatch('storeTrainingCycle/setTrainingCycle', readyTrainingCycle);
      isGenTrainingCycle.value = true;
    };

    return {
      isGenTrainingCycle,
      allExercisesDates,
      dateNow,
      allExercises,
      genTrainingCycle,
    };
  },
});
</script>
