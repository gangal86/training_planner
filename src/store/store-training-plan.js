import { date } from 'quasar';

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
    //   exerciseTime: '17:00',
    //   exerciseDate: '2022/05/12',
    // },
    // {
    //   id: 'id2',
    //   exerciseName: 'Отжимание от пола',
    //   trainingDay: '3',
    //   operatingWeight: '20',
    //   repetitionsNumber: '8',
    //   exerciseSetNumber: '3',
    //   exerciseTime: '15:00',
    //   exerciseDate: '2022/05/16',
    // },
    // {
    //   id: 'id3',
    //   exerciseName: 'Становая тяга',
    //   trainingDay: '5',
    //   operatingWeight: '70',
    //   repetitionsNumber: '8',
    //   exerciseSetNumber: '3',
    //   exerciseTime: '14:10',
    //   exerciseDate: '2022/05/15',
    // },
    // {
    //   id: 'id4',
    //   exerciseName: 'Подтягивание на турнике',
    //   trainingDay: '5',
    //   operatingWeight: '10',
    //   repetitionsNumber: '8',
    //   exerciseSetNumber: '3',
    //   exerciseTime: '14:11',
    //   exerciseDate: '2022/05/15',
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
  },
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
  },
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
  getNotifyTrainingList(state) {
    const dateNow = date.formatDate(Date.now(), 'YYYY/MM/DD');
    let idCount = 1;
    return state.trainingCycle
      .filter(
        (item) =>
          new Date(item.exerciseDate).getTime() >=
          new Date(dateNow).getTime()
      )
      .map((item) => {
        return {
          id: idCount++,
          title: 'Тренировка',
          text: 'Выполните упражнение - ' + item.exerciseName,
          trigger: { at: new Date(item.exerciseDate +' '+item.exerciseTime) },
          foreground: true,
          vibrate: true
        };
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
