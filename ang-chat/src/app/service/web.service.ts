import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroupDTO, MessagesByGroupI } from '../dto/group.dto';
import { FindUserDTO, UserDTO } from '../dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  constructor(private http: HttpClient) {}

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

  findUser(name: string) {
    return this.http.post<FindUserDTO>('http://localhost:3000/user/findUser', {
      name,
    });
  }
}
