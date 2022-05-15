import { computed } from 'vue';
import { useStore } from 'vuex';

//https://github.com/katzer/cordova-plugin-local-notifications
export function useNotifSchedule() {
  const store = useStore();
  const notifyTrainingList = computed(
    () => store.getters['storeTrainingPlan/getNotifyTrainingList']
  );

  const cordovaNotifSchedule = () => {
    cordova.plugins.notification.local.schedule(notifyTrainingList.value);
  }

  return {
    cordovaNotifSchedule
  };
}
