import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Watchlist} from '../watchlist.model';
import {User} from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  public globalID: number;
  public reg = true;
  apiUrl = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // tslint:disable-next-line:variable-name
  constructor(public _http: HttpClient) {
  }

  // Movie REST Api
  getWatchList(): Observable<Watchlist> {
    return this._http.get<Watchlist>(this.apiUrl + '/watchlist');
  }

  deleteMovie(id) {
    return this._http.delete<Watchlist>(this.apiUrl + '/watchlist/' + id);
  }

  addToList(movie) {
    return this._http.post<Watchlist>(this.apiUrl + '/watchlist', JSON.stringify(movie), this.httpOptions);
  }

  getMovieByID(id): Observable<Watchlist> {
    return this._http.get<Watchlist>(this.apiUrl + '/watchlist/' + id);
  }

  // Movie Api ends
  // Register and Login Api
  getUsers(): Observable<User> {
    return this._http.get<User>(this.apiUrl + '/users');
  }

  deleteUser(id) {
    return this._http.delete<User>(this.apiUrl + '/users/' + id);
  }

  registerUser(user) {
    return this._http.post<User>(this.apiUrl + '/users', JSON.stringify(user), this.httpOptions);
  }

  updateUser(id, user): Observable<User> {
    return this._http.put<User>(this.apiUrl + '/users/' + id,
      JSON.stringify(user), this.httpOptions);
  }

  getUserByID(id): Observable<User> {
    return this._http.get<User>(this.apiUrl + '/users/' + id);
  }

  // user logged in
  get isUserLoggedIn(): boolean {
    return this.reg;
  }

  set isUserLoggedIn(val) {
    this.reg = val;
  }

  // save registered user id
  get globalSavedId(): number {
    return this.globalID;
  }

  set globalSavedId(val: number) {
    this.globalID = val;
  }

}
