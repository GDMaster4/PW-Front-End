import { User } from "./user.entity";

export interface Conto
{
  contoCorrenteID: string;
  user:User;
  dataApertura: string;
  iban:string;
  saldo:number
}