import { PaginaParams, Pagina } from "../models/pagination.model";

export function filtrarEPaginar<T>(
  data: T[],
  filterFn: (item: T) => boolean,
  params: PaginaParams
): Pagina<T> {
  const { pagina, tamanho } = params;

  const paginaNormalizada = Math.max(1, pagina);
  const tamanhoNormalizado = Math.max(1, tamanho);

  const filtrados = data.filter(filterFn);
  const total = filtrados.length;

  const inicio = (paginaNormalizada - 1) * tamanhoNormalizado;
  const fim = inicio + tamanhoNormalizado;

  const itens = filtrados.slice(inicio, fim);

  return {
    itens,
    total,
    pagina: paginaNormalizada,
    tamanho: tamanhoNormalizado,
    totalPaginas: Math.ceil(total / tamanhoNormalizado),
  };
}