/**
 * format Date item to dd/mm/yyyy
 * @param dateToFormmat - Date object
 * @returns - the date in string format
 */
export function formatDate(dateToFormmat: Date) : string{
    const today: Date = new Date();
    const yyyy: string = today.getFullYear().toString();
    let mm: number = today.getMonth() + 1; // Months start at 0!
    let dd: number = today.getDate();
    let day: string = dd.toString();
    let month: string = mm.toString();
    if (dd < 10) day = '0' + dd;
    if (mm < 10) month = '0' + mm;
    const formattedToday = day + '/' + month + '/' + yyyy;
    return formattedToday;
}