interface GroupI {
  id: number;
  name: string;
}

export interface UserDTO {
  id: number;
  name: string;
  lastname: string;
  group?: GroupI;
}
