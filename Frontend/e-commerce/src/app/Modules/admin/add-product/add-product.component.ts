import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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

  availableSizeOptions = this.sizesOptions;
  availableColorOptions = this.colorOptions;

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
        name: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        categoryID: new FormControl('', Validators.required),
        brand: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        discount: new FormControl('', Validators.required),
        sizes: new FormArray([
          this.createSizeFormGroup()
        ]),
        gender: new FormControl('', Validators.required),
        image: new FormControl('', Validators.required)
      });
  }

  createSizeFormGroup(): FormGroup {
    return new FormGroup({
      size: new FormControl(''),
      color: new FormControl(''),
      quantity: new FormControl('')
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

  productDetailsSubmitted() {
    console.log("New Product Details ----> ", this.addProductForm.value);
  }

  isSizeColorPairSelected(size: string, color: string): boolean {
    // console.log(`Size : ${size}, Color: ${color}`);
    return this.selectedPairs.some(pair => pair.size === size && pair.color === color);
  }

  getColorControl(index: number): AbstractControl {
    const sizesArray = this.addProductForm.get('sizes') as FormArray;
    const sizeGroup = sizesArray.at(index) as FormGroup;
    return sizeGroup.get('color');
}

  getSizeControl(index: number): AbstractControl {
      const sizesArray = this.addProductForm.get('sizes') as FormArray;
      const sizeGroup = sizesArray.at(index) as FormGroup;
      return sizeGroup.get('size');
  }

  insertSizeColorPair(index: number) {
    const sizesArray = this.addProductForm.get('sizes') as FormArray;
    const sizeGroup = sizesArray.at(index) as FormGroup;
    const size = sizeGroup.get('size').value;
    const color = sizeGroup.get('color').value;

    // console.log(`Index: ${index}, Size: ${size}, Color: ${color}`);
    if(size && color) {
      this.selectedPairs.push({size, color});
    }
  }

  removeSizeColorPair(index: number) {
    const sizesArray = this.addProductForm.get('sizes') as FormArray;
    const sizeGroup = sizesArray.at(index) as FormGroup;
    const size = sizeGroup.get('size').value;
    const color = sizeGroup.get('color').value;

    // Find the index of the pair in the selectedPairs array
    const pairIndex = this.selectedPairs.findIndex(pair => pair.size === size && pair.color === color);

    if (pairIndex !== -1) {
      this.selectedPairs.splice(pairIndex, 1);
    }
  }
}
