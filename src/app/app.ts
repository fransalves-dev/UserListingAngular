import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  catchError,
  startWith,
  finalize,
  map,
} from 'rxjs/operators';
import { CommonModule } from '@angular/common';import { Usuario } from './models/user.model';
import { UsuarioService } from './services/user.service';
;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
})
export class AppComponent {
  searchControl = new FormControl('');

  loading = false;

 usuariosState$ = this.searchControl.valueChanges.pipe(
  startWith(''),
  debounceTime(500),
  distinctUntilChanged(),
  switchMap((termo) =>
    this.usuarioService.buscarUsuarios(termo || '').pipe(
      map((data) => ({ loading: false, data })),
      startWith({ loading: true, data: [] }),
      catchError(() => of({ loading: false, data: [] }))
    )
  )
);

  constructor(private usuarioService: UsuarioService) {}
}