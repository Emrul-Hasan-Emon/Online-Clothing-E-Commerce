import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product, Size } from 'src/app/Model/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  addProductForm: FormGroup;
  selectedImage;
  sizesOptions: string[] = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  colorOptions: string[] = ['Black', 'White', 'Maroon', 'Orange', 'Yellow'];
  selectedPairs: { size: string, color: string }[] = [];
  genderOptions: string[] = ['Male', 'Female', 'Other'];

  ngOnInit(): void {
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
        // console.log('Selected Image Url: ', this.selectedImage);
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
    
    delete product.sizes;

    console.log('Product ----> ', product);
  }
}
