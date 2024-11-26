export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
}

export type GetAllUsersResponse =
  | {
      ok: true;
      users: User[];
    }
  | {
      ok: false;
      message: string;
    };