import { Component, Input } from '@angular/core';
import { Movimento } from '../../entities/movimenti.entity';
import { TipoMov } from '../../entities/tipologiaMov.entity';

@Component({
  selector: 'app-movimenti-detail',
  templateUrl: './movimenti-detail.component.html',
  styleUrl: './movimenti-detail.component.css'
})
export class MovimentiDetailComponent {
  movimentoMock : Movimento = {
    IdMovimento: '123ujhv923',
    IdCC: '13123123ccc',
    Descrizione: 'Test gesù bambino',
    DataMovimento: new Date(),
    Importo: -123.45,
    Categoria: {
      IdTipoMov: '112233aa',
      Nome: 'Bonifico Ordinario',
      Tipologia: 'USCITA'
    }
  }
}
