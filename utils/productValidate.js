import * as invalidTypes from "./productCheckInvalidTypes.js";

const checkString = (control, invalidType) => {
  if (control.value && control.value.length > 2) {
    control.setCustomValidity("");
    return true;
  } else {
    control.setCustomValidity(invalidType);
    return false;
  }
};

export const checkCode = (control) => {
  checkString(control, invalidTypes.needCode);
  control.reportValidity();
};

export const checkName = (control) => {
  checkString(control, invalidTypes.needName);
  control.reportValidity();
};

const checkNumber = (control, invalidType) => {
  const value = Number(control.value.replace(",", "."));
  if (value >= 0) {
    control.setCustomValidity("");
    return true;
  } else {
    control.setCustomValidity(invalidType);
    return false;
  }
};

export const checkAmount = (control) => {
  if (
    checkNumber(control, invalidTypes.needAmount) &&
    !Number.isInteger(Number(control.value))
  ) {
    control.setCustomValidity(invalidTypes.needAmount);
  }
  control.reportValidity();
};

export const checkPrice = (control) => {
  checkNumber(control, invalidTypes.needPrice);
  control.reportValidity();
};
