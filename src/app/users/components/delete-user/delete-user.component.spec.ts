import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './delete-user.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmDialogComponent', () => {
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let component: ConfirmDialogComponent;

  const dialogRefMock = {
    close: jest.fn(),
  };

  const createComponent = (data: any = { message: 'Deseja deletar?' }) => {
    TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    });

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  };

  it('should create component', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should close dialog with true on confirm', () => {
    createComponent();

    component.confirm();

    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });

  it('should close dialog with false on close', () => {
    createComponent();

    component.close();

    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });

  it('should receive injected data', () => {
    const data = { message: 'Teste de delete' };

    createComponent(data);

    expect(component.data.message).toBe('Teste de delete');
  });
});