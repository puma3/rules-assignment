export const isValidIntInput = (input) => /^([0-9]*)$/.test(input);
export const isValidFloatInput = (input) =>
  /^([0-9]*(?:[.][0-9]*)?)$/.test(input);
