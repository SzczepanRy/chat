import { Component } from '@angular/core';
import { WebService } from '../service/web.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router, private web: WebService) {}

  redgister() {
    this.router.navigate(['redgister']);
  }

  findUser($event: MouseEvent) {
    let currentDiv = <HTMLElement>$event.currentTarget;
    let parentDiv = (<HTMLElement>currentDiv).parentElement;
    let userInput = (<HTMLInputElement>parentDiv).firstChild;
    let user = (<HTMLInputElement>userInput).value;

    this.web.findUser(user).subscribe((data) => {
      let { valid, validUser } = data;
      if (valid) {
        console.log(validUser[0].name);

        localStorage.setItem('name', validUser[0].name);
        localStorage.setItem('lastname', validUser[0].lastname);
        this.router.navigate(['main']);
      }
    });
  }
}
