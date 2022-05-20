<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Training Planner </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Меню </q-item-label>
        <q-item v-if="isTrainingCycle" @click="editTrainingPlan" clickable>
          <q-item-section avatar>
            <q-icon name="edit" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Изменить тренировочный план</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="isTrainingCycle" @click="deleteTrainingPlan" clickable>
          <q-item-section avatar>
            <q-icon name="delete" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Удалить тренировочный план</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="showAboutProgram">
          <q-item-section avatar>
            <q-icon name="bookmark_border" />
          </q-item-section>

          <q-item-section>
            <q-item-label>О программе</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <AboutProgramDialog v-model="isAboutProgram" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar'
import AboutProgramDialog from 'components/dialogs/AboutProgramDialog.vue';

export default {
  name: 'MainLayout',
  components: {
    AboutProgramDialog
  },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);
    const isAboutProgram = ref(false);

    const isTrainingCycle = computed(() => store.getters['storeTrainingPlan/getIsTrainingCycle']);

    const editTrainingPlan = () => {
      store.dispatch('storeTrainingPlan/updateIsTrainingProgram', true);
      store.dispatch('storeTrainingPlan/updateIsTrainingCycle', true);
      store.dispatch('storeTrainingPlan/updateIsTrainingCalendar', false);
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const deleteTrainingPlan = () => {
      $q.dialog({
        title: 'Удалить тренировочный план',
        message: 'Это действие необратимо',
        cancel: {
          flat: true,
          label: 'отмена'
        },
        persistent: true
      }).onOk(() => {
        store.dispatch('storeTrainingPlan/deleteTrainingPlan');
        leftDrawerOpen.value = !leftDrawerOpen.value;
      });
    };

    const showAboutProgram = () => {
      isAboutProgram.value = !isAboutProgram.value;
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    return {
      leftDrawerOpen,
      isTrainingCycle,
      isAboutProgram,
      editTrainingPlan,
      deleteTrainingPlan,
      showAboutProgram,
      toggleLeftDrawer,
    };
  },
};
</script>
