import axios from 'axios';

type Res = {
  data: {token?: string},
  status: number,
  statusText: string,
  headers: object,
  config: object,
  request: object
}

type FormGetStarted = {
  brandName: string;
  legalName: string;
  logo: File | null;
  devicesState: string;
  username: string;
  name: string;
  email: string;
  password: string;
}

export const setup = async (): Promise<Res> => {
    return await axios.get('http://localhost:4000/api/users/userCounter');
}

export const createUser = async (data: FormGetStarted): Promise<Res> => {
  return await axios.post('http://localhost:4000/api/auth/createUser', data);
}

export const loginRequest = async (username: string, password: string): Promise<Res> => {
    return await axios.post('http://localhost:4000/api/auth/login', {username, password});
}

