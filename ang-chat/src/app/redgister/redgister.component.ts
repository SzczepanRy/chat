import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../service/web.service';
import { GroupDTO } from '../dto/group.dto';

@Component({
  selector: 'app-redgister',
  templateUrl: './redgister.component.html',
  styleUrls: ['./redgister.component.scss'],
})
export class RedgisterComponent implements OnInit {
  constructor(private router: Router, private web: WebService) {}

  groups: GroupDTO[] = [];

  ngOnInit(): void {
    this.web.getAllGroups().subscribe((data) => {
      this.groups = data;
    });
  }

  nameIn!: HTMLInputElement | null;
  lastnameIn!: HTMLInputElement | null;
  groupnameIn!: HTMLSelectElement | null;

  addUser() {
    this.nameIn = document.querySelector('.name');
    let name = (this.nameIn as HTMLInputElement).value;
    this.lastnameIn = document.querySelector('.lastname');
    let lastname = (this.lastnameIn as HTMLInputElement).value;
    this.groupnameIn = document.querySelector('.group');
    let groupname = (this.groupnameIn as HTMLSelectElement).value;

    this.web.addUser(name, lastname, groupname).subscribe((data) => {
      if (data) {
        console.log(data);

        localStorage.setItem('name', name);
        localStorage.setItem('lastname', lastname);
        this.router.navigate(['main']);
      }
    });
  }
}
