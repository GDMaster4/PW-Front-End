import { TipoMov } from "./tipologiaMov.entity";

export interface Movimento {
  IdMovimento : string,
  IdCC: string,
  Descrizione: string,
  DataMovimento: Date,
  Importo: number,
  Saldo?: number,
  Categoria: TipoMov,
}
