<template>
  <q-btn label="Составить программу тренировок" color="primary" />

  <q-form @submit="addExercise" @reset="resetForm" class="q-gutter-md">
    <q-input
      filled
      v-model="exerciseName"
      label="exerciseName *"
      hint="Name and surname"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      filled
      v-model="trainingDay"
      label="trainingDay *"
      hint="Name and surname"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      filled
      v-model="startingWeight"
      label="startingWeight *"
      hint="Name and surname"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      filled
      v-model="additionalWeight"
      label="additionalWeight *"
      hint="Name and surname"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      filled
      v-model="repetitionsNumber"
      label="repetitionsNumber *"
      hint="Name and surname"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      filled
      v-model="exerciseSetNumber"
      label="exerciseSetNumber *"
      hint="Name and surname"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      filled
      v-model="exerciseTime"
      label="exerciseTime *"
      hint="Name and surname"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      filled
      v-model="exerciseNotes"
      label="exerciseNotes *"
      hint="Name and surname"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />

    <div>
      <q-btn label="Submit" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script>
import { ref } from 'vue';
import { uid } from 'quasar';
import { useStore } from 'vuex';

export default {
  name: 'TrainingProgram',
  setup() {
    const store = useStore();
    const exerciseName = ref('');
    const trainingDay = ref('');
    const startingWeight = ref('');
    const additionalWeight = ref('');
    const repetitionsNumber = ref('');
    const exerciseSetNumber = ref('');
    const exerciseTime = ref('');
    const exerciseNotes = ref('');

    const addExercise = () => {
      const exerciseData = {
        id: uid(),
        exerciseName: exerciseName.value,
        trainingDay: parseInt(trainingDay.value),
        startingWeight: parseInt(startingWeight.value),
        additionalWeight: parseFloat(additionalWeight.value),
        repetitionsNumber: parseInt(repetitionsNumber.value),
        exerciseSetNumber: parseInt(exerciseSetNumber.value),
        exerciseTime: exerciseTime.value,
        exerciseNotes: exerciseNotes.value,
      };
      store.dispatch('storeTrainingPlan/addExercise', exerciseData);
    };

    const resetForm = () => {
      console.log('resetForm');
    };

    return {
      exerciseName,
      trainingDay,
      startingWeight,
      additionalWeight,
      repetitionsNumber,
      exerciseSetNumber,
      exerciseTime,
      exerciseNotes,
      addExercise,
      resetForm,
    };
  },
};
</script>
