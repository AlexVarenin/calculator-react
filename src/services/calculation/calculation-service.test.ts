import { CalculationService } from './calculation-service';

test('3 + 4 - 1 should be 6', () => {
  const service = new CalculationService();
  service.append('3');
  service.append('+');
  service.append('4');
  service.append('-');
  service.append('1');
  expect(service.append('=')).toBe('6');
});

test('3 * 4 / 5 should be 2.4', () => {
  const service = new CalculationService();
  service.append('3');
  service.append('*');
  service.append('4');
  service.append('/');
  service.append('5');
  expect(service.append('=')).toBe('2.4');
});

test('3 + 2 * 3 should be 9', () => {
  const service = new CalculationService();
  service.append('3');
  service.append('+');
  service.append('2');
  service.append('*');
  service.append('3');
  expect(service.append('=')).toBe('9');
});

test('(3 + 2) * 3 should be 15', () => {
  const service = new CalculationService();
  service.append('(');
  service.append('3');
  service.append('+');
  service.append('2');
  service.append(')');
  service.append('*');
  service.append('3');
  expect(service.append('=')).toBe('15');
});

test('1 + (3 + 2) * 3 should be 16', () => {
  const service = new CalculationService();
  service.append('1');
  service.append('+');
  service.append('(');
  service.append('3');
  service.append('+');
  service.append('2');
  service.append(')');
  service.append('*');
  service.append('3');
  expect(service.append('=')).toBe('16');
});

test('dividing by zero', () => {
  const service = new CalculationService();
  service.append('1');
  service.append('/');
  service.append('0');
  expect(service.append('=')).toBe('Error');
});

test('reset', () => {
  const service = new CalculationService();
  service.append('1');
  service.append('+');
  service.append('1');
  expect(service.append('C')).toBe('0');
});

test('"=" feature test 1', () => {
  const service = new CalculationService();
  service.append('+');
  service.append('5');
  service.append('=');
  service.append('=');
  expect(service.append('=')).toBe('15');
});

test('"=" feature test 2', () => {
  const service = new CalculationService();
  service.append('5');
  service.append('+');
  service.append('=');
  service.append('=');
  expect(service.append('=')).toBe('20');
});

test('"=" feature test 3', () => {
  const service = new CalculationService();
  service.append('5');
  service.append('*');
  service.append('4');
  service.append('=');
  service.append('+');
  service.append('1');
  expect(service.append('=')).toBe('21');
});

test('js calculations bug fix (0.02 instead of 0.020000000000000004)', () => {
  const service = new CalculationService();
  service.append('0');
  service.append('.');
  service.append('1');
  service.append('*');
  service.append('0');
  service.append('.');
  service.append('2');
  expect(service.append('=')).toBe('0.02');
});

test('dot feature test 1 (5 + .2)', () => {
  const service = new CalculationService();
  service.append('5');
  service.append('+');
  service.append('.');
  service.append('2');
  expect(service.append('=')).toBe('5.2');
});

test('dot feature 2 (1.1.1 should be fixed to 1.11)', () => {
  const service = new CalculationService();
  service.append('1');
  service.append('.');
  service.append('1');
  service.append('.');
  expect(service.append('1')).toBe('1.11');
});


test('correct rounding (9 symbols on the screen)', () => {
  const service = new CalculationService();
  service.append('5');
  service.append('/');
  service.append('3');
  expect(service.append('=')).toBe('1.66666667');
});

test('correct rounding 2 (9 symbols on the screen)', () => {
  const service = new CalculationService();
  service.append('111111111');
  service.append('+');
  service.append('0');
  service.append('.');
  service.append('1');
  expect(service.append('=')).toBe('111111111');
});

test('correct rounding 3 (9 symbols on the screen)', () => {
  const service = new CalculationService();
  service.append('11111111');
  service.append('.');
  service.append('1');
  expect(service.append('1')).toBe('11111111.1');
});

test('correct exponential value (9 symbols on the screen)', () => {
  const service = new CalculationService();
  service.append('1');
  service.append('2');
  service.append('3');
  service.append('4');
  service.append('5');
  service.append('6');
  service.append('7');
  service.append('8');
  service.append('9');
  service.append('*');
  service.append('1');
  service.append('2');
  service.append('3');
  service.append('4');
  service.append('5');
  service.append('6');
  service.append('7');
  service.append('8');
  service.append('9');
  expect(service.append('=')).toBe('1.52416e16');
});

test('correct number recognition', () => {
  const service = new CalculationService();
  service.append('2');
  service.append('2');
  service.append('.');
  service.append('2');
  expect(service.append('1')).toBe('22.21');
});

test('correct runtime view', () => {
  const service = new CalculationService();
  expect(service.append('1')).toBe('1');
  expect(service.append('+')).toBe('1');
  expect(service.append('2')).toBe('2');
  expect(service.append('+')).toBe('3');
  expect(service.append('(')).toBe('3');
  expect(service.append('9')).toBe('9');
  expect(service.append('+')).toBe('9');
  expect(service.append('1')).toBe('1');
  expect(service.append(')')).toBe('10');
  expect(service.append('*')).toBe('10');
  expect(service.append('1')).toBe('1');
  expect(service.append('2')).toBe('12');
  expect(service.append('=')).toBe('123');
});

