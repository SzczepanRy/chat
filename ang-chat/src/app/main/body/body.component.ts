import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { WebService } from 'src/app/service/web.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class BodyComponent implements OnInit, AfterViewInit {
  constructor(private web: WebService) {}
  @Input() data: any;

  ngOnInit(): void {
    console.log('inited body');
    // this.scroll();

    let groupname = localStorage.getItem('group');
    if (groupname) {
      console.log('init', groupname);

      this.web.loadSocketChat(groupname).subscribe((data: any) => {
        console.log(data);

        this.chat = data;
        this.emmitChat();
      });
    }
  }

  name = localStorage.getItem('name');

  current: boolean = false;

  @Output() refresh: EventEmitter<any> = new EventEmitter();

  // add users to group

  chat: any;
  emmitChat() {
    console.log('emit');
    // this.scroll();
    this.refresh.emit(this.chat);
  }
  @ViewChild('content') content: any;
  @ViewChildren('messages') messages: any;
  ngAfterViewInit() {
    this.scrollToBottom();
    this.messages.changes.subscribe(this.scrollToBottom);
  }
  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop =
        this.content.nativeElement.scrollHeight;
    } catch (err) {}
  };

  // chatEl!: HTMLElement | null;

  // scroll() {
  //   console.log('SCROLLLL');

  //   this.chatEl = document.querySelector('.chat');
  //   console.log(this.chatEl);

  //   let lastMessageEL = (this.chatEl as HTMLElement).lastElementChild
  //     ?.previousElementSibling;
  //   console.log(lastMessageEL);

  //   if (lastMessageEL) {
  //     console.log('all');
  //     // (this.chatEl as HTMLElement).scrollTop =
  //     //   (this.chatEl as HTMLElement).scrollHeight -
  //     //   (this.chatEl as HTMLElement).clientHeight;
  //     // (this.chatEl as HTMLElement).scrollTop = (
  //     //   this.chatEl as HTMLElement
  //     // ).scrollHeight;
  //     // (this.chatEl as HTMLElement).scrollTo(0, lastMessageEL.scrollHeight);
  //     (lastMessageEL as HTMLElement).scrollIntoView();
  //   }
  // }

  sendMessage($event: MouseEvent) {
    let buttonEl = <HTMLElement>$event.currentTarget;
    let parentDiv = (<HTMLElement>buttonEl).parentElement;
    let usersDiv = (<HTMLElement>parentDiv).firstChild;
    let message = (usersDiv as HTMLInputElement).value;

    let groupname = localStorage.getItem('group');
    let name = localStorage.getItem('name');

    if (groupname && name) {
      console.log(groupname, name, 'check');

      this.web.sendSocketMessage(name, message, groupname);
      this.web.loadSocketChat(groupname).subscribe((data: any) => {
        console.log(data);

        this.chat = data;
        this.emmitChat();
      });
    }
  }
}
