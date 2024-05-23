import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';
import { Response } from '../../auth/login/login.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  userData;
  contact: string = '';
  isDisable: boolean = true;

  constructor(
    private authService: AuthService
  ) {}

  private initiateUserForm(userResponse: any) {
    this.contact = userResponse.phoneNumber;
    this.userForm = new FormGroup({
      name: new FormControl({ value: userResponse.name, disabled: this.isDisable }, Validators.required),
      contact: new FormControl({ value: userResponse.phoneNumber, disabled: this.isDisable }, Validators.required),
      email: new FormControl({ value: userResponse.email, disabled: this.isDisable }, [Validators.required, Validators.email]),
      address: new FormControl({ value: userResponse.address, disabled: this.isDisable }, Validators.required),
      city: new FormControl({ value: userResponse.city, disabled: this.isDisable }, Validators.required),
      district: new FormControl({ value: userResponse.district, disabled: this.isDisable }, Validators.required)
    });
  }

  private fetchUserInformation(userId: string) {
    this.authService.fetchSpecificUserInfo(+userId).subscribe(
      (response) => {
        console.log('User Details -->  ', response);
        this.initiateUserForm(response);
      }
    )
  }

  ngOnInit(): void {
    this.authService.getLoginCredentials().subscribe(
      (userCredentials: Response) => {
        if (userCredentials) {
          this.userData = userCredentials;
          this.fetchUserInformation(userCredentials.id);
        }
      }
    );
  }

  enableEditing() {
    this.isDisable = false;
    this.userForm.enable();
  }

  updateUserForm() {
    if (this.userForm.valid) {
      const updatedUserData = this.userForm.value;
      // this.authService.updateUserInfo(updatedUserData).subscribe(
      //   (response) => {
      //     alert('User information updated successfully');
      //     this.isDisable = true;
      //     this.userForm.disable();
      //   },
      //   (error) => {
      //     alert('An error occurred while updating user information');
      //   }
      // );
    }
  }
}
