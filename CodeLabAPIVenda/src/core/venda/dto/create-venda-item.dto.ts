import { IsNotEmpty } from 'class-validator';
import { EMensagem } from '../../../shared/enums/mensagem.enum';

export class CreateVendaItemDto {
  @IsNotEmpty({ message: `idProduto ${EMensagem.NAO_PODE_SER_VAZIO}` })
  idProduto: number;

  @IsNotEmpty({ message: `quantidade ${EMensagem.NAO_PODE_SER_VAZIO}` })
  quantidade: number;

  @IsNotEmpty({ message: `precoVenda ${EMensagem.NAO_PODE_SER_VAZIO}` })
  precoVenda: number;

  @IsNotEmpty({ message: `valorTotal ${EMensagem.NAO_PODE_SER_VAZIO}` })
  valorTotal: number;
}
