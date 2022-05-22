<template>
  <q-list separator class="list-wrapper">
    <q-item
      v-for="exercise in trainingPlan"
      :key="exercise.id"
      @click="showPopupEditDeleteExercise(exercise.id)"
      clickable
      v-ripple
      :class="{
        'bg-light-blue-1': exercise.count % 2 === 0,
        'bg-light-blue-2': exercise.count % 2 !== 0,
      }"
    >
      <q-item-section>
        <div>
          Упражнение №{{ exercise.count }}:
          <span class="text-weight-bold">{{ exercise.exerciseName }}</span>
        </div>
        <div>
          День тренировки:
          <span class="text-weight-bold">{{ exercise.trainingDayFull }}</span>
        </div>
        <div>
          Время тренировки:
          <span class="text-weight-bold">{{ exercise.exerciseTime }}</span>
        </div>
        <div>
          Стартовый вес:
          <span class="text-weight-bold">{{ exercise.startingWeight }} кг</span>
        </div>
        <div>
          Добавочный вес:
          <span class="text-weight-bold">{{ exercise.additionalWeight }} кг</span>
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
  </q-list>

  <q-dialog v-model="isAddExercise">
    <q-card>
      <q-card-section>
        <q-form @submit="addExercise" @reset="resetForm">
          <q-input
            outlined
            dense
            v-model="exerciseName"
            label="Упражнение *"
            lazy-rules
            type="text"
            :rules="[
              (val) => !!val || '* Пожалуйста введите название упражнения',
              (val) => val.length < 30 || 'Пожалуйста используйте максимум 30 символов',
            ]"
          />
          <q-select
            outlined
            dense
            v-model="trainingDay"
            :options="trainingDayOptions"
            label="День тренировки *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Пожалуйста введите день тренировки',
            ]"
          />

          <q-input
            outlined
            dense
            label="Время тренировки *"
            v-model="exerciseTime"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Пожалуйста введите время тренировки',
            ]"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="exerciseTime" mask="HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Ok" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            outlined
            dense
            v-model="startingWeight"
            label="Стартовый вес (кг) *"
            lazy-rules
            type="number"
            :rules="[
              (val) => (val && val.length > 0) || 'Пожалуйста введите стартовый вес',
            ]"
          />

          <q-select
            outlined
            dense
            v-model="additionalWeight"
            :options="additionalWeightOptions"
            label="Добавочный вес (кг) *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Пожалуйста введите добавочный вес',
            ]"
          />

          <q-input
            outlined
            dense
            v-model="repetitionsNumber"
            label="Количество повторений *"
            lazy-rules
            type="number"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Пожалуйста введите количество повторений',
            ]"
          />

          <q-input
            outlined
            dense
            v-model="exerciseSetNumber"
            label="Количество подходов *"
            lazy-rules
            type="number"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Пожалуйста введите количество подходов',
            ]"
          />

          <q-input
            outlined
            dense
            v-model="exerciseNotes"
            label="Заметки"
            lazy-rules
            type="text"
            :rules="[
              (val) => val.length < 30 || 'Пожалуйста используйте максимум 30 символов',
            ]"
          />

          <div class="q-mt-md">
            <q-btn label="OK" type="submit" color="primary" />
            <q-btn
              label="Отмена"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
              v-close-popup
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="isEditExercise">
    <q-card>
      <q-card-section>
        <q-form @submit="editExercise" @reset="resetForm">
          <q-input
            outlined
            dense
            v-model="exerciseName"
            label="Упражнение *"
            lazy-rules
            type="text"
            :rules="[
              (val) => !!val || '* Пожалуйста введите название упражнения',
              (val) => val.length < 30 || 'Пожалуйста используйте максимум 30 символов',
            ]"
          />
          <q-select
            outlined
            dense
            v-model="trainingDay"
            :options="trainingDayOptions"
            label="День тренировки *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Пожалуйста введите день тренировки',
            ]"
          />

          <q-input
            outlined
            dense
            label="Время тренировки *"
            v-model="exerciseTime"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Пожалуйста введите время тренировки',
            ]"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="exerciseTime" mask="HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Ok" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            outlined
            dense
            v-model="startingWeight"
            label="Стартовый вес (кг) *"
            lazy-rules
            type="number"
            :rules="[(val) => val > 0 || 'Пожалуйста введите стартовый вес']"
          />

          <q-select
            outlined
            dense
            v-model="additionalWeight"
            :options="additionalWeightOptions"
            label="Добавочный вес (кг) *"
            lazy-rules
            :rules="[(val) => val > 0 || 'Пожалуйста введите добавочный вес']"
          />

          <q-input
            outlined
            dense
            v-model="repetitionsNumber"
            label="Количество повторений *"
            lazy-rules
            type="number"
            :rules="[(val) => val > 0 || 'Пожалуйста введите количество повторений']"
          />

          <q-input
            outlined
            dense
            v-model="exerciseSetNumber"
            label="Количество подходов *"
            lazy-rules
            type="number"
            :rules="[(val) => val > 0 || 'Пожалуйста введите количество подходов']"
          />

          <q-input
            outlined
            dense
            v-model="exerciseNotes"
            label="Заметки"
            lazy-rules
            type="text"
            :rules="[
              (val) => val.length < 30 || 'Пожалуйста используйте максимум 30 символов',
            ]"
          />

          <div class="q-mt-md">
            <q-btn label="OK" type="submit" color="primary" />
            <q-btn
              label="Отмена"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
              v-close-popup
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-page-sticky position="bottom" :offset="[18, 18]">
    <q-btn @click="isAddExercise = !isAddExercise" fab icon="add" color="primary" />
  </q-page-sticky>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { uid, useQuasar } from 'quasar'
