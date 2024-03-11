import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.css']
})
export class ProductSliderComponent implements OnInit{
  @Input() // It will take the title from Home Component
  title: any;
  
  @Input()
  products: any;

  ngOnInit(): void {
      console.log("Jeans Product: ", this.products);  
  }
}
