import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { ISnackBarData } from '../../interfaces/snackbar-data.interface';

@Component({
  selector: 'cl-snackbar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
  ],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent {
  message: string = '<mensagem>';
  buttonText: string = '<botão>';

  constructor(
    protected readonly snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: ISnackBarData,
  ) {
    this.message = data.message;
    this.buttonText = data.buttonText;
  }

  close() {
    this.snackBarRef.dismissWithAction();
  }
}
