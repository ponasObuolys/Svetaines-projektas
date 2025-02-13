const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

export const authenticate = (username: string, password: string): boolean => {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const login = (username: string, password: string): boolean => {
  if (authenticate(username, password)) {
    localStorage.setItem('isAuthenticated', 'true');
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem('isAuthenticated');
}; 