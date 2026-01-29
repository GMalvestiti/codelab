import { FormatCodigoBarras } from './format-codigo-barras.pipe';

describe('FormatCodigoBarras', () => {
  it('create an instance', () => {
    const pipe = new FormatCodigoBarras();
    expect(pipe).toBeTruthy();
  });
});
