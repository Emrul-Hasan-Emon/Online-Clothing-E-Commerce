import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sort } from 'src/app/Model/sortmodel';

@Component({
  selector: 'app-single-filter-show',
  templateUrl: './single-filter-show.component.html',
  styleUrls: ['./single-filter-show.component.css']
})
export class SingleFilterShowComponent {
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
