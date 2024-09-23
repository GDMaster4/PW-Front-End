import { User } from "./user.entity";

export interface Conto
{
  id: string;
  user:User;
  dataApertura: string;
  iban:string;
  saldo:number
}