import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./User";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

private  apiServerUrl: string = environment.apiBaseUrl;

constructor(private http: HttpClient){}

public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
}

public findUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/find/${userId}`);
}

public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/user/add`,user);
}

public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update`,user);
}

public deleteUser(userID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userID}`);
}


}