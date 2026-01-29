export interface IProduto {
  id: number;
  descricao: string;
  precoCusto: number;
  precoVenda: number;
  imagem: string | null;
  codigoBarras: string[];
  ativo: boolean;
}
