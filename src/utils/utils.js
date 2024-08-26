export default {
  todayDate() {
    let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
    return days[new Date().getDay()]
  },

  timeToDate(hours, minutes) {
    const now = new Date()
    now.setHours(hours)
    now.setMinutes(minutes)
    return now
  }
}
