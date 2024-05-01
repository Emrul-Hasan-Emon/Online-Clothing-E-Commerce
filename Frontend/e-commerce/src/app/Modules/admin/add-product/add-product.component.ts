import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  addProductForm: FormGroup;
  selectedImage;

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
        gender: new FormControl('', Validators.required)
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
}
