import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  buscarUsuarios(termo: string): Observable<Usuario[]> {
    // mock simulando API
    const usuarios: Usuario[] = [
      { id: 1, nome: 'Ana Silva' },
      { id: 2, nome: 'Bruno Souza' },
      { id: 3, nome: 'Carlos Lima' },
      { id: 4, nome: 'Ana Costa' },
    ];

    const filtrados = usuarios.filter(u =>
      u.nome.toLowerCase().includes(termo.toLowerCase())
    );

    return of(filtrados).pipe(delay(800)); // simula latency
  }
}