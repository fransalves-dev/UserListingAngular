import { Component, computed, effect, output, signal } from '@angular/core';
import { ItemCarrinho } from './models/cart-item.model';
import { CurrencyPipe } from '@angular/common';
;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './app.html',
})
export class AppComponent {
   itens = signal<ItemCarrinho[]>([]);

   total = computed(() =>
    this.itens().reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    )
  );

   totalChange = output<number>();

  constructor() {
    effect(() => {
      this.totalChange.emit(this.total());
    });
  }

   adicionarItem(novoItem: ItemCarrinho) {
    this.itens.update((itens) => {
      const existente = itens.find(i => i.id === novoItem.id);

      if (existente) {
        return itens.map(i =>
          i.id === novoItem.id
            ? { ...i, quantidade: i.quantidade + novoItem.quantidade }
            : i
        );
      }

      return [...itens, novoItem];
    });
  }

  removerItem(itemId: number) {
    this.itens.update((itens) =>
      itens
        .map(i =>
          i.id === itemId
            ? { ...i, quantidade: i.quantidade - 1 }
            : i
        )
        .filter(i => i.quantidade > 0)
    );
  }

}