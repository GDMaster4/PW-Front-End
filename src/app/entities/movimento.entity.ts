import { Categoria } from "./categoria.entity";
import { Conto } from "./conto.entity";

export interface Movimento
{
  movimentoId: string,
  contoCorrente: Conto,
  data: string,
  importo: number,
  saldo: number,
  categoriaMovimento: Categoria,
  descrizioneEstesa: string
}