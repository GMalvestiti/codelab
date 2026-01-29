import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty } from 'class-validator';
import { EMensagem } from '../../../shared/enums/mensagem.enum';
import { CreateVendaItemDto } from './create-venda-item.dto';
import { UpdateVendaItemDto } from './update-venda-item.dto';

export class CreateVendaDto {
  @IsNotEmpty({ message: `idPessoa ${EMensagem.NAO_PODE_SER_VAZIO}` })
  idPessoa: number;

  @IsNotEmpty({
    message: `idUsuarioLancamento ${EMensagem.NAO_PODE_SER_VAZIO}`,
  })
  idUsuarioLancamento: number;

  @IsNotEmpty({ message: `valorTotal ${EMensagem.NAO_PODE_SER_VAZIO}` })
  valorTotal: number;

  @IsNotEmpty({ message: `formaPagamento ${EMensagem.NAO_PODE_SER_VAZIO}` })
  formaPagamento: number;

  @IsArray({ message: `vendaitem ${EMensagem.TIPO_INVALIDO}` })
  @Type(() => CreateVendaItemDto)
  vendaitem: CreateVendaItemDto[] | UpdateVendaItemDto[];
}
