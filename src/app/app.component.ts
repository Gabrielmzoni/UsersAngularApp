import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { UserService } from './user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'UsersAngularApp';
  public users : User[] = [];
  currentOperation: string = "Add"
  

  constructor(private userservice: UserService){}

  ngOnInit(): void {
    
    this.getUsers();
  }

  public getUsers(): void {
    this.userservice.getUsers().subscribe(
      (response: User[]) => {
      this.users = response;
      console.log(this.users);
      },
      (error : HttpErrorResponse) => {
      alert(error.message);
      }
    );
  }

  public addOrUpdateUser(addForm: NgForm): void {
    console.log(addForm.value);
    


    if (addForm.value.id == "" || addForm.value.id == null ) {  

    this.userservice.addUser(addForm.value).subscribe(
      (response: User) => {
        console.log("adduser")
        console.log(response);
        this.getUsers();
        addForm.reset();
     
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
    } else {

      this.userservice.updateUser(addForm.value).subscribe(
        (response: User) => {
          console.log("updateuser")
          console.log(response);
          this.getUsers();
          addForm.reset();
          this.currentOperation = "Add";
       
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      );

    }
  }

  public setUserToUpdate(addForm: NgForm,usertmp: User){

    this.currentOperation = "Update";
    

    this.userservice.findUser(usertmp.id).subscribe(
      (response: User) => {
        addForm.setValue(usertmp);
        console.log(response);
        //addForm.setValue(response)
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        
      }
    );
  }

  public deleteUser(usertmp: User){

   this.userservice.deleteUser(usertmp.id).subscribe(
    (response: void) => {
      console.log(response);
      this.getUsers();
      
      
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      
    }



   )
  }
    


  

}
