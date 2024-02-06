import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
})
export class NavComponent {
  constructor(private router: Router) {}
  logout() {
    console.log('clear');

    localStorage.removeItem('name');
    this.router.navigate(['']);
  }
}
