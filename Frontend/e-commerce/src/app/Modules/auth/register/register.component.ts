import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;
  isPasswordMatched: boolean = false;
  password1 = '';
  password2 = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z\s]*$/)]), // Name pattern added
      phonenumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  private registerUser(registerUserData: any) {
    this.authService.registerNewUser(registerUserData).subscribe(
      (response) => {
        alert('Registration successful');
      },
      (error) => {
        this.errorMessage = error.error;
        console.log(error);
        alert(this.errorMessage);
      }
    )
  }

  register() {
    if (this.registerForm.valid) {
      if (this.registerForm.get('password').value === this.registerForm.get('confirmPassword').value) {
        console.log('Register Details ----> ', this.registerForm);
        const registerUserData = this.registerForm.value;
        registerUserData.role = 'user';

        this.registerUser(registerUserData);
        this.isPasswordMatched = false;
        this.registerForm.reset();
      } else {
        this.isPasswordMatched = true;
      }
    } else {
      alert('The form is not valid');
    }
  }
}
