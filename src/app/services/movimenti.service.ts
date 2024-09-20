import { Injectable } from '@angular/core';
import { Movimento } from '../entities/movimento.entity';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { isNil, omitBy } from 'lodash';

export interface MovimentiFilters
{
  numero:number;
  categoria?:string;
  firstData?:string;
  secondData?:string;
}

@Injectable({
  providedIn: 'root'
})
export class MovimentiService
{
  protected _movimenti$ = new BehaviorSubject<Movimento[]>([]);
  movimenti$ = this._movimenti$.asObservable();
  private hasFiltro=false;

  constructor(protected http:HttpClient, protected authSrv:AuthService) { }

  fetch(contoId:string)
  {   
    this.http.get<Movimento[]>(`/api/movimenti/${contoId}?numero=5`)
      .subscribe(movimenti=>{
        this._movimenti$.next(movimenti);
      });
  }

  list(filters:MovimentiFilters)
  {
    let q=omitBy(filters,isNil);
    // let result:Observable<Todo[]>;
    // if(filters.showCompleted!= undefined)
    // {
    //   const todos=this.http.get<Todo[]>("/api/todos");
    //   const showCompleted=this.http.get<Todo[]>("/api/todos",{params: q});
    //   result=forkJoin([todos,showCompleted!])
    //     .pipe(
    //       map(([todosResult, showCompletedResult]) => {
    //         // Unisci i due array
    //         let combined = [...todosResult, ...showCompletedResult];
        
    //         // Rimuovi i duplicati
    //         const unique:Todo[] = Array.from(new Set(combined.map(todo => todo.id)))
    //           .map(id => combined.find(todo => todo.id === id)) as Todo[];
        
    //         return unique;
    //       })
    //   );
    //   this.hasFiltro=true;
    // }
    // else
    // {
    //   this.hasFiltro=false;
    //   result=this.http.get<Todo[]>("/api/todos");
    // }
    // result.subscribe(todos=>{
    //   this._todos$.next(todos);
    // });
    // return result;
  }

  updateMov()
  {
    // if(this.hasFiltro==true){
    //   this.todos$=this.list({showCompleted:this.hasFiltro});
    // }
    // else{
    //   this.fetch();
    // }
  }

  add()
  {
    this.http.post<Todo>("/api/todos", newTodo)
      .subscribe(addTodo => {
        const tmp = structuredClone(this._todos$.value);
        const index = this._todos$.value.findIndex(todo => todo.id === addTodo.id);
        if(index!=-1){
          tmp.push(addTodo);
        }
        else{
          tmp[index] = addTodo;
        }
        this._todos$.next(tmp);
        this.updateMov();
      },error => {
        console.error(error);
      });
  }
}