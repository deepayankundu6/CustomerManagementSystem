import { Pipe, PipeTransform } from '@angular/core';
import { ICustomers } from './icustomers';

@Pipe({
  name: 'cidFilter'
})
export class CidFilterPipe implements PipeTransform {

  transform(values: ICustomers[], filter: string): ICustomers[] {
    if (values && filter && values.length > 0) {

      values = values.filter((el: ICustomers) => {
        if (el.CustomerID.toString().includes(filter))
          return values;
      }
      )
      return values;
    }
    else {
      return values;
    }
  }
}
