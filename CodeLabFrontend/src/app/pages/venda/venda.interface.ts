export interface IVenda {
  id: number;
  idPessoa: number;
  idUsuarioLancamento: number;
  valorTotal: number;
  dataHora: Date | null;
  formaPagamento: number;
  vendaitem: IVendaItem[];
}

export interface IVendaItem {
  id: number;
  idVenda: number | null;
  idProduto: number;
  quantidade: number;
  precoVenda: number;
  valorTotal: number;
}
