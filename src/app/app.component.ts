import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

const MINLENGTH = 8;

enum PasswordStrength {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public passwordStrength = PasswordStrength;
  public text = new FormControl(
    '',
    Validators.compose([
      Validators.minLength(MINLENGTH),
      this.passwordStrengthValidator(),
    ])
  );

  private passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;

      if (!value || value.length < MINLENGTH) {
        return null;
      }

      const hasLetters = /[a-zA-Z]/.test(value);
      const hasNumbers = /\d/.test(value);
      const hasSpecialChars = /\W/.test(value);

      let strength: string = PasswordStrength.EASY;

      if (
        (hasLetters || hasNumbers) &&
        (hasSpecialChars || hasLetters) &&
        (hasNumbers || hasSpecialChars)
      ) {
        strength = PasswordStrength.MEDIUM;
      }

      if (hasLetters && hasNumbers && hasSpecialChars) {
        strength = PasswordStrength.HARD;
      }

      return strength ? { strength } : null;
    };
  }
}
