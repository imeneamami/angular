import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
    loginData = {
      email: '',
      password: '',
      username: '',
      id: ''
    };
  
    login() {
      // Check if all login data is present
      if (
        this.loginData.email &&
        this.loginData.password &&
        this.loginData.username &&
        this.loginData.id
      ) {
        // Success: All login data is present
        console.log('Login button clicked');
        console.log('Email:', this.loginData.email);
        console.log('Password:', this.loginData.password);
        console.log('Username:', this.loginData.username);
        console.log('ID:', this.loginData.id);
        alert('Login successful!');
      } else {
        // Error: Missing login data
        alert('Please fill in all login details.');
      }
    }
  }
 