import { useStore } from 'vuex'
import { useNotifSchedule } from 'src/use/useNotifSchedule'
import { useExport } from 'src/use/useExport'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const store = useStore()
const $q = useQuasar()
const { cordovaNotifSchedule } = useNotifSchedule()
const { trainingDaySwitch } = useExport()
const isAddExercise = ref(false)
const isEditExercise = ref(false)
const exerciseName = ref('')
const trainingDay = ref('')
const startingWeight = ref('')
const additionalWeight = ref('')
const repetitionsNumber = ref('')
const exerciseSetNumber = ref('')
const exerciseTime = ref('00:00')
const exerciseNotes = ref('')
const currentExerciseId = ref('')
const currentExerciseTrainingDay = ref(1)
const trainingDayOptions = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
]
const additionalWeightOptions = ['1.25', '2.5', '5', '10', '15', '20', '25']
let countExercises = 1

const trainingPlan = computed(() =>
  store.getters['storeTrainingPlan/getTrainingPlan'].map((item) => {
    return {
      id: item.id,
      count: countExercises++,
      exerciseName: item.exerciseName,
      trainingDay: item.trainingDay,
      trainingDayFull: item.trainingDayFull,
      exerciseTime: item.exerciseTime,
      startingWeight: item.startingWeight,
      additionalWeight: item.additionalWeight,
      repetitionsNumber: item.repetitionsNumber,
      exerciseSetNumber: item.exerciseSetNumber,
      exerciseNotes: item.exerciseNotes,
    }
  })
)

const addExercise = () => {
  let trainingDayNum = trainingDaySwitch(trainingDay.value, 1)

  const exerciseData = {
    id: uid(),
    exerciseName: exerciseName.value.trim(),
    trainingDay: trainingDayNum,
    trainingDayFull: trainingDay.value,
    startingWeight: parseInt(startingWeight.value),
    additionalWeight: parseFloat(additionalWeight.value),
    repetitionsNumber: parseInt(repetitionsNumber.value),
    exerciseSetNumber: parseInt(exerciseSetNumber.value),
    exerciseTime: exerciseTime.value,
    exerciseNotes: exerciseNotes.value.trim(),
  }
  store.dispatch('storeTrainingPlan/addExercise', exerciseData)
  resetForm()
  emit('update:modelValue', true)
  countExercises = 1
}

const editExercise = () => {
  let trainingDayNum = trainingDaySwitch(
    trainingDay.value,
    currentExerciseTrainingDay.value
  )

  const exerciseData = {
    id: currentExerciseId.value,
    exerciseName: exerciseName.value.trim(),
    trainingDay: trainingDayNum,
    trainingDayFull: trainingDay.value,
    startingWeight: parseInt(startingWeight.value),
    additionalWeight: parseFloat(additionalWeight.value),
    repetitionsNumber: parseInt(repetitionsNumber.value),
    exerciseSetNumber: parseInt(exerciseSetNumber.value),
    exerciseTime: exerciseTime.value,
    exerciseNotes: exerciseNotes.value.trim(),
  }
  store.dispatch('storeTrainingPlan/editExercise', exerciseData)
  resetForm()
  isEditExercise.value = false
  countExercises = 1
}

const resetForm = () => {
  exerciseName.value = ''
  trainingDay.value = ''
  startingWeight.value = ''
  additionalWeight.value = ''
  repetitionsNumber.value = ''
  exerciseSetNumber.value = ''
  exerciseTime.value = '00:00'
  exerciseNotes.value = ''
  isAddExercise.value = false
}

const showPopupEditDeleteExercise = (id) => {
  const currentExercise = trainingPlan.value.find((item) => item.id === id)
  $q.dialog({
    title: 'Упражнение №' + currentExercise.count,
    message: currentExercise.exerciseName,
    persistent: true,
    cancel: {
      color: 'primary',
      label: 'изменить',
    },
    ok: {
      color: 'negative',
      label: 'удалить',
    },
  })
    .onOk(() => {
      store.dispatch('storeTrainingPlan/deleteExercise', id)
      countExercises = 1
    })
    .onCancel(() => {
      exerciseName.value = currentExercise.exerciseName
      trainingDay.value = currentExercise.trainingDayFull
      startingWeight.value = currentExercise.startingWeight
      additionalWeight.value = currentExercise.additionalWeight
      repetitionsNumber.value = currentExercise.repetitionsNumber
      exerciseSetNumber.value = currentExercise.exerciseSetNumber
      exerciseTime.value = currentExercise.exerciseTime
      exerciseNotes.value = currentExercise.exerciseNotes
      currentExerciseId.value = currentExercise.id
      currentExerciseTrainingDay.value = currentExercise.trainingDay
      isEditExercise.value = true
    })
}

onMounted(() => {
  cordovaNotifSchedule()
})
</script>

<style lang="scss">
.q-select__dialog {
  min-width: 250px !important;
  max-width: 300px !important;
}
.q-item {
  padding: 10px 20px;
}
.list-wrapper {
  margin: 80px 0px 80px 0px;
  max-width: 300px;
}
</style>
