const TOKEN_TAG = "token";
const USER_TAG = "user";

const setUser = async ({ user, token }, setUserLogedIn) => {
  localStorage.setItem(USER_TAG, JSON.stringify(user));
  localStorage.setItem(TOKEN_TAG, token);
  user.authtoken = token;
  user.token = token && token.substring(token.lastIndexOf(".") + 1);
  setUserLogedIn(user);
};

const logout = setUserLogeOut => {
  localStorage.removeItem(TOKEN_TAG);
  localStorage.removeItem(USER_TAG);
  setUserLogeOut();
};

export { setUser, logout };
