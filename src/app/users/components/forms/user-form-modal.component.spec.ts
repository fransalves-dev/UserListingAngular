import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormModalComponent } from './user-form-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('UserFormModalComponent', () => {
  let fixture: ComponentFixture<UserFormModalComponent>;
  let component: UserFormModalComponent;

  const dialogRefMock = {
    close: jest.fn(),
  };

  const createComponent = (data: any = null) => {
    TestBed.configureTestingModule({
      imports: [UserFormModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    });

    fixture = TestBed.createComponent(UserFormModalComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  };

  it('should create component', () => {
    createComponent();
    expect(component).toBeTruthy();
  });


  it('should create form with invalid initial state', () => {
    createComponent();

    expect(component.form.valid).toBe(false);
  });

  it('should patch form when data is provided', () => {
    const data = {
      name: 'John',
      email: 'john@test.com',
      cpf: '123.456.789-00',
      phone: '999',
      typeOfPhone: 'Celular',
    };

    createComponent(data);

    expect(component.form.get('name')?.value).toBe('John');
    expect(component.form.get('email')?.value).toBe('john@test.com');
  });

  // ----------------------------
  // VALIDATION LOGIC
  // ----------------------------
  it('should mark form as invalid when required fields are empty', () => {
    createComponent();

    component.save();

    expect(component.form.touched).toBe(true);
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should close dialog with value when form is valid', () => {
    createComponent();

    component.form.setValue({
      name: 'John',
      email: 'john@test.com',
      cpf: '123.456.789-00',
      phone: '999',
      typeOfPhone: 'Celular',
    });

    component.save();

    expect(dialogRefMock.close).toHaveBeenCalledWith(
      component.form.value,
    );
  });

  it('should close dialog without value', () => {
    createComponent();

    component.close();

    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should return required error message', () => {
    createComponent();

    const control = component.form.get('name');
    control?.markAsTouched();
    control?.setErrors({ required: true });

    expect(component.getError('name')).toBe('Campo obrigatório');
  });

  it('should return email error message', () => {
    createComponent();

    const control = component.form.get('email');
    control?.markAsTouched();
    control?.setErrors({ email: true });

    expect(component.getError('email')).toBe('Email inválido');
  });

  it('should return cpf incomplete error', () => {
    createComponent();

    const control = component.form.get('cpf');
    control?.markAsTouched();
    control?.setErrors({ cpfIncomplete: true });

    expect(component.getError('cpf')).toBe('CPF incompleto');
  });

  it('should return phone pattern error', () => {
    createComponent();

    const control = component.form.get('phone');
    control?.markAsTouched();
    control?.setErrors({ pattern: true });

    expect(component.getError('phone')).toBe(
      'Telefone deve conter apenas números',
    );
  });
});