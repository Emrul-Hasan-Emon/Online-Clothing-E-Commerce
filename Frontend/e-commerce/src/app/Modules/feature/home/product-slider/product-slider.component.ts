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

  responsiveOptions: any[] | undefined;

  ngOnInit(): void {
      console.log("Jeans Product: ", this.products);  

      this.responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
  }
}
