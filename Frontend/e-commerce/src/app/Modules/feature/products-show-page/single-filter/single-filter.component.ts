import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sort } from 'src/app/Model/sortmodel';

@Component({
  selector: 'app-single-filter',
  templateUrl: './single-filter.component.html',
  styleUrls: ['./single-filter.component.css']
})
export class SingleFilterComponent {
  @Input() 
  sortingOptions: Sort[];
  
  @Input()
  placeholder: string;

  @Output() 
  selectedSortOption = new EventEmitter<Sort>();

  selectSortOption: Sort;
  
  onSortSelect(event) {
    console.log("Event: ", event)
    this.selectedSortOption.emit(event.value)
  }
}
