import { Component } from '@angular/core';
import { filtrarEPaginar } from './functions/filter-page.function';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
})

export class AppComponent {
  usuarios: Usuario[] = [
    { id: 1, nome: 'Ana Silva', email: 'ana@email.com' },
    { id: 2, nome: 'Bruno Souza', email: 'bruno@email.com' },
    { id: 3, nome: 'Carlos Lima', email: 'carlos@email.com' },
    { id: 4, nome: 'Ana Costa', email: 'anacosta@email.com' },
    { id: 5, nome: 'Fernanda Rocha', email: 'fernanda@email.com' },
  ];

  // 📄 resultado tipado
  resultado = filtrarEPaginar<Usuario>(
    this.usuarios,
    (user) => user.nome.toLowerCase().includes('ana'),
    { pagina: 1, tamanho: 2 },
  );
}
