interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

let DUMMY_USERS: Array<IUser> = [
  {
    id: "001",
    name: "Quang Doan",
    email: "quangdoan@gmail.com",
    password: "123456",
  },
  {
    id: "002",
    name: "Nhat Quang",
    email: "nhatquang@gmail.com",
    password: "987654",
  },
];

export const getUsers = ({ response }: { response: any }) => {
  response.body = JSON.stringify(DUMMY_USERS, null, 2);
};

export const login = async ({ request, response }: { request: any, response: any }) => {
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 400;
    response.body = { message: "No data provided" };
    return;
  }
  const user: IUser = await body.value;
  const identifiedUser = DUMMY_USERS.find((u) => u.email === user.email);
  if (identifiedUser && identifiedUser.password === user.password) {
    response.status = 200;
    response.body = { message: "Login Successfully" };
  } else {
    response.status = 404;
    response.body = { message: "Login Fail" };
  }
};
