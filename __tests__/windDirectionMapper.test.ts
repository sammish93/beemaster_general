import getWindDirectionIconFromAngle from "@/domain/windDirectionMapper";

describe('Wind Direction Mapper Tests', () => {
  test('returns arrow-down-thick for north wind', () => {
    expect(getWindDirectionIconFromAngle(0.4)).toBe('arrow-down-thick');
    expect(getWindDirectionIconFromAngle(360.0)).toBe('arrow-down-thick');
    expect(getWindDirectionIconFromAngle(1)).toBe('arrow-down-thick');
    expect(getWindDirectionIconFromAngle(359)).toBe('arrow-down-thick');
  });

  test('returns arrow-bottom-left-thick for north east wind', () => {
    expect(getWindDirectionIconFromAngle(35.1)).toBe('arrow-bottom-left-thick');
    expect(getWindDirectionIconFromAngle(45)).toBe('arrow-bottom-left-thick');
    expect(getWindDirectionIconFromAngle(55)).toBe('arrow-bottom-left-thick');
  });

  test('returns arrow-left-thick for east wind', () => {
    expect(getWindDirectionIconFromAngle(80.2)).toBe('arrow-left-thick');
    expect(getWindDirectionIconFromAngle(90)).toBe('arrow-left-thick');
    expect(getWindDirectionIconFromAngle(100)).toBe('arrow-left-thick');
  });

  test('returns arrow-top-left-thick for south east wind', () => {
    expect(getWindDirectionIconFromAngle(125.532)).toBe('arrow-top-left-thick');
    expect(getWindDirectionIconFromAngle(135)).toBe('arrow-top-left-thick');
    expect(getWindDirectionIconFromAngle(145)).toBe('arrow-top-left-thick');
  });

  test('returns arrow-up-thick for south wind', () => {
    expect(getWindDirectionIconFromAngle(170.41)).toBe('arrow-up-thick');
    expect(getWindDirectionIconFromAngle(180)).toBe('arrow-up-thick');
    expect(getWindDirectionIconFromAngle(190)).toBe('arrow-up-thick');
  });

  test('returns arrow-top-right-thick for south west wind', () => {
    expect(getWindDirectionIconFromAngle(215.4)).toBe('arrow-top-right-thick');
    expect(getWindDirectionIconFromAngle(225)).toBe('arrow-top-right-thick');
    expect(getWindDirectionIconFromAngle(235)).toBe('arrow-top-right-thick');
  });

  test('returns arrow-right-thick for west wind', () => {
    expect(getWindDirectionIconFromAngle(260.35)).toBe('arrow-right-thick');
    expect(getWindDirectionIconFromAngle(270)).toBe('arrow-right-thick');
    expect(getWindDirectionIconFromAngle(280)).toBe('arrow-right-thick');
  });

  test('returns arrow-bottom-right-thick for north west wind', () => {
    expect(getWindDirectionIconFromAngle(305.3)).toBe('arrow-bottom-right-thick');
    expect(getWindDirectionIconFromAngle(315)).toBe('arrow-bottom-right-thick');
    expect(getWindDirectionIconFromAngle(325)).toBe('arrow-bottom-right-thick');
  });

  test('throws an error for invalid wind direction angles', () => {
    expect(() => getWindDirectionIconFromAngle(-1)).toThrow(`'-1' is not a valid angle.`);
    expect(() => getWindDirectionIconFromAngle(361)).toThrow(`'361' is not a valid angle.`);
    expect(() => getWindDirectionIconFromAngle(360.6)).toThrow(`'360.6' is not a valid angle.`);
  });
});
