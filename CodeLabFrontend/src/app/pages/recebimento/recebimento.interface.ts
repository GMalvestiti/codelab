export interface IContaReceber {
  id: number;
  idPessoa: number;
  pessoa: string;
  idUsuarioLancamento: number;
  valorTotal: number;
  dataHora: Date | null;
  pago: boolean;
  baixa: IContaReceberBaixa[];
}

export interface IContaReceberBaixa {
  id: number;
  idContaReceber: number;
  idUsuarioBaixa: number;
  valorPago: number;
  dataHora: Date | null;
}
