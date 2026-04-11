export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  typeOfPhone: "Celular" | "Fixo" | null;
}