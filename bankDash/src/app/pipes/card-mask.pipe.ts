import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardMask'
})
export class CardMaskPipe implements PipeTransform {
  transform(value: number, visibleCount: number = 4, maskChar: string = '*'): string {
    // Перетворення,та присвоєння значення value типу number на string
    const newValue = value.toString();

    // Перевірка, якщо newValue буде false або буде довжина рядку менша за visibleCount * 2 === 8 то буде повернений просто рядок
    if (!newValue || newValue.length <= visibleCount * 2) {
      return newValue;
    }

    // Це початок
    const start = newValue.slice(0, visibleCount);

    // Це кінець
    const end = newValue.slice(-visibleCount);

    // тут ми перетворюємо наші центральні символи на *
    const masked = maskChar.repeat(newValue.length - visibleCount * 3);
    const masked2 = maskChar.repeat(newValue.length - visibleCount * 3);

    return `${start} ${masked} ${masked2} ${end}`;
  }
}
