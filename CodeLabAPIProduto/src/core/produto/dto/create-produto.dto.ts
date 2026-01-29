import {
  IsArray,
  IsBase64,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { EMensagem } from '../../../shared/enums/mensagem.enum';

export class CreateProdutoDto {
  @IsNotEmpty({ message: `descricao ${EMensagem.NAO_PODE_SER_VAZIO}` })
  @MaxLength(60, {
    message: `descricao ${EMensagem.MAIS_CARACTERES_QUE_PERMITIDO}`,
  })
  descricao: string;

  @IsNotEmpty({ message: `precoCusto ${EMensagem.NAO_PODE_SER_VAZIO}` })
  precoCusto: number;

  @IsNotEmpty({ message: `precoVenda ${EMensagem.NAO_PODE_SER_VAZIO}` })
  precoVenda: number;

  @IsBase64()
  @IsOptional()
  imagem: string;

  @IsNotEmpty({ message: `ativo ${EMensagem.NAO_PODE_SER_VAZIO}` })
  ativo: boolean;

  @IsArray({ message: `codigoBarras ${EMensagem.NAO_VALIDO}` })
  @IsString({ each: true })
  codigoBarras: string[];
}
