export interface PaginaParams {
  pagina: number;
  tamanho: number;
}

export interface Pagina<T> {
  itens: T[];
  total: number;
  pagina: number;
  tamanho: number;
  totalPaginas: number;
}