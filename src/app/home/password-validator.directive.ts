import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[passwordValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true}]
})
export class PasswordValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors {
      const password = control.get("password")?.value;
      const password_confirm = control.get("password_confirm")?.value;
      return this.passwordValidator(password, password_confirm)(control);
  }

  registerOnValidatorChange?(fn: () => void): void {}

  passwordValidator(password: string, password_confirm: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const matching_error = password !== password_confirm;
      return matching_error ? { matchingError: true } : null;
    };
  }

}
