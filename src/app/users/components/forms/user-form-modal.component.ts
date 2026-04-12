import { Component, inject, Inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

function cpfPartialValidator(control: any) {
  const value = control.value || '';
  const digits = value.replace(/\D/g, '');

  if (digits.length > 0 && digits.length < 11) {
    return { cpfIncomplete: true };
  }

  return null;
}

@Component({
  selector: 'app-user-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './user-form-modal.component.html',
  styleUrls: ['./user-form-modal.component.scss'],
})
export class UserFormModalComponent {
  private fb = inject(FormBuilder);

  constructor(
    private dialogRef: MatDialogRef<UserFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  form = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    cpf: [
      '',
      [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/), cpfPartialValidator],
    ],
    phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    typeOfPhone: [null],
  });

  ngOnInit() {
    if (this.data) {
      this.form.patchValue(this.data);
    }

    this.form.get('cpf')?.valueChanges.subscribe((value) => {
      if (!value) return;

      const digits = value.replace(/\D/g, '').slice(0, 11);

      const formatted = digits
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

      if (value !== formatted) {
        this.form.get('cpf')?.setValue(formatted, { emitEvent: false });
      }
    });

    // 🔧 Sanitiza telefone automaticamente
    this.form.get('phone')?.valueChanges.subscribe((value) => {
      if (!value) return;
      const onlyNumbers = value.replace(/\D/g, '');
      if (value !== onlyNumbers) {
        this.form.get('phone')?.setValue(onlyNumbers, { emitEvent: false });
      }
    });
  }

  getError(controlName: string): string | null {
    const control = this.form.get(controlName);

    if (!control || !control.touched) return null;

    if (control.hasError('required')) return 'Campo obrigatório';

    if (controlName === 'name' && control.hasError('pattern')) {
      return 'Nome deve conter apenas letras';
    }

    if (controlName === 'email' && control.hasError('email')) {
      return 'Email inválido';
    }

    if (controlName === 'cpf') {
      if (control.hasError('required')) {
        return 'CPF obrigatório';
      }

      if (control.hasError('cpfIncomplete')) {
        return 'CPF incompleto';
      }

      if (control.hasError('pattern')) {
        return 'CPF deve estar no formato 000.000.000-00';
      }
    }

    if (controlName === 'phone' && control.hasError('pattern')) {
      return 'Telefone deve conter apenas números';
    }

    return null;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
