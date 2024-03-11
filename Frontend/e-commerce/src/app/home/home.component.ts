import { Component, OnInit } from '@angular/core';
import { jeansCollection } from '../Data/mensJeans';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  dressTitle: string[] = [];
  products: any = [];

  ngOnInit(): void {
    this.dressTitle.push("Men's Shirt");
    this.dressTitle.push("Men's Pant");
    this.dressTitle.push("Women's Sharee");
    this.dressTitle.push("Women's Lahenga");
    
    this.products = jeansCollection;
  }

}