import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GroupDTO } from '../dto/group.dto';
import { WebService } from '../service/web.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class AsideComponent implements OnInit {
  constructor(private web: WebService) {}

  groups: GroupDTO[] = [];

  ngOnInit(): void {
    this.web.getAllGroups().subscribe((data) => {
      this.groups = data;
    });
  }

  @Output() redirect: EventEmitter<any> = new EventEmitter();

  chat: any;

  emmitChat() {
    this.redirect.emit(this.chat);
  }

  renderChat(groupname: string, name: string) {
    console.log(groupname, name);
    this.web.getMessagesByGroup(groupname).subscribe((data) => {
      this.chat = data;
      this.emmitChat();
    });
  }

  rollDownMenu($event: MouseEvent, name: string) {
    let currentDiv = <HTMLElement>$event.currentTarget;
    let parentDiv = (<HTMLElement>currentDiv).parentElement;
    let usersDiv = (<HTMLElement>parentDiv).lastChild;
    (usersDiv as HTMLElement).style.display =
      (usersDiv as HTMLElement).style.display == 'block' ? 'none' : 'block';

    this.renderChat(currentDiv.innerText, name);
  }
}
