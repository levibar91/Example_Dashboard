import { SeperateBySnakeOrCamelCasePipe } from './seperate-by-snake-or-camel-case.pipe';

describe('SeperateBySnakeOrCamelCasePipe', () => {
  it('create an instance', () => {
    const pipe = new SeperateBySnakeOrCamelCasePipe();
    expect(pipe).toBeTruthy();
  });
});
