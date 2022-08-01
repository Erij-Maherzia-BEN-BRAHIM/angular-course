import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes');

    //return of(DISHES).pipe(delay(2000));
  }

  getDish(id): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id);

    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));

    //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }
  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
 
   // return of(DISHES.map(dish => dish.id ));
  }
  addComment(id,comments){
    DISHES.map( dish =>{
      if (dish.id==id )
      {dish.comments=comments;
       }
     
    })
   
  }
}
