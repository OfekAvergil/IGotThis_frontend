import { eventTask } from "./stores/eventsStore";

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

export function convertStringToTasks(str: string): eventTask[] {
    // Split the string by newline characters
    const lines = str.split("\n"); 
    const tasks: eventTask[] = [];
    // Remove leading/trailing whitespaces
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim(); 
      // Ignore empty lines
      if (line.length > 0) {
        // Check if the line starts with a number followed by a dot
        const taskNumberMatch = line.match(/^\d+\./); 
        if (taskNumberMatch) {
          // Extract the content after the task number
          const content = line.slice(taskNumberMatch[0].length).trim(); 
          const task = {
            content,
            isDone: false,
          };
          tasks.push(task);
        }
      }
    }
    console.log("completion ", tasks);
    return tasks;
  }