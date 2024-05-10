import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from 'src/app/Model/sortmodel';

@Component({
  selector: 'app-single-filter-show',
  templateUrl: './single-filter-show.component.html',
  styleUrls: ['./single-filter-show.component.css']
})
export class SingleFilterShowComponent implements OnInit {
  @Input()
  sortingOptions: any;

  @Input()
  placeholder: string;

  @Output() 
  selectedSortOptionEvent = new EventEmitter<string>();

  selectSortOption: string;

  ngOnInit(): void {
      this.selectSortOption = '';
  }
  raiseChangeFilter() {
    this.selectedSortOptionEvent.emit(this.selectSortOption);
  }
}
