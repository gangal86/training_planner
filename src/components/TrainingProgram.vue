<template>
  <q-list separator class="q-my-md">
    <q-btn
      @click="isAddExercise = !isAddExercise"
      label="Добавить упражнение"
      color="primary"
      no-caps
    />
    <q-item
      v-for="exercise in trainingPlan"
      :key="exercise.id"
      clickable
      v-ripple
    >
      <q-item-section>{{ exercise.exerciseName }}</q-item-section>
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
              (val) =>
                (val && val.length > 0) ||
                'Пожалуйста введите название упражнения',
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
              (val) =>
                (val && val.length > 0) || 'Пожалуйста введите день тренировки',
            ]"
          />

          <q-input
            outlined
            dense
            label="Время тренировки *"
            v-model="exerciseTime"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Пожалуйста введите время тренировки',
            ]"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
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
              (val) =>
                (val && val.length > 0) || 'Пожалуйста введите стартовый вес',
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
              (val) =>
                (val && val.length > 0) || 'Пожалуйста введите добавочный вес',
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
                (val && val.length > 0) ||
                'Пожалуйста введите количество повторений',
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
                (val && val.length > 0) ||
                'Пожалуйста введите количество подходов',
            ]"
          />

          <q-input
            outlined
            dense
            v-model="exerciseNotes"
            label="Заметки"
            lazy-rules
            type="text"
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
</template>

<script>
import { ref, computed } from 'vue';
import { uid } from 'quasar';
import { useStore } from 'vuex';

export default {
  name: 'TrainingProgram',
  props: ['modelValue'], 
  emits: ['update:modelValue'],
  setup(props, context) {
    const store = useStore();
    const isAddExercise = ref(false);
    const exerciseName = ref('');
    const trainingDay = ref('');
    const startingWeight = ref('');
    const additionalWeight = ref('');
    const repetitionsNumber = ref('');
    const exerciseSetNumber = ref('');
    const exerciseTime = ref('00:00');
    const exerciseNotes = ref('');
    const trainingDayOptions = [
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
      'Воскресенье',
    ];
    const additionalWeightOptions = [
      '1.25',
      '2.5',
      '5',
      '10',
      '15',
      '20',
      '25',
    ];

    const trainingPlan = computed(
      () => store.getters['storeTrainingPlan/getTrainingPlan']
    );

    const addExercise = () => {
      let trainingDayNum = 1;
      switch (trainingDay.value) {
        case 'Понедельник':
          trainingDayNum = 1;
          break;
        case 'Вторник':
          trainingDayNum = 2;
          break;
        case 'Среда':
          trainingDayNum = 3;
          break;
        case 'Четверг':
          trainingDayNum = 4;
          break;
        case 'Пятница':
          trainingDayNum = 5;
          break;
        case 'Суббота':
          trainingDayNum = 6;
          break;
        case 'Воскресенье':
          trainingDayNum = 7;
          break;
      }

      const exerciseData = {
        id: uid(),
        exerciseName: exerciseName.value.trim(),
        trainingDay: trainingDayNum,
        startingWeight: parseInt(startingWeight.value),
        additionalWeight: parseFloat(additionalWeight.value),
        repetitionsNumber: parseInt(repetitionsNumber.value),
        exerciseSetNumber: parseInt(exerciseSetNumber.value),
        exerciseTime: exerciseTime.value,
        exerciseNotes: exerciseNotes.value.trim(),
      };
      store.dispatch('storeTrainingPlan/addExercise', exerciseData);
      resetForm();
      context.emit('update:modelValue', true);
    };

    const resetForm = () => {
      exerciseName.value = '';
      trainingDay.value = '';
      startingWeight.value = '';
      additionalWeight.value = '';
      repetitionsNumber.value = '';
      exerciseSetNumber.value = '';
      exerciseTime.value = '00:00';
      exerciseNotes.value = '';
      isAddExercise.value = false;
    };

    return {
      isAddExercise,
      exerciseName,
      trainingDay,
      startingWeight,
      additionalWeight,
      repetitionsNumber,
      exerciseSetNumber,
      exerciseTime,
      exerciseNotes,
      trainingDayOptions,
      additionalWeightOptions,
      trainingPlan,
      addExercise,
      resetForm,
    };
  },
};
</script>

<style lang="scss">
.q-select__dialog {
  min-width: 250px !important;
  max-width: 300px !important;
}
</style>
