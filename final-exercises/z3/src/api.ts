export interface User {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
}

export interface Comment {
  id: number;
  name: string;
}

const API_BASE = "https://jsonplaceholder.typicode.com";

export async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await fetch(API_BASE + endpoint);

  if (!response.ok) {
    throw new Error("HTTP " + response.status + ": " + response.statusText);
  }

  return response.json() as Promise<T>;
}
