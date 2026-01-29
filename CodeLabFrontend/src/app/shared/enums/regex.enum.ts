export enum ERegex {
  NUMERICO = '^[0-9]{1,11}(\\.[0-9]{1,2})?$',
  CODIGO_BARRAS = '^[0-9]{13}$',
  TELEFONE = '^[0-9 ]{12,14}$',
  INTEIRO_POSITIVO = '^[0-9]+$',
}
