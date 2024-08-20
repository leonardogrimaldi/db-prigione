export function getDate() {
    let todayDate = new Date()
    const offset = todayDate.getTimezoneOffset()
    todayDate = new Date(todayDate.getTime() - (offset * 60 * 1000))
    return todayDate.toISOString().split('T')[0]
}

export function getWeekNumber(date: Date){
    var d: Date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7)
};

export const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')