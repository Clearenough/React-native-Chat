const baseUserUrl = 'http://localhost:3000/api/users';
const baseChatUrl = 'http://localhost:3000/api/chats';

export const userBreakpoints = {
  register: baseUserUrl + '/register',
  login: baseUserUrl + '/login',
  findUser: baseUserUrl + '/find/',
  getUsers: baseUserUrl + '/',
};

export const chatBreakpoints = {
  createChat: baseChatUrl + '/',
  getUserChats: baseChatUrl + '/',
  getChat: baseChatUrl + '/find/',
};
