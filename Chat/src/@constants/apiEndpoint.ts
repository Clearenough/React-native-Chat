const baseUserUrl = 'http://localhost:3000/api/users';
const baseChatUrl = 'http://localhost:3000/api/chats';
const baseMessageUrl = 'http://localhost:3000/api/messages';

export const userEndpoints = {
  register: baseUserUrl + '/register',
  login: baseUserUrl + '/login',
  findUser: baseUserUrl + '/find/',
  getUsers: baseUserUrl + '/',
};

export const chatEndpoints = {
  createChat: baseChatUrl + '/',
  getUserChats: baseChatUrl + '/',
  deleteChat: baseChatUrl + '/',
  getChat: baseChatUrl + '/find/',
};

export const messageEndpoints = {
  message: baseMessageUrl + '/',
};
