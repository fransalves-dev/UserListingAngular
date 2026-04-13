import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { UsersService } from './users.service';
import { User } from '../models/user.model';

describe('UsersService', () => {
  let service: UsersService;

  const httpMock = {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  };

  const mockUser: User = {
    id: 1,
    name: 'John',
    email: 'john@test.com',
    phone: '123',
    cpf: '000',
    typeOfPhone: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        { provide: HttpClient, useValue: httpMock },
      ],
    });

    service = TestBed.inject(UsersService);
    jest.clearAllMocks();
  });


  it('should call GET users', (done) => {
    httpMock.get.mockReturnValue(of([mockUser]));

    service.getUsers().subscribe((res) => {
      expect(httpMock.get).toHaveBeenCalledWith(
        'http://localhost:3000/users',
      );
      expect(res).toEqual([mockUser]);
      done();
    });
  });


  it('should call POST create user', (done) => {
    const payload = {
      name: 'John',
      email: 'john@test.com',
      phone: '123',
      cpf: '000',
      typeOfPhone: null,
    };

    httpMock.post.mockReturnValue(of(mockUser));

    service.createUser(payload).subscribe((res) => {
      expect(httpMock.post).toHaveBeenCalledWith(
        'http://localhost:3000/users',
        payload,
      );
      expect(res).toEqual(mockUser);
      done();
    });
  });

  it('should call PATCH update user', (done) => {
    const changes = { name: 'Updated' };

    httpMock.patch.mockReturnValue(of(mockUser));

    service.updateUser(1, changes).subscribe((res) => {
      expect(httpMock.patch).toHaveBeenCalledWith(
        'http://localhost:3000/users/1',
        changes,
      );
      expect(res).toEqual(mockUser);
      done();
    });
  });

  it('should call DELETE user', (done) => {
    httpMock.delete.mockReturnValue(of(void 0));

    service.deleteUser(1).subscribe((res) => {
      expect(httpMock.delete).toHaveBeenCalledWith(
        'http://localhost:3000/users/1',
      );
      expect(res).toBeUndefined();
      done();
    });
  });
});