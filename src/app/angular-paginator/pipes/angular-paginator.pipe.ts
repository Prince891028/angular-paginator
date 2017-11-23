import { Pipe, PipeTransform } from '@angular/core';
import { AngularPaginatorService } from '../services/angular-paginator.service';
import { AngularPaginatorInstance } from '../others/angular-paginator.interface';

@Pipe({
  name: 'angularPaginator'
})

export class AngularPaginatorPipe implements PipeTransform {


  constructor(private _angularPaginatorService: AngularPaginatorService) { }

  transform(array: any, args?: any): any {

    const instance: AngularPaginatorInstance = this.createInstance(array, args);

    // create pagination information
    this._angularPaginatorService.registerInstance(instance);

    // set the slicing range
    const start = (instance.currentPage - 1) * instance.itemsPerPage;
    const end = instance.currentPage * instance.itemsPerPage;

    return array.slice(start, end);

  }

  createInstance(array, args): any {
    return {
      id: args['id'] ? args.id : this._angularPaginatorService.id,
      currentPage: args['currentPage'] ? args['currentPage'] : 1,
      itemsPerPage: args['itemsPerPage'] ? args['itemsPerPage'] : 10,
      totalItems: array['length']
    };

  }

}
