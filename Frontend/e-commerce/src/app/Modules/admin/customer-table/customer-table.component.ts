import { Component, OnInit } from '@angular/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {
  item = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  users;
  allUsers;
  role: string = 'all';
  searchOptions: string[] = [];
  selectedUser: string = '';
  suggestions: string[] = [];
  
  constructor(
    private authService: AuthService
  ) {}

  private storeSearchOptions() {
    this.allUsers.forEach(user => {
      this.searchOptions.push(user.name);
    });
    this.suggestions = this.searchOptions;
    console.log('Suggestion -->  ', this.suggestions);
  }

  private fetchAllusers() {
    this.authService.fetchAllUsers().subscribe(
      (response: any) => {
        console.log("All users --> ", response);
        this.allUsers = response;
        this.users = response;
        this.storeSearchOptions();
      },
      (error) => {
        alert(`An error occured while fetching all user information`);
      }
    )
  }
  ngOnInit(): void {
      this.fetchAllusers();
  }

  onRoleChange() {
    this.users = this.allUsers.filter(user =>
      user.role.toLowerCase() == this.role.toLowerCase()
    );
    if(this.role === 'all') {
      this.users = this.allUsers;
    }
  }

  onSearch() {
    this.onRoleChange();
    if(this.selectedUser.trim() !== '') {
      this.users = this.users.filter(user =>
        user.name.toLowerCase().includes(this.selectedUser.toLowerCase())
      );
    }
  }
}
