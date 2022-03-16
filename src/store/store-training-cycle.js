const state = () => ({
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
};

const actions = {
  setTrainingCycle({ commit }, payload) {
    commit('setTrainingCycle', payload);
  },
};

const getters = {
  getAllExercises(state) {
    return state.trainingCycle;
  },
  getAllExercisesDates(state) {
    return state.trainingCycle.map((item) => item.exerciseDate);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
