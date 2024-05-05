import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) return null; // Return null if value is not provided
    
    // Parse the date string into a Date object
    const date = new Date(value);
    
    // Define suffixes for day
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const day = date.getDate();
    const suffix = suffixes[(day - 1) % 10 > 3 ? 0 : day % 10];

    // Format the date in the desired generic form
    const formattedDate = `${day}${suffix} ${this.getMonthName(date.getMonth())} ${date.getFullYear()}`;
    
    return formattedDate;
  }

  getMonthName(monthIndex: number): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthIndex];
  }

}
