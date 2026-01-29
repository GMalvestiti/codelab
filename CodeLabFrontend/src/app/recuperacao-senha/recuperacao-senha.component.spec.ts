import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RecuperacaoSenhaComponent } from './recuperacao-senha.component';
import { RecuperacaoSenhaService } from './recuperacao-senha.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EMensagem } from '../shared/enums/mensagem.enum';
import { ESnackbarType } from '../shared/enums/snackbar-type.enum';

describe('RecuperacaoSenhaComponent', () => {
  let component: RecuperacaoSenhaComponent;
  let fixture: ComponentFixture<RecuperacaoSenhaComponent>;
  let mockRecuperacaoSenhaService: any;
  let mockSnackBar: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockRecuperacaoSenhaService = {
      recuperarSenha: jest.fn(),
    };
    mockSnackBar = {
      openFromComponent: jest.fn(),
    };
    mockRouter = {
      navigate: jest.fn(),
    };
    mockActivatedRoute = {
      queryParams: of({ email: 'test@example.com', token: 'testToken' }),
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        NoopAnimationsModule,
        RecuperacaoSenhaComponent,
      ],
      providers: [
        { provide: RecuperacaoSenhaService, useValue: mockRecuperacaoSenhaService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperacaoSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with email and token from queryParams', () => {
    expect(component.recuperarSenhaForm.value.email).toBe('test@example.com');
    expect(component.recuperarSenhaForm.value.token).toBe('testToken');
  });

  it('should mark form as touched and show warning if form is invalid', () => {
    component.recuperarSenhaForm.controls['senha'].setValue(null);
    component.recuperarSenha(new Event('submit'));

    expect(component.recuperarSenhaForm.touched).toBe(true);
    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(expect.anything(), {
      duration: 5000,
      data: {
        message: EMensagem.CAMPOS_NAO_PREENCHIDOS,
        buttonText: EMensagem.FECHAR,
        type: ESnackbarType.warning,
      },
      panelClass: ESnackbarType.warning,
      horizontalPosition: 'end',
    });
  });

  it('should call recuperarSenha service and navigate to login on success', () => {
    mockRecuperacaoSenhaService.recuperarSenha.mockReturnValue(of({ data: true }));
    component.recuperarSenhaForm.controls['senha'].setValue('validPassword');
    component.recuperarSenha(new Event('submit'));

    expect(mockRecuperacaoSenhaService.recuperarSenha).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(expect.anything(), {
      duration: 5000,
      data: {
        message: EMensagem.SENHA_ALTERADA_SUCESSO,
        buttonText: EMensagem.FECHAR,
        type: ESnackbarType.success,
      },
      panelClass: ESnackbarType.success,
      horizontalPosition: 'end',
    });
  });

  it('should show error message if recuperarSenha fails', () => {
    mockRecuperacaoSenhaService.recuperarSenha.mockReturnValue(of({ data: false }));
    component.recuperarSenhaForm.controls['senha'].setValue('validPassword');
    component.recuperarSenha(new Event('submit'));

    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(expect.anything(), {
      duration: 5000,
      data: {
        message: EMensagem.ALGO_DEU_ERRADO,
        buttonText: EMensagem.FECHAR,
        type: ESnackbarType.error,
      },
      panelClass: ESnackbarType.error,
      horizontalPosition: 'end',
    });
  });
});
