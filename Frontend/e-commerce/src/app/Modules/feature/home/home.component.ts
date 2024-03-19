import { Component, OnInit } from '@angular/core';
import { pantCollection } from 'src/app/Data/meansPant';
import { jeansCollection } from 'src/app/Data/mensJeans';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  dressTitle: string[] = [];
  products: any[] = [];

  ngOnInit(): void {
    this.dressTitle.push("Men's Shirt");
    this.dressTitle.push("Men's Pant");
    this.dressTitle.push("Women's Sharee");
    this.dressTitle.push("Women's Lahenga");
    
    this.products.push(jeansCollection);
    this.products.push(pantCollection);
    this.products.push(jeansCollection);
    this.products.push(jeansCollection);
  }

}
