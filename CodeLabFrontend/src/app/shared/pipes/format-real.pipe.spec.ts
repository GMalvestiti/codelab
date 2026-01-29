import { FormatRealPipe } from './format-real.pipe';

describe('FormatRealPipe', () => {
  let pipe: FormatRealPipe;

  beforeEach(() => {
    pipe = new FormatRealPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a number correctly', () => {
    const value = 1234.56;
    const result = pipe.transform(value);
    expect(result).toBe('R$ 1234.56');
  });

  it('should format a string correctly', () => {
    const value = '1234.56';
    const result = pipe.transform(value);
    expect(result).toBe('R$ 1234.56');
  });

  it('should handle integer values correctly', () => {
    const value = 1234;
    const result = pipe.transform(value);
    expect(result).toBe('R$ 1234');
  });

  it('should handle string integer values correctly', () => {
    const value = '1234';
    const result = pipe.transform(value);
    expect(result).toBe('R$ 1234');
  });

  it('should handle zero correctly', () => {
    const value = 0;
    const result = pipe.transform(value);
    expect(result).toBe('R$ 0');
  });

  it('should handle string zero correctly', () => {
    const value = '0';
    const result = pipe.transform(value);
    expect(result).toBe('R$ 0');
  });

  it('should handle negative numbers correctly', () => {
    const value = -1234.56;
    const result = pipe.transform(value);
    expect(result).toBe('R$ -1234.56');
  });

  it('should handle negative string numbers correctly', () => {
    const value = '-1234.56';
    const result = pipe.transform(value);
    expect(result).toBe('R$ -1234.56');
  });
});
