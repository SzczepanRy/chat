import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private router: Router) {}
  parentData: any;

  ngOnInit(): void {
    console.log(localStorage.getItem('name'));

    if (localStorage.getItem('name') == undefined) {
      this.router.navigate(['/']);
    }
  }
}
