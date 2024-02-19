import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GroupDTO, findGroupByUserDto } from '../../dto/group.dto';
import { WebService } from '../../service/web.service';
import { CommonModule } from '@angular/common';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class AsideComponent implements OnInit {
  constructor(private web: WebService) {}

  groups: findGroupByUserDto[] = [];

  dialogGroups: GroupDTO[] = [];

  ngOnInit(): void {
    let name = localStorage.getItem('name');
    if (name) {
      this.web.findGroupsByUser(name).subscribe((data) => {
        this.groups = data;
      });
    }
    this.web.getAllGroups().subscribe((data) => {
      this.dialogGroups = data;
    });
  }

  @Output() redirect: EventEmitter<any> = new EventEmitter();

  // add users to group

  chat: any;

  emmitChat() {
    this.redirect.emit(this.chat);
  }

  renderChat(groupname: string) {
    let name = localStorage.getItem('name');
    console.log(groupname, name);
    this.web.getMessagesByGroup(groupname).subscribe((data) => {
      this.chat = data;
      this.emmitChat();
    });
  }

  rollDownMenu($event: MouseEvent) {
    let currentDiv = <HTMLElement>$event.currentTarget;

    let group = (currentDiv as HTMLElement).innerHTML;

    localStorage.setItem('group', group.trim());

    let parentDiv = (<HTMLElement>currentDiv).parentElement;
    let usersDiv = (<HTMLElement>parentDiv).lastChild;
    (usersDiv as HTMLElement).style.display =
      (usersDiv as HTMLElement).style.display == 'block' ? 'none' : 'block';

    this.renderChat(currentDiv.innerText);
  }

  dialogElement!: HTMLElement | null;

  enableDialog() {
    this.dialogElement = document.querySelector('.dialog');
    (this.dialogElement as HTMLElement).style.display =
      this.dialogElement?.style.display == 'block' ? 'none' : 'block';
  }
  groupInputElement!: HTMLElement | null;
  addToGroup() {
    this.groupInputElement = document.querySelector('.choseGroup');
    let selectedGroup = (this.groupInputElement as HTMLSelectElement).value;
    let name = localStorage.getItem('name');
    let lastname = localStorage.getItem('lastname');
    console.log(name, lastname, selectedGroup);

    if (name && lastname) {
      this.web
        .addUserToGroup(name, lastname, selectedGroup)
        .subscribe((data) => {
          console.log(data);
        });
    }
    console.log('run');

    this.dialogElement = document.querySelector('.dialog');
    (this.dialogElement as HTMLElement).style.display =
      this.dialogElement?.style.display == 'block' ? 'none' : 'block';
    window.location.reload();
  }
}
