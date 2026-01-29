import { EFieldType } from '../enums/field-type.enum';

export interface ILabelValue {
  label: string;
  value: number | boolean | string | unknown;
}

export interface IFormField {
  type: EFieldType;
  label: string;
  formControlName: string;
  placeholder: string;
  class: string;
  options?: Promise<ILabelValue[]>;
  password?: boolean;
}
