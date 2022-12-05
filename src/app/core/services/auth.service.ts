import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Subject } from 'rxjs';
import { UserModel } from '../modules/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = new BehaviorSubject(false)
  onLogin = new Subject<any>();
  onLogout = new Subject<any>();
  Error: any;
  private token: string = null as any;
  private userData: UserModel = null as any;

  constructor(private http: HttpClient) {
    this.getAuthToken() ? this.isLoggedIn.next(true) : this.isLoggedIn.next(false)
  }
  // login proccess
  async login({ username, password }: any): Promise<any> {
    const loginData = {
      'username': username,
      'password': password
    };
    const data: any = await this.http.post(environment['apiBaseUrl'] + 'auth/login', loginData)
      .toPromise()
      .catch(err => {
        this.Error = err
        return err.error.message
      });
    if (data) {
      this.setDataAfterLogin(data);
      this.isLoggedIn.next(true);
      return data;
    } else {
      return this.Error;
    }
  }
  // to get token
  getAuthToken(): any {
    return localStorage.getItem('token')
  }
  // logout user
  async logOut() {
    this.clearData()
    this.isLoggedIn.next(false)
    return true
  }
  // subfun to clear user data to log out
  clearData() {
    this.userData = null as any;
    this.token = null as any;
    localStorage.clear();
  }
  // subfun to set user data to login
  private setDataAfterLogin(data: any) {
    this.token = data['token'];
    this.userData = data['user'];
    localStorage.setItem('token', this.token);
    localStorage.setItem('usermeta', JSON.stringify(this.userData));
  }

}
