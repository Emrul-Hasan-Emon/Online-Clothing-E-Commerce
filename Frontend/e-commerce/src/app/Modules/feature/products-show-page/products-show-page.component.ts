import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pantCollection } from 'src/app/Data/meansPant';
import { mensCollection } from 'src/app/Data/mensColletion';
import { jeansCollection } from 'src/app/Data/mensJeans';
import { Product } from 'src/app/Model/product';
import { Sort } from 'src/app/Model/sortmodel';
import { ProductFetchService } from 'src/app/Service/product-fetch.service';

@Component({
  selector: 'app-products-show-page',
  templateUrl: './products-show-page.component.html',
  styleUrls: ['./products-show-page.component.css']
})
export class ProductsShowPageComponent implements OnInit {
  sortingOptions: Sort[];
  selectedSortOption: Sort;
  categoryName: string;
  categoryId;
  selectedCategories: any[] = [];
  products: Product[];
  allProducts: Product[];
  colorOptions: string[] = ['All', 'Black', 'White', 'Maroon', 'Orange', 'Yellow'];
  sizesOptions: string[] = ['All', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  discountOptions: string[] = ['All', 'Yes', 'No'];
  priceOptions: string[] = ['Low to High', 'High to Low'];
  brandOptions: string[] = ['All', 'A', 'B', 'C', 'D', 'E'];  
  genderOptions: string[] = ['All', 'Male', 'Female'];
  selectedColor: string = 'All';
  selectedSize: string = 'All';
  selectedPrice: string = '';
  chosenDiscount = 'All';
  selectedBrand: string = 'All';
  selectedGender: string = 'All';

  constructor( 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productFetchService: ProductFetchService
  ) { }

  filterProductsByBrand() {
    this.activatedRoute.queryParamMap.subscribe(
      (params) => {
        const brand = params.get('brand');
        if(brand) {
          this.products = this.products.filter((item) => item?.Brand == brand);
        }
      }
    );
  }

  filterProductByCategoryId() {
    this.activatedRoute.queryParamMap.subscribe(
      (params) => {
        this.categoryId = params.get('categoryId');

        if(this.categoryId) {
          this.products = this.products.filter((item) => item.CategoryID == this.categoryId);
        }
      }
    );
  }

  ngOnInit(): void {
    this.categoryId = '';
    this.selectedBrand = 'All';
    this.chosenDiscount = 'All';

    console.log('Chosen Discount --->  ', this.chosenDiscount);

    this.productFetchService.getAllProducts().subscribe(
      (productList) => {
        console.log('Response: ', productList); 
        this.allProducts = productList;     
        this.products = this.allProducts;
        
        this.filterProductsByBrand();
        this.filterProductByCategoryId();
      },
      (error) => {
        console.log('An error occured while fetching products');        
      }
    );
  }

  private filtersProduct() {
    this.products = this.allProducts;

    this.filterProductsByBrand();
    this.filterProductByCategoryId();

    if(this.selectedColor != 'All') {
        this.products.forEach(product => {
          var mark: boolean = false;

          product.Size.forEach(size => {
            if(size.Color === this.selectedColor) {
              mark = true;
            }
          });
          if(mark) {
            this.products.push(product);
          }
        });
    }

    if(this.selectedSize != 'All') {
      var tempProducts: Product[] = [];
      this.products.forEach(product => {
        var mark: boolean = false;
        product.Size.forEach(size => {
          if(size.Name === this.selectedSize) {
            mark = true;
          }
        });
        if(mark) {
          tempProducts.push(product);
        }
      });
      this.products = tempProducts;
    }

    if(this.chosenDiscount != 'All') {
      var tempProducts: Product[] = [];
      this.products.forEach(product => {
        if(this.chosenDiscount === 'Yes' && product.Discount > 0) {
          tempProducts.push(product);
        }
        if(this.chosenDiscount === 'No' && !product.Discount) {
          tempProducts.push(product);
        }
      });
      this.products = tempProducts;
    }

    if(this.selectedPrice === 'Low to High') {
      this.products.sort((a, b) => a.Price - b.Price);
    } else if (this.selectedPrice = 'HiHigh to Lowgh') {
      this.products.sort((a, b) => b.Price - a.Price);
    }

    if(this.selectedBrand != 'All') {
      var tempProducts: Product[] = [];
      this.products.forEach(product => {
        if(product.Brand.toLowerCase() === this.selectedBrand.toLowerCase()) {
          tempProducts.push(product);
        }
      });
      this.products = tempProducts;
    }

    if(this.selectedGender != 'All') {
      var gender: string = '';
      gender = (this.selectedGender === 'Male') ? 'Men' : 'Women';

      var tempProducts: Product[] = [];
      this.products.forEach(product => {
        if(this.selectedGender.toLowerCase() === product.Gender.toLowerCase() || gender.toLowerCase() === product.Gender.toLowerCase()) {
          tempProducts.push(product);
        }
      });
      this.products = tempProducts;
    }
  }

  onGenderSelection(gender: string) {
    this.selectedGender = gender;
    this.filtersProduct();
  }
  onBrandSelection(brand: string) {
    this.selectedBrand = brand;
    this.filtersProduct();
  }
  onColorSelection(event: string) {
    this.selectedColor = event;
    this.filtersProduct();
  }
  onSizeSelect(size: string) {
    this.selectedSize = size;
    this.filtersProduct();
  }
  onPriceSelect(order: string) {
    this.selectedPrice = order;
    this.filtersProduct();
  }
  onDiscountSelect(ok: string) {
    this.chosenDiscount = ok;
    this.filtersProduct();
  }
  onSortSelect(event) {
    console.log("Event: ", event);
  }

  sortOptionsSelected(event) {
    console.log("Event in Parent: ", event);
  }

  showProductDetails(product: any) {
    // console.log('Product ------> ', product);
    this.router.navigate(['product-details', product.id]);
  }

  applyFilters() {

  }
}
