export function getDate() {
    let todayDate = new Date()
    const offset = todayDate.getTimezoneOffset()
    todayDate = new Date(todayDate.getTime() - (offset * 60 * 1000))
    return todayDate.toISOString().split('T')[0]
}