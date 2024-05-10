import { Component, OnInit } from '@angular/core';
import { pantCollection } from 'src/app/Data/meansPant';
import { jeansCollection } from 'src/app/Data/mensJeans';
import { ProductFetchService } from 'src/app/Service/product-fetch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  dressTitle: string[] = [];
  products: any[] = [];
  categoryId: string[] = [];

  constructor(
    private productFetchService: ProductFetchService
  ) {}

  private fetchProductWithCategory(products: any, CategoryID: string) {
    const temporaryProducts: any = [];
    for (let idx = 0; idx < products.length; idx++) {
      if(products[idx].CategoryID === CategoryID) {
        temporaryProducts.push(products[idx]);
      }
    }
    this.products.push(temporaryProducts);
  }
  private fetchAllProducts() {
    this.productFetchService.getAllProducts().subscribe(
      (products: any) => {
        console.log('Product Details ---->  ', products);
        this.fetchProductWithCategory(products, 'shirt');
        this.fetchProductWithCategory(products, 'pant');
        this.fetchProductWithCategory(products, 'saree');
        this.fetchProductWithCategory(products, 'borkha');

        console.log('Shirt -->  ', this.products);
      },
      (error) => {
        alert('An unexpected occured');
      }
    )
  }
  ngOnInit(): void {
    this.dressTitle.push("Men's Shirt");
    this.dressTitle.push("Men's Pant");
    this.dressTitle.push("Women's Sharee");
    this.dressTitle.push("Women's Borkha");
      
    this.categoryId.push("shirt");
    this.categoryId.push("pant");
    this.categoryId.push("saree");
    this.categoryId.push("borkha");

    this.fetchAllProducts();

    // this.products.push(jeansCollection);
    // this.products.push(pantCollection);
    // this.products.push(jeansCollection);
    // this.products.push(jeansCollection);
  }

}
