import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './user-list.component';
import { provideMockStore } from '@ngrx/store/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { UsersActions } from '../../store/users.actions';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  const dialogMock = {
    open: jest.fn(),
  };

  const storeMock = {
    dispatch: jest.fn(),
  };

  const mockUser = {
    id: 1,
    name: 'John',
    email: 'john@test.com',
    phone: '123',
    cpf: '000',
    typeOfPhone: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      providers: [
        provideMockStore(),
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});