import { ZipcodePipe } from './zip-code.pipe';

describe('ZipCodePipe', () => {
  it('create an instance', () => {
    const pipe = new ZipcodePipe();
    expect(pipe).toBeTruthy();
  });
});
