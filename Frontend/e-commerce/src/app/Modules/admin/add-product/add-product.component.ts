import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { Product, Size } from 'src/app/Model/product';
import { ProductUpdateService } from 'src/app/Service/Product-update/product-update.service';
import { ProductPostService } from 'src/app/Service/product-post.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {
  addProductForm: FormGroup;
  selectedImage;
  productDetails;
  sizesOptions: string[] = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  colorOptions: string[] = ['Black', 'White', 'Maroon', 'Orange', 'Yellow'];
  selectedPairs: { size: string, color: string }[] = [];
  genderOptions: string[] = ['Male', 'Female', 'Other'];
  isUpdated: boolean = false;

  constructor(
    private productPostService: ProductPostService,
    private productUpdateService: ProductUpdateService,
    private router: Router
  ) {}

  initialFormForUpdate() {
    this.addProductForm = new FormGroup({
      Name: new FormControl(this.productDetails.Name, Validators.required),
      Category: new FormControl(this.productDetails.Category, Validators.required),
      CategoryID: new FormControl(this.productDetails.CategoryID, Validators.required),
      Brand: new FormControl(this.productDetails.Brand, Validators.required),
      Price: new FormControl(this.productDetails.Price, Validators.required),
      Discount: new FormControl(this.productDetails.Discount, Validators.required),
      sizes: new FormArray([]),
      Gender: new FormControl(this.productDetails.Gender, Validators.required),
      ImageURL: new FormControl(this.productDetails.ImageURL, Validators.required),
      Description: new FormControl(this.productDetails.Description, Validators.required)
    });

    // Loop through each size in the productDetails.Size array
  for (let i = 0; i < this.productDetails.Size.length; i++) {
    const sizeGroup = this.createSizeFormGroup(); // Create FormGroup for size
    sizeGroup.patchValue({ // Patch values for size FormGroup
      Name: this.productDetails.Size[i].Name,
      Color: this.productDetails.Size[i].Color,
      Quantity: this.productDetails.Size[i].Quantity
    });
    (this.addProductForm.get('sizes') as FormArray).push(sizeGroup); // Push size FormGroup into sizes FormArray
  }
  }

  private checkForProductEvent() {
    this.productUpdateService.getProductDetailsForProduct().subscribe(
      (productDetails: any) => {
        this.productDetails = productDetails;
        this.isUpdated = true;
      }
    );
  }

  initiateNullForm() {
    this.addProductForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Category: new FormControl('', Validators.required),
      CategoryID: new FormControl('', Validators.required),
      Brand: new FormControl('', Validators.required),
      Price: new FormControl('', Validators.required),
      Discount: new FormControl('', Validators.required),
      sizes: new FormArray([
        this.createSizeFormGroup()
      ]),
      Gender: new FormControl('', Validators.required),
      ImageURL: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.checkForProductEvent();
    if(this.productDetails) {
      this.initialFormForUpdate();
    } else {
      this.initiateNullForm();
    }
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.resetForm(); // Reset the form when navigating away from the component
      }
    });
  }

  resetForm() {
    this.addProductForm.reset(); // Reset the form controls
    // Reset individual form controls to empty value
    Object.keys(this.addProductForm.controls).forEach(key => {
      this.addProductForm.get(key).setValue('');
    });
  }

  createSizeFormGroup(): FormGroup {
    return new FormGroup({
      Name: new FormControl(''),
      Color: new FormControl(''),
      Quantity: new FormControl()
    });
  }

  addSizeField(): void {
    (this.addProductForm.get('sizes') as FormArray).push(this.createSizeFormGroup());
  }

  removeSizeField(index: number): void {
    (this.addProductForm.get('sizes') as FormArray).removeAt(index);
  }

  onImageChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target.result;
        this.addProductForm.get('ImageURL').setValue(this.selectedImage);
      };
      reader.readAsDataURL(inputElement.files[0]);
    }
  }

  isSizeColorPairSelected(size: string, color: string): boolean {
    // console.log(`Size : ${size}, Color: ${color}`);
    return this.selectedPairs.some(pair => pair.size === size && pair.color === color);
  }

  getColorControl(index: number): AbstractControl {
    const sizesArray = this.addProductForm.get('sizes') as FormArray;
    const sizeGroup = sizesArray.at(index) as FormGroup;
    return sizeGroup.get('Color');
}

  getSizeControl(index: number): AbstractControl {
      const sizesArray = this.addProductForm.get('sizes') as FormArray;
      const sizeGroup = sizesArray.at(index) as FormGroup;
      return sizeGroup.get('Name');
  }

  insertSizeColorPair(index: number) {
    const sizesArray = this.addProductForm.get('sizes') as FormArray;
    const sizeGroup = sizesArray.at(index) as FormGroup;
    const size = sizeGroup.get('Name').value;
    const color = sizeGroup.get('Color').value;

    // console.log(`Index: ${index}, Size: ${size}, Color: ${color}`);
    if(size && color) {
      this.selectedPairs.push({size, color});
    }
  }

  removeSizeColorPair(index: number) {
    const sizesArray = this.addProductForm.get('sizes') as FormArray;
    const sizeGroup = sizesArray.at(index) as FormGroup;
    const size = sizeGroup.get('Name').value;
    const color = sizeGroup.get('Color').value;

    // Find the index of the pair in the selectedPairs array
    const pairIndex = this.selectedPairs.findIndex(pair => pair.size === size && pair.color === color);

    if (pairIndex !== -1) {
      this.selectedPairs.splice(pairIndex, 1);
    }
  }

  private updateProduct(product: any) {
    this.productUpdateService.updateProducts(product, this.productDetails.id).subscribe(
      (updatedProduct: any) => {
        alert('Product Update Successfull');
        this.addProductForm.reset();
      },
      (error) => {
        alert('An error occured while updating product');
      }
    );
  }

  private insertNewProduct(product: any) {
    this.productPostService.insertProduct(product).subscribe(
      (newInsertedProduct) => {
        alert('Product Insertion Successfull');
        this.addProductForm.reset();
      },
      (error) => {
        console.log(error);
        alert('Duplication of product name');
      }
    );
  }
  
  productDetailsSubmitted() {
    console.log("New Product Details ----> ", this.addProductForm.value);
    const formValues = this.addProductForm.value;
    const sizes = formValues.sizes as Size[];
    
    const sizesWithNumberQuantity = sizes.map((size: Size) => {
      return {
        ...size,
        Quantity: Number(size.Quantity)
      };
    });
    
    const quantity = sizesWithNumberQuantity.reduce((total, size) => total + size.Quantity, 0);
    const inStock = quantity > 0;
    
    const product = formValues as Product;
    product.Size = sizesWithNumberQuantity;
    product.Colors = [];
    product.InStock = inStock;
    product.Price = +product.Price;
    product.Discount = +product.Discount;
    product.Quantity = quantity;

    delete product.sizes;

    console.log('Product ----> ', product);

    if(this.isUpdated) {
      this.updateProduct(product);
    } else {
      this.insertNewProduct(product);
    }
    
  }

  ngOnDestroy(): void {
      this.addProductForm.reset();
  }
}
