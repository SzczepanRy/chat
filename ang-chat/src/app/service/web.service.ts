import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GroupDTO,
  MessagesByGroupI,
  findGroupByUserDto,
} from '../dto/group.dto';
import { FindUserDTO, UserDTO } from '../dto/user.dto';
import { Socket } from 'ngx-socket-io';

interface resI {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class WebService {
  private webSocket: Socket;
  constructor(private http: HttpClient) {
    this.webSocket = new Socket({
      url: 'http://localhost:3000',
      options: {},
    });
  }

  connectSocket() {
    // console.log('run message');
    this.webSocket.emit('connection');
  }

  sendSocketMessage(name: string, message: string, groupname: string) {
    this.webSocket.emit(
      'newMessage',
      JSON.stringify({
        content: message,
        name,
        groupname,
      })
    );
    return this.webSocket.fromEvent('resChat');
  }
  loadSocketChat(groupname: string) {
    this.webSocket.emit('loadChat', groupname);
    return this.webSocket.fromEvent('resChat');
  }
  disconnectSocket() {
    this.webSocket.disconnect();
  }

  getAllGroups() {
    return this.http.get<GroupDTO[]>('http://localhost:3000/group');
  }

  getAllUsers() {
    return this.http.get<GroupDTO[]>('http://localhost:3000/user');
  }
  getAllMessages() {
    return this.http.get<GroupDTO[]>('http://localhost:3000/message');
  }

  getMessagesByGroup(groupname: string) {
    return this.http.post<MessagesByGroupI>(
      'http://localhost:3000/message/find',
      {
        groupname,
      }
    );
  }
  findGroupsByUser(name: string) {
    return this.http.post<findGroupByUserDto[]>(
      'http://localhost:3000/group/findGroupsByUser',
      {
        name,
      }
    );
  }

  findUser(name: string) {
    return this.http.post<FindUserDTO>('http://localhost:3000/user/findUser', {
      name,
    });
  }

  addUserToGroup(name: string, lastname: string, groupname: string) {
    return this.http.post<string>('http://localhost:3000/user/add', {
      name,
      lastname,
      groupname,
    });
  }
  addMessage(name: string, message: string, groupname: string) {
    return this.http.post<resI>('http://localhost:3000/message/add', {
      content: message,
      name,
      groupname,
    });
  }
  addUser(name: string, lastname: string, groupname: string) {
    return this.http.post<string>('http://localhost:3000/user/add', {
      name,
      lastname,
      groupname,
    });
  }
}
