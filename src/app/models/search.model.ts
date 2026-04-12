import { Usuario } from "./user.model";

export interface BuscaState  {
  loading: boolean;
  data: Usuario[];
};