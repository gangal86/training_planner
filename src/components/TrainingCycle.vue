<template>
  <q-page-sticky position="top" :offset="[18, 18]">
    <q-btn
      @click="isGenTrainingCycle = !isGenTrainingCycle"
      fab-mini
      no-caps
      padding="10px 14px"
      label="Сгенерировать тренировочный цикл"
      color="primary"
    />
  </q-page-sticky>
  <q-dialog v-model="isGenTrainingCycle">
    <q-card>
      <q-card-section>
        <q-input
          filled
          v-model="startTrainingPlanPeriod"
          mask="date"
          :rules="['date']"
          hint="Начало тренировочного цикла"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="startTrainingPlanPeriod" :locale="calendarLocaleRu">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Ok" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          filled
          v-model="finishTrainingPlanPeriod"
          mask="date"
          :rules="['date']"
          hint="Конец тренировочного цикла"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="finishTrainingPlanPeriod" :locale="calendarLocaleRu">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Ok" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <div class="q-mt-md">
          <q-btn label="OK" @click="genTrainingCycle" color="primary" v-close-popup />
          <q-btn label="Отмена" color="primary" flat class="q-ml-sm" v-close-popup />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { date, uid } from 'quasar'
import { useStore } from 'vuex'
import { useNotifSchedule } from 'src/use/useNotifSchedule'
import { useExport } from 'src/use/useExport'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'update:isTrainingProgram'])
const store = useStore()
const { calendarLocaleRu } = useExport()
const { cordovaNotifSchedule } = useNotifSchedule()
const isGenTrainingCycle = ref(false)
const startTrainingPlanPeriod = ref(date.formatDate(Date.now(), 'YYYY/MM/DD'))
const dateNowTrainingPlanPeriod = new Date(Date.now())
dateNowTrainingPlanPeriod.setDate(dateNowTrainingPlanPeriod.getDate() + 90)
const finishTrainingPlanPeriod = ref(
  date.formatDate(dateNowTrainingPlanPeriod, 'YYYY/MM/DD')
)

const genTrainingCycle = () => {
  const trainingPlanPeriod = {
    start: startTrainingPlanPeriod.value,
    finish: finishTrainingPlanPeriod.value,
  }
  store.dispatch('storeTrainingPlan/setTrainingPlanPeriod', trainingPlanPeriod)
  const prepareTrainingPlan = computed(
    () => store.getters['storeTrainingPlan/getPrepareTrainingPlan']
  )

  const readyTrainingCycle = []
  const prepareOperatingWeight = []

  let startTrainingPlanPeriodDate = new Date(
    prepareTrainingPlan.value.trainingPlanPeriod.start
  )
  let breakDate = ''
  let currentDay = 1

  prepareTrainingPlan.value.trainingPlan.forEach((item) => {
    let currentOperatingWeight = item.startingWeight
    let generatedOperatingWeight = []
    while (true) {
      breakDate = date.formatDate(startTrainingPlanPeriodDate, 'YYYY/MM/DD')

      if (breakDate == prepareTrainingPlan.value.trainingPlanPeriod.finish) {
        startTrainingPlanPeriodDate = new Date(
          prepareTrainingPlan.value.trainingPlanPeriod.start
        )
        break
      }

      currentDay = date.getDayOfWeek(startTrainingPlanPeriodDate)
      generatedOperatingWeight.push(currentOperatingWeight)
      currentOperatingWeight += item.additionalWeight
      startTrainingPlanPeriodDate.setDate(startTrainingPlanPeriodDate.getDate() + 1)
    }
    prepareOperatingWeight.push({
      id: item.id,
      generatedOperatingWeight: generatedOperatingWeight,
    })
  })

  startTrainingPlanPeriodDate = new Date(
    prepareTrainingPlan.value.trainingPlanPeriod.start
  )
  breakDate = ''
  currentDay = 1

  while (true) {
    breakDate = date.formatDate(startTrainingPlanPeriodDate, 'YYYY/MM/DD')

    if (breakDate == prepareTrainingPlan.value.trainingPlanPeriod.finish) {
      break
    }

    currentDay = date.getDayOfWeek(startTrainingPlanPeriodDate)

    prepareTrainingPlan.value.trainingPlan.forEach((item) => {
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
            })
          }
        })
      }
    })

    startTrainingPlanPeriodDate.setDate(startTrainingPlanPeriodDate.getDate() + 1)
  }
  store.dispatch('storeTrainingPlan/setTrainingCycle', readyTrainingCycle)
  emit('update:modelValue', true)
  emit('update:isTrainingProgram', false)
  cordovaNotifSchedule()
}
</script>
