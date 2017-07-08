import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  public transform(value, searchTerm: string) {

    if (value == null || searchTerm == null) {
      return value;
    }

    searchTerm = searchTerm.toUpperCase();

    const startIndex = value.toUpperCase().indexOf(searchTerm);
    if (startIndex < 0) { return value; } // search term does not exist, return now.

    const left = value.substring(0, startIndex);
    const right = value.substring(startIndex + searchTerm.length);
    const middle = value.substring(startIndex, startIndex + searchTerm.length);

    return left + '<span class="highlight">' + middle + '</span>' + right;
  }
}
