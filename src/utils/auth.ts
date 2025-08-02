// Authentication utilities

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('authToken');
};

export const getAuthToken = (): string | null => {
    return localStorage.getItem('authToken');
};

export const getUserEmail = (): string | null => {
    return localStorage.getItem('userEmail');
};

export const setAuthData = (token: string, email: string): void => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userEmail', email);
};

export const clearAuthData = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
};

export const redirectToLogin = (): void => {
    clearAuthData();
    window.location.href = '/login';
};

export const redirectToDashboard = (): void => {
    window.location.href = '/dashboard';
};
