export function useExport() {
  const calendarLocaleRu = {
    days: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split('_'),
    daysShort: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
    months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
    monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_'),
  }

  function trainingDaySwitch(trainingDay, trainingDayNum) {
    switch (trainingDay) {
      case 'Понедельник':
        trainingDayNum = 1
        break
      case 'Вторник':
        trainingDayNum = 2
        break
      case 'Среда':
        trainingDayNum = 3
        break
      case 'Четверг':
        trainingDayNum = 4
        break
      case 'Пятница':
        trainingDayNum = 5
        break
      case 'Суббота':
        trainingDayNum = 6
        break
      case 'Воскресенье':
        trainingDayNum = 7
        break
    }

    return trainingDayNum
  }

  return {
    calendarLocaleRu,
    trainingDaySwitch,
  }
}
