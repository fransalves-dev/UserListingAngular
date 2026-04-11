import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }
  updateUser(id: number, changes: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${id}`, changes);
  }
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}