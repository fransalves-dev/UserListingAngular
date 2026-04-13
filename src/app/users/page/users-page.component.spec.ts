import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersPageComponent } from './users-page.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectUsers, selectUsersLoading, selectUsersError } from '../store/users.selectors';
import { UsersActions } from '../store/users.actions';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('UsersPageComponent', () => {
  let fixture: ComponentFixture<UsersPageComponent>;
  let component: UsersPageComponent;
  let store: MockStore;

  const dialogMock = {
    open: jest.fn(),
  };

  const mockUsers = [
    {
      id: 1,
      name: 'John',
      email: 'john@test.com',
      phone: '123',
      cpf: '000',
      typeOfPhone: null,
    },
  ];

  const createComponent = (users = mockUsers, loading = false, error = null) => {
    TestBed.configureTestingModule({
      imports: [UsersPageComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectUsers, value: users },
            { selector: selectUsersLoading, value: loading },
            { selector: selectUsersError, value: error },
          ],
        }),
        { provide: MatDialog, useValue: dialogMock },
      ],
    });

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(UsersPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  };

  it('should create component', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUsers on init', () => {
    createComponent();

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      UsersActions.loadUsers(),
    );
  });

  it('should update search term', () => {
    createComponent();

    component.onSearch('john');

    expect(component.searchTerm()).toBe('john');
  });

  it('should filter users by search term', () => {
    createComponent();

    component.onSearch('john');

    expect(component.filteredUsers().length).toBe(1);
  });

  it('should return empty when no match', () => {
    createComponent(mockUsers, false, null);

    component.onSearch('zzz');

    expect(component.filteredUsers()).toEqual([]);
  });

  it('should dispatch addUser after dialog closes with result', () => {
    const dispatchSpy = jest.fn();

    dialogMock.open.mockReturnValue({
      afterClosed: () => of({
        name: 'New',
        email: 'new@test.com',
        phone: '123',
        cpf: '000',
        typeOfPhone: null,
      }),
    });

    createComponent();

    jest.spyOn(store, 'dispatch').mockImplementation(dispatchSpy);

    component.openCreate();

    expect(dispatchSpy).toHaveBeenCalledWith(
      UsersActions.addUser({
        user: expect.objectContaining({
          name: 'New',
        }),
      }),
    );
  });

  it('should show empty state when no users', () => {
    createComponent([], false, null);

    expect(component.filteredUsers().length).toBe(0);
  });
});