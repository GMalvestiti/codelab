import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseCadastroComponent } from './base-cadastro.component'; // ajuste o caminho conforme necessário
import { BaseResourceService } from '../base-resource/base-resource.service';
import { of } from 'rxjs';
import { EMensagem } from '../../enums/mensagem.enum';
import { ESnackbarType } from '../../enums/snackbar-type.enum';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Component({ template: '' })
class TestComponent extends BaseCadastroComponent<{ id: number }> implements OnInit {
  cadastroFormGroup: FormGroup;
  cadastroFields = [];

  constructor(
    protected override readonly _service: BaseResourceService<{ id: number }>,
    protected override readonly _injector: Injector
  ) {
    super(_service, _injector);
    this.cadastroFormGroup = new FormBuilder().group({});
  }

  override ngOnInit(): void {
    this.callHandleEdit();
  }

  public callHandleEdit(): void {
    this.handleEdit();
  }

  public override patchFormForEdit(data: { id: number }): void {
    return;
  }

  public override saveEditar(): void {
    return;
  }

  public override saveCadastro(): void {
    return;
  }
}

describe('BaseCadastroComponent', () => {
  let component: TestComponent;
  let mockService: jest.Mocked<BaseResourceService<{ id: number }>>;
  let mockDialog: jest.Mocked<MatDialog>;
  let mockSnackBar: jest.Mocked<MatSnackBar>;
  let mockRouter: jest.Mocked<Router>;
  let mockActivatedRoute: jest.Mocked<ActivatedRoute>;

  beforeEach(() => {
    mockService = {
      findOneById: jest.fn(),
      updateById: jest.fn(),
      create: jest.fn(),
    } as any;

    mockDialog = { open: jest.fn() } as any;
    mockSnackBar = { openFromComponent: jest.fn() } as any;
    mockRouter = { navigate: jest.fn() } as any;
    mockActivatedRoute = { snapshot: { params: {} } } as any;

    const injector = {
      get: (token: any) => {
        switch (token) {
          case Router:
            return mockRouter;
          case ActivatedRoute:
            return mockActivatedRoute;
          case MatDialog:
            return mockDialog;
          case MatSnackBar:
            return mockSnackBar;
          default:
            return null;
        }
      },
    } as Injector;

    component = new TestComponent(mockService, injector);
  });

  describe('ngOnInit', () => {
    it('should call handleEdit on init', () => {
      const handleEditSpy = jest.spyOn(component, 'callHandleEdit');
      component.ngOnInit();
      expect(handleEditSpy).toHaveBeenCalled();
    });
  });

  describe('handleEdit', () => {
    it('should navigate to cadastro if id is NaN', () => {
      mockActivatedRoute.snapshot.params['id'] = 'invalid';
      component.callHandleEdit();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['../../cadastro'], { relativeTo: mockActivatedRoute });
    });

    it('should call service to find by id and patch form if data is found', () => {
      const mockResponse = { message: 'Success', data: { id: 1 } };
      mockActivatedRoute.snapshot.params['id'] = '1';
      mockService.findOneById.mockReturnValue(of(mockResponse));
      const patchFormForEditSpy = jest.spyOn(component, 'patchFormForEdit');

      component.callHandleEdit();

      expect(mockService.findOneById).toHaveBeenCalledWith(1);
      expect(patchFormForEditSpy).toHaveBeenCalledWith(mockResponse.data);
    });
  });


  describe('save', () => {
    beforeEach(() => {
      component.cadastroFormGroup = new FormBuilder().group({ field: ['test'] });
    });

    it('should show snackbar if form is invalid', () => {
      component.cadastroFormGroup.setErrors({ invalid: true });
      component.save();

      expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(SnackbarComponent, {
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

    it('should call saveEditar if editing', () => {
      component.idEdit = 1;
      const saveEditarSpy = jest.spyOn(component, 'saveEditar');
      component.save();

      expect(saveEditarSpy).toHaveBeenCalled();
    });

    it('should call saveCadastro if creating', () => {
      component.idEdit = undefined as any;
      const saveCadastroSpy = jest.spyOn(component, 'saveCadastro');
      component.save();

      expect(saveCadastroSpy).toHaveBeenCalled();
    });
  });

  describe('canDeactivate', () => {
    it('should return true if form is not touched', () => {
      component.cadastroFormGroup.markAsPristine();
      expect(component.canDeactivate()).toBe(true);
    });

    it('should open dialog if form is touched', () => {
      component.cadastroFormGroup.markAsDirty();
      mockDialog.open.mockReturnValue({
        afterClosed: () => of(true),
        close: jest.fn(),
        backdropClick: jest.fn(),
        keydownEvents: jest.fn(),
        updateSize: jest.fn(),
        updatePosition: jest.fn(),
        addPanelClass: jest.fn(),
        removePanelClass: jest.fn(),
      } as any);

      expect(component.canDeactivate()).toEqual(true);
    });
  });
});
