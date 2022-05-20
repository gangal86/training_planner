import { date, LocalStorage } from 'quasar'

const state = () => ({
  prepareTrainingPlan: {
    trainingPlanPeriod: {
      // start: '2022/03/14',
      // finish: '2022/04/30',
    },
    trainingPlan: LocalStorage.has('trainingPlan') ? LocalStorage.getItem('trainingPlan') : [],
    //trainingPlan: [
    // {
    //   id: 'id1',
    //   exerciseName: 'Приседание',
    //   trainingDay: 1,
    //   trainingDayFull: 'Понедельник',
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
    //   trainingDayFull: 'Среда',
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
    //   trainingDayFull: 'Пятница',
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
    //   trainingDayFull: 'Пятница',
    //   startingWeight: 0,
    //   additionalWeight: 0,
    //   repetitionsNumber: 8,
    //   exerciseSetNumber: 3,
    //   exerciseTime: '15:00',
    //   exerciseNotes: 'Подтягивание со своим весом',
    // },
    //],
  },
  trainingCycle: LocalStorage.has('trainingCycle') ? LocalStorage.getItem('trainingCycle') : [],
  //trainingCycle: [
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
  //],
  isTrainingProgram: LocalStorage.has('isTrainingProgram') ? LocalStorage.getItem('isTrainingProgram') : true,
  isTrainingCycle: LocalStorage.has('isTrainingCycle') ? LocalStorage.getItem('isTrainingCycle') : false,
  isTrainingCalendar: LocalStorage.has('isTrainingCalendar') ? LocalStorage.getItem('isTrainingCalendar') : false,
})

const mutations = {
  setTrainingCycle(state, payload) {
    state.trainingCycle = payload
    LocalStorage.set('trainingCycle', state.trainingCycle)
  },
  addExercise(state, payload) {
    state.prepareTrainingPlan.trainingPlan.push(payload)
    LocalStorage.set('trainingPlan', state.prepareTrainingPlan.trainingPlan)
  },
  setTrainingPlanPeriod(state, payload) {
    state.prepareTrainingPlan.trainingPlanPeriod.start = payload.start
    state.prepareTrainingPlan.trainingPlanPeriod.finish = payload.finish
  },
  updateIsTrainingProgram(state, payload) {
    state.isTrainingProgram = payload
    LocalStorage.set('isTrainingProgram', state.isTrainingProgram)
  },
  updateIsTrainingCycle(state, payload) {
    state.isTrainingCycle = payload
    LocalStorage.set('isTrainingCycle', state.isTrainingCycle)
  },
  updateIsTrainingCalendar(state, payload) {
    state.isTrainingCalendar = payload
    LocalStorage.set('isTrainingCalendar', state.isTrainingCalendar)
  },
  deleteTrainingPlan(state) {
    state.prepareTrainingPlan.trainingPlanPeriod = {}
    state.prepareTrainingPlan.trainingPlan = []
    state.trainingCycle = []
    state.isTrainingProgram = true
    state.isTrainingCycle = false
    state.isTrainingCalendar = false
    LocalStorage.set('trainingPlan', state.prepareTrainingPlan.trainingPlan)
    LocalStorage.set('trainingCycle', state.trainingCycle)
    LocalStorage.set('isTrainingProgram', state.isTrainingProgram)
    LocalStorage.set('isTrainingCycle', state.isTrainingCycle)
    LocalStorage.set('isTrainingCalendar', state.isTrainingCalendar)
  },
  deleteExercise(state, id) {
    state.prepareTrainingPlan.trainingPlan = state.prepareTrainingPlan.trainingPlan.filter((item) => item.id !== id)
    LocalStorage.set('trainingPlan', state.prepareTrainingPlan.trainingPlan)
  },
  editExercise(state, payload) {
    state.prepareTrainingPlan.trainingPlan = state.prepareTrainingPlan.trainingPlan.filter(
      (item) => item.id !== payload.id
    )
    state.prepareTrainingPlan.trainingPlan.push(payload)
    LocalStorage.set('trainingPlan', state.prepareTrainingPlan.trainingPlan)
  },
}

const actions = {
  setTrainingCycle({ commit }, payload) {
    commit('setTrainingCycle', payload)
  },
  addExercise({ commit }, payload) {
    commit('addExercise', payload)
  },
  setTrainingPlanPeriod({ commit }, payload) {
    commit('setTrainingPlanPeriod', payload)
  },
  updateIsTrainingProgram({ commit }, payload) {
    commit('updateIsTrainingProgram', payload)
  },
  updateIsTrainingCycle({ commit }, payload) {
    commit('updateIsTrainingCycle', payload)
  },
  updateIsTrainingCalendar({ commit }, payload) {
    commit('updateIsTrainingCalendar', payload)
  },
  deleteTrainingPlan({ commit }) {
    commit('deleteTrainingPlan')
  },
  deleteExercise({ commit }, id) {
    commit('deleteExercise', id)
  },
  editExercise({ commit }, payload) {
    commit('editExercise', payload)
  },
}

const getters = {
  getAllExercises(state) {
    return state.trainingCycle
  },
  getAllExercisesDates(state) {
    return state.trainingCycle.map((item) => item.exerciseDate)
  },
  getPrepareTrainingPlan(state) {
    return state.prepareTrainingPlan
  },
  getTrainingPlan(state) {
    return state.prepareTrainingPlan.trainingPlan
  },
  getNotifyTrainingList(state) {
    const dateNow = date.formatDate(Date.now(), 'YYYY/MM/DD')
    let idCount = 1
    return state.trainingCycle
      .filter((item) => new Date(item.exerciseDate).getTime() >= new Date(dateNow).getTime())
      .map((item) => {
        return {
          id: idCount++,
          title: 'Тренировка',
          text: 'Выполните упражнение - ' + item.exerciseName,
          trigger: {
            at: new Date(item.exerciseDate + ' ' + item.exerciseTime),
          },
          foreground: true,
          vibrate: true,
        }
      })
  },
  getIsTrainingProgram(state) {
    return state.isTrainingProgram
  },
  getIsTrainingCycle(state) {
    return state.isTrainingCycle
  },
  getIsTrainingCalendar(state) {
    return state.isTrainingCalendar
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
