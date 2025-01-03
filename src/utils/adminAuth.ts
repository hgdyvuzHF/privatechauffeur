export function isAuthenticated(): boolean {
  return localStorage.getItem('adminAuth') === 'true';
}

export function logout(): void {
  localStorage.removeItem('adminAuth');
}