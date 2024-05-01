import { Component, OnInit } from '@angular/core';
import { AuthService } from './Service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'e-commerce';
  token: string | null = localStorage.getItem('token');

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if(this.token) {
      this.authService.validateUserThroughToken(this.token).subscribe(
        () => {
          this.authService.isUserLogged = true
        },
        () => {
          localStorage.removeItem('token');
        }
      )
    }
  }
}
