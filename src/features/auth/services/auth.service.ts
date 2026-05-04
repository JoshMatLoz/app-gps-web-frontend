import { api } from "../../../shared/api/axios.instance";
import type { User } from "../types/auth.types";

const signIn = async (email: string, password: string): Promise<User> => {
  return (await api.post('/api/auth/signin', {email, password})).data.data;
}

const signUp = async (name: string, email:string, password: string): Promise<User> => {
  return (await api.post('/api/auth/signup', {name, email, password})).data.data;
}

const signOut = async (): Promise<void> => {
  await api.post('/api/auth/signout');
}

const getProfile = async (): Promise<User> => {
  return (await api.get('/api/auth/profile')).data.data
}

export const AuthService = {
  signIn,
  signUp,
  signOut,
  getProfile
}