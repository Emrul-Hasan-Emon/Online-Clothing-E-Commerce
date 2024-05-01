import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-product-card',
  templateUrl: './home-product-card.component.html',
  styleUrls: ['./home-product-card.component.css']
})
export class HomeProductCardComponent implements OnInit{
  @Input() // It will take input from Product Slider Component
  product: any;

  ngOnInit(): void {
    
  }
}
