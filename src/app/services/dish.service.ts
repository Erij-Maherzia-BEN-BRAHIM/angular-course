import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgServiceService } from './process-httpmsg-service.service';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgServiceService) { }
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(this.processHTTPMsgService.handleError))

    //return of(DISHES).pipe(delay(2000));
  }

  getDish(id): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError))
    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError))
    //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }
  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error=> error))
 
   // return of(DISHES.map(dish => dish.id ));
  }
  
  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
