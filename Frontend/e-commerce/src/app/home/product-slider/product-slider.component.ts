import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.css']
})
export class ProductSliderComponent {
  @Input() 
  title: any;
  
  @Input()
  products: any;

  show = "Emrul Hasan Emon";
}
