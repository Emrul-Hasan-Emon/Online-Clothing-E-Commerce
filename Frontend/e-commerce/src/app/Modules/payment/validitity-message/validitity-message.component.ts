import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validitity-message',
  templateUrl: './validitity-message.component.html',
  styleUrls: ['./validitity-message.component.css']
})
export class ValiditityMessageComponent implements OnInit{
  @Input()
  messageShown: boolean;

  @Input()
  field: string;

  isRequired: boolean;

  ngOnInit(): void {
    this.isRequired = (this.field == 'Email') ? true : false;
  }
}
