import { users } from '../model';

export const getUser = async ({ login }) => {
  if (!login) throw new Error('erro ao receber login do usuario');

  const user = await users.findOne({ login }).exec();
  return user;
};
export const getUsers = async () => {
  const user = await users.find().exec();
  return user;
};
export const postUser = async ({ login, password }) => {
  if (!login) throw new Error('login not found');
  if (!password) throw new Error('login not password');

  const user = await users.create({
    login,
    password,
  });

  return user;
};
