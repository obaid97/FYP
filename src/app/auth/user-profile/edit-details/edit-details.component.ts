import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { mimeType } from '../../../posts/post-create/mime-type.validator';
import { AuthSignupData } from '../../auth-signup-data.model';
import { PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-edit-userprofile',
templateUrl:'./edit-details.component.html',
styleUrls: ['./edit-details.component.css']
})

export class EditUserProfileComponent implements OnInit
{
  userdetails: any;
  userId :string;
  editform : FormGroup;
  imagePreview : string;
  isloading =false;

  constructor(public authService: AuthService,private _formBuilder: FormBuilder)
    {

      this.authService.getuserDeatils().subscribe(data =>
      {
        let dataincome= data;
        this.userdetails = dataincome.user;
        this.userId = dataincome.user._id;

        },err=>{
          console.log(err);

      });
    }

  ngOnInit()
  {
    this.editform = new FormGroup(
      {

        fullName: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      email: new FormControl(null, {validators:[Validators.required, Validators.email]}),
      password: new FormControl(null, {validators:[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]}),
      phoneNumber: new FormControl(null, {validators:[Validators.required, Validators.minLength(11),Validators.maxLength(11)]}),
      fullAddress: new FormControl(null, {validators:[Validators.required]}),
      cnicNumber: new FormControl(null, {validators:[Validators.required, Validators.minLength(13), Validators.maxLength(13)]}),
      dob: new FormControl(null, {validators:[Validators.required]}),
      genderStatus: new FormControl(null, {validators:[Validators.required]}),
      //accountStatus: new FormControl(null,{validators:[Validators.required]}),
      image : new FormControl(null,{validators: [Validators.required], asyncValidators :[mimeType]})

      });
  }

  onImagePicked(event : Event)
  {
    const file = (event.target as HTMLInputElement).files[0];
    this.editform.patchValue({image: file});
    this.editform.get('image').updateValueAndValidity();
    const reader = new FileReader();
    //console.log(file);
    //console.log(this.editform);
    reader.onload = () =>
    {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    //reader.onload and reader.readAsDataURL works asynchronusly
  }

  oneditsave()
  {
    if(this.editform.invalid)
    {
      //console.log("onsignup invalid failed");
      return;
    }
    else
    {
      this.isloading = true;

    //this.authService.createUser(form.value.fullName, form.value.email, form.value.password, form.value.phoneNumber, form.value.fullAddress, form.value.cnicNumber );
    this.authService.edituserdetails(
      this.userdetails.cnicNumber,
      this.editform.value.email,
      this.editform.value.password,
      this.editform.value.phoneNumber,
      this.editform.value.fullAddress,
      //this.editform.value.accountStatus,
      this.editform.value.image);
      //console.log("onsignup form sucessful");

      this.isloading =false;
    //console.log(form.value.accountStatus);
    }
    this.editform.reset();

  }
}
