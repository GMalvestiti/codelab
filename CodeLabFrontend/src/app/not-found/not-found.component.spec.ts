import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { NotFoundComponent } from './not-found.component';
import { EMensagem } from '../shared/enums/mensagem.enum';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        RouterTestingModule,
        NotFoundComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render page not found image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img');
    expect(img?.getAttribute('alt')).toBe('Página não encontrada');
  });

  it('should render title "Página não encontrada!"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h1.title');
    expect(title?.textContent).toContain('Oops!');
  });

  it('should have a button to navigate to home page', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button?.textContent).toContain('Ir para página inicial');
    expect(button?.getAttribute('routerLink')).toBe('/home');
  });
});
