import { FileSizePipe } from './file-size.pipe';

describe('FileSizePipe', () => {
  it('create an instance', () => {
    const pipe = new FileSizePipe();
    expect(pipe).toBeTruthy();
  });

  it('should convert the sizes', () => {
    const pipe = new FileSizePipe();
    expect(pipe.transform(1024)).toBe('1.00 KB');
    expect(pipe.transform(1024, 0)).toBe('1 KB');
    expect(pipe.transform(1023, 0)).toBe('1023 bytes');
    expect(pipe.transform(1024 * 1024, 0)).toBe('1 MB');
    expect(pipe.transform(1024 * 1024 * 1024, 0)).toBe('1 GB');
    expect(pipe.transform(1024 * 1024 * 1024 * 1024, 0)).toBe('1 TB');
    expect(pipe.transform(1024 * 1024 * 1024 * 1024 * 1024, 0)).toBe('1 PB');
  });
});
