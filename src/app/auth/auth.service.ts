import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { AuthLoginData } from './auth-login-data.model';
import { AuthSignupData } from './auth-signup-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import {PostsService} from '../posts/posts.service'
const BACKEND_URL = environment.apiUrl +"/user/";

export interface message {
    cnicNumber: number;
    Creatorid: any;
    message: string;
  }


@Injectable({providedIn: "root"})

export class AuthService
{
  private unverifiedUsers: AuthSignupData[] = [];
  private verifiedUsers: AuthSignupData[] = [];
  private allUsers: AuthSignupData[] = [];
  private userdet: AuthSignupData[]=[];
  private userdata:AuthSignupData;
  private userstatus:AuthSignupData;
  private unverifiedUsersUpdated= new Subject<{unverifiedUsers: AuthSignupData[],unverifiedUsersCount:number}>();
  private verifiedUsersUpdated= new Subject<{verifiedUsers: AuthSignupData[],verifiedUsersCount:number}>();
  private allUpdated= new Subject<{allUsers: AuthSignupData[],allUsersCount:number}>();
  private token :string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer :any;
  private userId: string;
  private temp =  new Subject<string>();
  private currentUser:number;
  private currentUseraccountStatus:string;
  private currentUserauthorizeStatus:boolean;
  private accountstatus=  new Subject<string>();
  //private accountstatus: string;
  private userDeatils: AuthSignupData;
  private portid1:number;
  private portid2:number;
  private port:number;
  private test : string[] =[];
  private newpassword:string;
  private usersUpdated = new Subject<{ users: AuthSignupData[], userCount: number }>();
  private message:string;
  private curretnuserdetails:any;

  constructor(private http : HttpClient, private router: Router, private postService:PostsService){}




  createUser(fullName:string, email:string, password:string, phoneNumber:string, fullAddress:string, cnicNumber:string,dob:string,genderStatus:string ,/*accountStatus:string,*/ image:File)
  {

    const authData = new FormData();
    authData.append("fullName",fullName);
    authData.append("email",email);
    authData.append("password",password);
    authData.append("phoneNumber",phoneNumber);
    authData.append("fullAddress",fullAddress);
    authData.append("cnicNumber",cnicNumber);
    authData.append("dob",dob);
    authData.append("genderStatus",genderStatus);
    authData.append("image",image);

   // const avialblecheck = this.http.get(BACKEND_URL+"userdetails",cnicNumber)

    this.http.post<{message :string, user:AuthSignupData }>
      (BACKEND_URL+"signup",authData)
      .subscribe((responseData)=>{

       this.router.navigate(["/"]);
  },error => {
    this.authStatusListener.next(false);
  }
  );
  this.router.navigate(["/"]);

  }




login(cnicNumber: number, password: string)
  {
    const authData: AuthLoginData = {cnicNumber: cnicNumber, password:password};
    this.http.post<{token: string, expiresIn:number ,userId:string, accountStatus:string, authorizedStatus:Boolean}>(BACKEND_URL+"login",authData)
      .subscribe(response =>
        {
          const token = response.token;
          this.token =token;
          if(token)
          {

            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            //this.accountstatus = response.accountStatus;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration *1000);
            this.saveAuthData(token,expirationDate,this.userId);
            if(response.accountStatus =='user')
            {
              this.router.navigate(["/"]);
            }
            else if(response.accountStatus =='admin')
            {
              this.router.navigate(["/auth/admin"]);
              //console.log(response.accountStatus);
            }

          }
        }, error => {
              this.authStatusListener.next(false);
        });
        this.currentUser = cnicNumber;
        this.getcurrentuserstatus();
        //this.forgotpassword(3710558105933,"0ce8d34a082854ea18b83eafac46cc38b532d59aed0d18c85d50ec4e8d517273");
        //this.currentUserauthorizeStatus =
        //this.getcurrentuserauthstatus();
       // this.createport();
       // this.getuserDeatils();
  }

  autoAuthUser()
  {
    const authInformation = this.getAuthData();
    if(!authInformation)
    {
      return;
    }
    const now = new Date();
    const expiresIn =authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0)
    {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId =authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }


  logout()
  {
    this.token =null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId =null;
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration:number)
  {
    this.tokenTimer= setTimeout(() => {
      this.logout();
    },duration * 1000);
  }

  private saveAuthData(token:string, expirationDate: Date, userId:string)
  {
    localStorage.setItem('token',token);
    localStorage.setItem("expiration",expirationDate.toISOString());
    localStorage.setItem("userId",userId);
  }

