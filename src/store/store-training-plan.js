const state = () => ({
  prepareTrainingPlan: {
    trainingPlanPeriod: {
      // start: '2022/03/14',
      // finish: '2022/04/30',
    },
    trainingPlan: [
      // {
      //   id: 'id1',
      //   exerciseName: 'Приседание',
      //   trainingDay: 1,
      //   startingWeight: 30,
      //   additionalWeight: 2.5,
      //   repetitionsNumber: 8,
      //   exerciseSetNumber: 3,
      //   exerciseTime: '15:00',
      //   exerciseNotes: 'Разминка приседание 20 кг',
      // },
      // {
      //   id: 'id2',
      //   exerciseName: 'Отжимание от пола',
      //   trainingDay: 3,
      //   startingWeight: 5,
      //   additionalWeight: 1.25,
      //   repetitionsNumber: 8,
      //   exerciseSetNumber: 3,
      //   exerciseTime: '15:00',
      //   exerciseNotes: 'Разминка - отжимание со своим весом',
      // },
      // {
      //   id: 'id3',
      //   exerciseName: 'Становая тяга',
      //   trainingDay: 5,
      //   startingWeight: 50,
      //   additionalWeight: 2.5,
      //   repetitionsNumber: 8,
      //   exerciseSetNumber: 3,
      //   exerciseTime: '15:00',
      //   exerciseNotes: 'Разминка - отжимание со своим весом',
      // },
      // {
      //   id: 'id4',
      //   exerciseName: 'Подтягивание на турнике',
      //   trainingDay: 5,
      //   startingWeight: 0,
      //   additionalWeight: 0,
      //   repetitionsNumber: 8,
      //   exerciseSetNumber: 3,
      //   exerciseTime: '15:00',
      //   exerciseNotes: 'Подтягивание со своим весом',
      // },
    ],
  },
  trainingCycle: [
    // {
    //   id: 'id1',
    //   exerciseName: 'Приседание',
    //   trainingDay: '1',
    //   operatingWeight: '50',
    //   repetitionsNumber: '8',
    //   exerciseSetNumber: '3',
    //   exerciseTime: '15:00',
    //   exerciseDate: '2022/03/11',
    // },
    // {
    //   id: 'id2',
    //   exerciseName: 'Отжимание от пола',
    //   trainingDay: '3',
    //   operatingWeight: '20',
    //   repetitionsNumber: '8',
    //   exerciseSetNumber: '3',
    //   exerciseTime: '15:00',
    //   exerciseDate: '2022/03/16',
    // },
    // {
    //   id: 'id3',
    //   exerciseName: 'Становая тяга',
    //   trainingDay: '5',
    //   operatingWeight: '70',
    //   repetitionsNumber: '8',
    //   exerciseSetNumber: '3',
    //   exerciseTime: '15:00',
    //   exerciseDate: '2022/03/18',
    // },
    // {
    //   id: 'id4',
    //   exerciseName: 'Подтягивание на турнике',
    //   trainingDay: '5',
    //   operatingWeight: '10',
    //   repetitionsNumber: '8',
    //   exerciseSetNumber: '3',
    //   exerciseTime: '15:00',
    //   exerciseDate: '2022/03/18',
    // },
  ],
});

const mutations = {
  setTrainingCycle(state, payload) {
    state.trainingCycle = payload;
  },
  addExercise(state, payload) {
    state.prepareTrainingPlan.trainingPlan.push(payload);
  },
  setTrainingPlanPeriod(state, payload) {
    state.prepareTrainingPlan.trainingPlanPeriod.start = payload.start;
    state.prepareTrainingPlan.trainingPlanPeriod.finish = payload.finish;
  }
};

const actions = {
  setTrainingCycle({ commit }, payload) {
    commit('setTrainingCycle', payload);
  },
  addExercise({ commit }, payload) {
    commit('addExercise', payload);
  },
  setTrainingPlanPeriod({ commit }, payload) {
    commit('setTrainingPlanPeriod', payload);
  }
};

const getters = {
  getAllExercises(state) {
    return state.trainingCycle;
  },
  getAllExercisesDates(state) {
    return state.trainingCycle.map((item) => item.exerciseDate);
  },
  getPrepareTrainingPlan(state) {
    return state.prepareTrainingPlan;
  },
  getTrainingPlan(state) {
    return state.prepareTrainingPlan.trainingPlan;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
