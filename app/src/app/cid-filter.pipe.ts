import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cidFilter'
})
export class CidFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
