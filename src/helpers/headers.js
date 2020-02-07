export default function headers() {
    const items = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('token');
    if (token) {
      items.Authorization = `Bearer ${token}`;
    }
    return items;
  }
  