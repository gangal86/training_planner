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
        <q-item v-if="isTrainingCalendar" @click="editTrainingProgram" clickable>
          <q-item-section avatar>
            <q-icon name="edit" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Изменить тренировочный план</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="isTrainingCalendar" @click="deleteTrainingProgram" clickable>
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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'MainLayout',
  setup() {
    const store = useStore();
    const leftDrawerOpen = ref(false);
    const isTrainingCalendar = computed(() => store.getters['storeTrainingPlan/getIsTrainingCalendar']);

    const editTrainingProgram = () => {
      console.log('editTrainingProgram');
    };

    const deleteTrainingProgram = () => {
      console.log('deleteTrainingProgram');
    };

    const showAboutProgram = () => {
      console.log('showAboutProgram');
    };

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    return {
      leftDrawerOpen,
      isTrainingCalendar,
      editTrainingProgram,
      deleteTrainingProgram,
      showAboutProgram,
      toggleLeftDrawer,
    };
  },
};
</script>
