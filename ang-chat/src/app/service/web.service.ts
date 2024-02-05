import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroupDTO } from '../dto/group.dto';

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
    return this.http.post<GroupDTO[]>('http://localhost:3000/message/find', {
      groupname,
    });
  }
}
