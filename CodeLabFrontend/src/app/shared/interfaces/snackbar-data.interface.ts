import { ESnackbarType } from '../enums/snackbar-type.enum';

export interface ISnackBarData {
  message: string;
  buttonText: string;
  type: ESnackbarType;
}
