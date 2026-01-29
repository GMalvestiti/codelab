import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { PessoaCadastroComponent } from './pessoa-cadastro.component';
import { PessoaService } from '../pessoa.service';
import { Injector } from '@angular/core';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PessoaCadastroComponent', () => {
  let component: PessoaCadastroComponent;
  let fixture: ComponentFixture<PessoaCadastroComponent>;
  let pessoaServiceMock: any;

  beforeEach(async () => {
    pessoaServiceMock = {
      findOneById: jest.fn().mockReturnValue(of({ data: null })),
      create: jest.fn().mockReturnValue(of({ message: '', data: { id: 1 } })),
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatDialogModule,
        PessoaCadastroComponent,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: PessoaService, useValue: pessoaServiceMock },
        { provide: Injector, useValue: Injector.create([]) },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } },
        { provide: MatDialog, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form group with controls', () => {
    expect(component.cadastroFormGroup.contains('id')).toBeFalsy();
    expect(component.cadastroFormGroup.contains('nome')).toBeTruthy();
    expect(component.cadastroFormGroup.contains('documento')).toBeTruthy();
    expect(component.cadastroFormGroup.contains('cep')).toBeTruthy();
    expect(component.cadastroFormGroup.contains('endereco')).toBeTruthy();
    expect(component.cadastroFormGroup.contains('telefone')).toBeTruthy();
    expect(component.cadastroFormGroup.contains('ativo')).toBeTruthy();
  });

  it('should make the nome control required', () => {
    const control = component.cadastroFormGroup.get('nome');
    control!.setValue('');
    expect(control!.valid).toBeFalsy();
  });

  it('should make the documento control required', () => {
    const control = component.cadastroFormGroup.get('documento');
    control!.setValue('');
    expect(control!.valid).toBeFalsy();
  });

  it('should make the cep control required', () => {
    const control = component.cadastroFormGroup.get('cep');
    control!.setValue('');
    expect(control!.valid).toBeFalsy();
  });

  it('should make the endereco control required', () => {
    const control = component.cadastroFormGroup.get('endereco');
    control!.setValue('');
    expect(control!.valid).toBeFalsy();
  });

  it('should make the telefone control required and validate pattern', () => {
    const control = component.cadastroFormGroup.get('telefone');
    control!.setValue('');
    expect(control!.valid).toBeFalsy();

    control!.setValue('invalid-phone');
    expect(control!.valid).toBeFalsy();

    control!.setValue('199 18521516');
    expect(control!.valid).toBeTruthy();
  });

  it('should call saveCadastro on submit', () => {
    const saveSpy = jest.spyOn(pessoaServiceMock, 'create');
    component.cadastroFormGroup.patchValue({
      id: null,
      nome: 'Test Name',
      documento: '12345678901',
      cep: '12345-678',
      endereco: 'Test Address',
      telefone: '199 18521516',
      ativo: true,
    });
    component.save();
    expect(saveSpy).toHaveBeenCalled();
  });
});
