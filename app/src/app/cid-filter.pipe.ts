import { Pipe, PipeTransform } from '@angular/core';
import { ICustomers } from './icustomers';

@Pipe({
  name: 'cidFilter'
})
export class CidFilterPipe implements PipeTransform {

  transform(values: ICustomers[], filter: Number): ICustomers[] {
    if (values && filter && values.length > 0 && filter > 0) {

      values = values.filter((el: ICustomers) => {
        if (el.CustomerID.toString() == filter.toString())
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
