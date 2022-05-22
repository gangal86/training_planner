<template>
  <div style="max-width: 400px">
    <div class="row justify-center">
      <q-date
        v-model="dateNow"
        mask="YYYY/MM/DD"
        :events="allExercisesDates"
        event-color="orange"
        :locale="calendarLocaleRu"
        first-day-of-week="1"
        class="col q-mt-md q-mx-md"
      />
    </div>
    <q-card class="q-mx-md">
      <q-card-section>
        <q-list separator class="q-my-xs">
          <template v-for="exercise in allExercises" :key="exercise.id">
            <q-item v-if="exercise.exerciseDate === dateNow.toString()">
              <q-item-section>
                <div>
                  Упражнение:
                  <span class="text-weight-bold">{{ exercise.exerciseName }}</span>
                </div>
                <div>
                  Время тренировки:
                  <span class="text-weight-bold">{{ exercise.exerciseTime }}</span>
                </div>
                <div>
                  Рабочий вес:
                  <span class="text-weight-bold">{{ exercise.operatingWeight }} кг</span>
                </div>
                <div>
                  Количество повторений:
                  <span class="text-weight-bold">{{ exercise.repetitionsNumber }}</span>
                </div>
                <div>
                  Количество подходов:
                  <span class="text-weight-bold">{{ exercise.exerciseSetNumber }}</span>
                </div>
                <div>
                  Заметки:
                  <span class="text-weight-bold">{{ exercise.exerciseNotes }}</span>
                </div>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { date } from 'quasar'
import { useExport } from 'src/use/useExport'

const store = useStore()
const isAddExercise = ref(false)
const { calendarLocaleRu } = useExport()

const dateNow = ref(date.formatDate(Date.now(), 'YYYY/MM/DD'))

const allExercises = computed(() => store.getters['storeTrainingPlan/getAllExercises'])

const allExercisesDates = computed(
  () => store.getters['storeTrainingPlan/getAllExercisesDates']
)
</script>
