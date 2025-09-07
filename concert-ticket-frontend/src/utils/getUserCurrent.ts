export function getCurrentUser() {
    if (typeof window === 'undefined') return null
    const user = localStorage.getItem('mockUser')
    return user ? JSON.parse(user) : null
}