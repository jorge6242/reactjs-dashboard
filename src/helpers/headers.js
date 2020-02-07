import SecureStorage from "../Config/SecureStorage";

export default function headers() {
    const items = { 'Content-Type': 'application/json' };
    const token = SecureStorage.getItem('token');
    if (token) {
      items.Authorization = `Bearer ${token}`;
    }
    return items;
  }
  