interface usersI {
  id: number;
  name: string;
  lastname: string;
}
interface MessageI {
  id: number;
  content: string;
  name: string;
  date: number;
}

// export interface GroupDTO {
//   id: number;
//   name: string;
//   // users: usersI;
//   users: any;
// }
export interface GroupDTO {
  id: number;
  name: string;
  users: usersI[];
}
export interface MessagesByGroupI {
  id: number;
  name: string;
  message?: MessageI[];
}

export interface findGroupByUserDto {
  id: number;
  name: string;
  users: usersI[];
}
