import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessDeniedComponent } from './access-denied.component';

describe('AccessDeniedComponent', () => {
  let component: AccessDeniedComponent;
  let fixture: ComponentFixture<AccessDeniedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        RouterTestingModule,
        AccessDeniedComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render access denied image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img');
    expect(img?.getAttribute('alt')).toBe('Acesso Negado');
  });

  it('should render title "ACESSO NEGADO"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h1.title');
    expect(title?.textContent).toContain('ACESSO NEGADO');
  });

  it('should render subtitle with permission message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const subtitle = compiled.querySelector('h2.subtitle');
    expect(subtitle?.textContent).toContain('Desculpe, mas você não tem permissão para acessar esta página.');
  });

  it('should render suggestion text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const suggestion = compiled.querySelector('span.suggestion');
    expect(suggestion?.textContent).toContain('sugerimos que você contate o seu administrador');
  });

  it('should have a button to navigate to the home page', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button?.textContent).toContain('Página Inicial');
    expect(button?.getAttribute('routerLink')).toBe('/');
  });
});
