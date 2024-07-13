import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function priceRangeValidators(): ValidatorFn {
    return (control: AbstractControl<number>): ValidationErrors | null => {
        const price = control.value > 1 && control.value < 10000;
        return price ? null : {outOfRange: true}
     
    }
}