  private clearAuthData()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData()
  {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if(!token || !expirationDate)
    {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }

  getallUsers()
  {

    //const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{ users:any }>(BACKEND_URL+"/allusers")
     .subscribe(response =>
      {
        var i;
        for (i = 0; i < response.users.length; i++)
        {
          this.allUsers[i] = response.users[i];
        }

      })

      return this.allUsers;
      //return this.unverifiedUsers;
  }

  getUnverifiedUsers()
  {

    //const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{ users:any }>(BACKEND_URL+"/unverifiedusers")
     .subscribe(response =>
      {
        var i;
        for (i = 0; i < response.users.length; i++)
        {
          this.unverifiedUsers[i] = response.users[i];
        }

      })

      return this.unverifiedUsers;
      //return this.unverifiedUsers;
  }

  //verified users get
  getVerifiedUsers()
  {
    this.http.get<{ users:any }>(BACKEND_URL+"/verifiedusers")
    .subscribe(response =>
      {
        var i;
        for (i = 0; i < response.users.length; i++)
        {
          this.verifiedUsers[i] = response.users[i];
        }

      })

      return this.verifiedUsers;
  }

getuserDeatils()
{

console.log(BACKEND_URL+"userdetails");

  return  this.http.get<{ user:any }>(BACKEND_URL+"userdetails")
}

getcurrentuserdetails()
{
  return this.curretnuserdetails;
}


  verifieduserdata(verifieduser:any)
  {
    this.unverifiedUsers = verifieduser;
  }

  getverifiedUsersupdate()
  {
    return  this.verifiedUsersUpdated.asObservable();
  }

  unverifieduserdata(unverifieduser:any)
  {
    this.unverifiedUsers = unverifieduser;
  }

  getUnverifiedUsersupdate()
  {
    return  this.unverifiedUsersUpdated.asObservable();
  }

  getUsersDeatils()
  {
    return  this.userDeatils;
  }


  userProfileDetails()
  {
    const user = this.getuserDeatils();

  }

  getIsAuth()
  {
    return this.isAuthenticated;
  }

  getUserId()
  {
    return this.userId;
  }

  getUsercnic()
  {
    return this.currentUser;
  }


  getToken()
  {
    return this.token;
  }

  getAuthStatusListener()
  {
    return this.authStatusListener.asObservable();
  }


  approveUser(cnicNumber:number)
  {
    this.http.post(BACKEND_URL +"approve",{cnicNumber}).subscribe(res =>
      {
        console.log(res);
        this.router.navigate(["auth/unverified"]);
      });
  }

  disableUser(cnicNumber:number)
  {
    this.http.post(BACKEND_URL +"disable",{cnicNumber}).subscribe(res =>
      {
        console.log(res);
        this.router.navigate(["auth/verified"]);
      });
  }


  deleteUser(cnicNumber :number)
  {
   // console.log("auth service reached");
    this.http.post(BACKEND_URL +"deleteuser",{cnicNumber}).subscribe(res =>
      {
        console.log(res);
        this.router.navigate(["auth/admin"]);
      });
  }

  getcurrentuserstatus()
  {
    console.log(   this.http.post(BACKEND_URL,"accstatus"+this.currentUser));

  }

  getcurrentuserauthstatus()
  {
    this.http.get<{user:any}>(BACKEND_URL+"/userdetails"+this.currentUser).subscribe(use =>
      {
        console.log(use + "curretn status" );
      });
  }

  getcurrentuserauthorizestatus()
  {
   return this.currentUserauthorizeStatus;
  }

  //not yet fixed /completed
  /*
  -
  -
  `
  `
  `
  `
  `
  `
  `
  `
  `
  ``
  `
  `
  `
  `
  `
  `
  */


     //resetpassword(cnicNumber:string,privatekey:string)
forgotpassword(cnicNumber: number, privatekey: string)
{
 const authData = {cnicNumber, privatekey};
  //return this.http.put(BACKEND_URL +"forgotpassword",authData);*/
    /*.subscribe(response =>
      {
        console.log(response);
      })*/
      this.http.post<{password:string}>(BACKEND_URL+"login",authData)
      .subscribe(response =>
        {
          //console.log(response);
          //console.log(response.password);
          this.router.navigate(["/auth/login"]);
        })
        this.router.navigate(["/auth/login"]);
}

resetpassword(cnicNumber: number, password: string)
{
  const authData = {cnicNumber, password};
  this.http.put(BACKEND_URL +"reset",authData)
    .subscribe(response =>
      {
        console.log(response);
      })
}




  createAdmin(fullName:string, email:string, password:string, phoneNumber:string, fullAddress:string, cnicNumber:string,dob:string,genderStatus:string,image:File)
  {

    const authData = new FormData();
    authData.append("fullName",fullName);
    authData.append("email",email);
    authData.append("password",password);
    authData.append("phoneNumber",phoneNumber);
    authData.append("fullAddress",fullAddress);
    authData.append("cnicNumber",cnicNumber);
    authData.append("dob",dob);
    authData.append("image",image);
    authData.append("genderStatus",genderStatus);
   // const avialblecheck = this.http.get(BACKEND_URL+"userdetails",cnicNumber)
    this.http.post<{message :string, user:AuthSignupData }>
      (BACKEND_URL+"createadmin",authData)
      .subscribe((responseData)=>{

       this.router.navigate(["/auth/admin"]);
  },error => {
    this.authStatusListener.next(false);
    alert(error.message);
  }
  );
  this.router.navigate(["/auth/admin"]);

  }

  createport(creatorid:any)
  {


  }

  startchat(creatorid:any)
  {
/*
    this.http.post(BACKEND_URL,"chat"+this.currentUser,creatorid).subscribe(response =>
      {
        this.router.navigate(["/chat"]);
      });*/
  }


  sendmail(email:string, subject:string, message:string)
  {
    const mailData =new FormData();
    mailData.append("email",email);
    mailData.append("subject",subject);
    mailData.append("message",message);
    console.log(mailData);
    console.log(email);
    console.log(subject);
    console.log(message);
    let mail =
    {
      email: email,
      subject: subject,
      message: message
    };
    this.http.post(BACKEND_URL +"mail",mail).subscribe(data =>
      {
        let res:any =data;
        //console.log(res);
        this.router.navigate(["/contactus"]);
      });


  //this.router.navigate(["/contactus"]);
  }

}
//
