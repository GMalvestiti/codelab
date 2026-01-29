import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { IConfirmDialogData } from '../../interfaces/confirm-dialog-data.interface';

@Component({
  selector: 'cl-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  titleText = 'Confirme sua Ação';
  contentText = 'Deseja confirmar essa ação?';
  confirmText = 'Confirmar';
  cancelText = 'Cancelar';

  constructor(@Inject(MAT_DIALOG_DATA) public data: IConfirmDialogData) {
    this.titleText = this.data.titleText ?? this.titleText;
    this.contentText = this.data.contentText ?? this.contentText;
    this.confirmText = this.data.confirmText ?? this.confirmText;
    this.cancelText = this.data.cancelText ?? this.cancelText;
  }
}
