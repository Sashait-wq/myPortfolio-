import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardMask'
})
export class CardMaskPipe implements PipeTransform {
  transform(
    value: string,
    visibleCount: number = 4,
    mode: 'start' | 'end' | 'both' = 'both',
    maskChar: string = '*'
  ): string {
    if (!value) return '';

    const clean = value.replace(/\s+/g, '');
    const totalLength = clean.length;
    const maskedGroup = `${maskChar}${maskChar}${maskChar}${maskChar}`;

    if (mode === 'start') {
      const start = clean.slice(0, visibleCount);
      return `${start} ${maskedGroup}`;
    }

    if (mode === 'end') {
      const end = clean.slice(-visibleCount);
      return `${maskedGroup} ${end}`;
    }

    // mode === 'both'
    const start = clean.slice(0, visibleCount);
    const end = clean.slice(-visibleCount);
    return `${start} ${maskedGroup} ${maskedGroup} ${end}`;
  }
}
