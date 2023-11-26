import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-usercrud',
  templateUrl: './usercrud.component.html',
  styleUrls: ['./usercrud.component.scss']
})
export class usercrudComponent {

  userArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  username: string = "";
  email: string = "";
  password: string = "";
  currentuserID = "";

  constructor(private http: HttpClient) {
    this.getAlluser();
  }

  ngOnInit(): void {
  }

  getAlluser() {
    this.http.get("http://localhost:90/api/user/")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.userArray = resultData.data;
      });
  }



register() {
  const bodyData = {
    username: this.username,
    email: this.email,
    password: this.password,
  };

  this.http
    .post("http://localhost:90/api/user/add", bodyData)
    .subscribe(
      (resultData: any) => {
        console.log(resultData);
        alert("User registered successfully");
        this.getAlluser();
        this.resetForm();
      },
      (error) => {
        console.error("Error registering user:", error);
        alert("Failed to register user");
      }
    );
}
  resetForm() {
    this.username = "";
    this.email = "";
    this.password = "";
  }

  setUpdate(data: any) {
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;

    this.currentuserID = data.id;
  }

  UpdateRecords() {
    let bodyData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.http.put("http://localhost:90/api/user/update" + "/" + this.currentuserID, bodyData).subscribe(
      (resultData: any) => {
        console.log(resultData);
        alert("User updated successfully");
        this.getAlluser();
      },
      (error) => {
        console.error("Error updating user:", error);
        alert("Failed to update user");
      }
    );
  }

  save() {
    if (this.currentuserID == '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }

  setDelete(data: any) {
    this.http.delete("http://localhost:90/api/user/delete" + "/" + data.id).subscribe(
      (resultData: any) => {
        console.log(resultData);
        alert("User deleted successfully");
        this.getAlluser();
      },
      (error) => {
        console.error("Error deleting user:", error);
        alert("Failed to delete user");
      }
    );
  }
}