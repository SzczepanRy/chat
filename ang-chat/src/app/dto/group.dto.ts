interface usersI {
  id: number;
  name: string;
  lastname: string;
}

export interface GroupDTO {
  id: number;
  name: string;
  // users: usersI;
  users: any;
}
