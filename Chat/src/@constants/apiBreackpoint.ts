const baseUrl = 'http://localhost:3000/api/';

export const userBreakpoints = {
  register: baseUrl + '/register',
  login: baseUrl + '/login',
  findUser: baseUrl + '/find/:userId',
  getUsers: baseUrl + '/',
};
