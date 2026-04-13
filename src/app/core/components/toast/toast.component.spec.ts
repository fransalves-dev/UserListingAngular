import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { ToastComponent } from './toast.component';
import { Toast } from '../../models/toast.model';

describe('ToastComponent', () => {
  let fixture: ComponentFixture<ToastComponent>;
  let component: ToastComponent;

  const snackBarRefMock = {
    dismiss: jest.fn(),
  };

  const createComponent = (data: Toast) => {
    TestBed.configureTestingModule({
      imports: [ToastComponent],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: data },
        { provide: MatSnackBarRef, useValue: snackBarRefMock },
      ],
    });

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('should create component', () => {
    createComponent({
      type: 'success',
      message: 'OK',
    });

    expect(component).toBeTruthy();
  });

  it('should render success toast data', () => {
    createComponent({
      type: 'success',
      message: 'Operação concluída',
    });

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.message')?.textContent).toContain(
      'Operação concluída',
    );

    expect(compiled.querySelector('.title')?.textContent).toContain(
      'Sucesso',
    );
  });

  it('should render error toast data', () => {
    createComponent({
      type: 'error',
      message: 'Algo deu errado',
    });

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.title')?.textContent).toContain('Erro');
    expect(compiled.querySelector('.message')?.textContent).toContain(
      'Algo deu errado',
    );
  });

  it('should call dismiss when close button is clicked', () => {
    createComponent({
      type: 'success',
      message: 'OK',
    });

    const button = fixture.nativeElement.querySelector(
      '.close-btn',
    ) as HTMLButtonElement;

    button.click();

    expect(snackBarRefMock.dismiss).toHaveBeenCalled();
  });
});