import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
//import { SSL_OP_NO_TLSv1_1 } from 'constants';
import { Subscription } from 'rxjs';
import { mimeType } from 'src/app/posts/post-create/mime-type.validator';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-smartcontract',
  templateUrl:'./smart-contract.component.html',
  styleUrls: ['./smart-contract.component.css']
})

export class SmartContractComponent
{
  isloading =false;
  private authStatusSub: Subscription;
  contractform : FormGroup;
  imagePreview : string;
  sellerid:string;
  buyerid:string;
  postid:string;
  buyerdetails: any;
  post:any;
  sellerdetails: any;
  constructor(public authService: AuthService,public route: ActivatedRoute, private _formBuilder: FormBuilder)
  {
    this.sellerid = localStorage.getItem('sellerid');
    this.buyerid =  localStorage.getItem('userId');
    this.postid = localStorage.getItem('sellerpostid');
    //console.log("seller id"+this.sellerid);
    //console.log("Buyer Id"+this.buyerid);
    //console.log("Post Id "+this.postid);
    localStorage.removeItem('sellerid');
    localStorage.removeItem('sellerpostid');


    this.authService.useraccountdetails(this.buyerid).subscribe(data =>{
      let dataincome= data;
      var resultArray = Object.keys(data).map(function(personNamedIndex){
        let person = data[personNamedIndex];
        // do something with person
        return person;
       });
      this.buyerdetails = resultArray;

      },err=>{
        console.log(err);

      });
      console.log("buyer: "+this.buyerdetails)
      this.authService.useraccountdetails(this.sellerid).subscribe(data =>{
        //let dataincome= data;

        var resultArray = Object.keys(data).map(function(personNamedIndex){
          let person = data[personNamedIndex];
          // do something with person
          return person;
         });
       // console.log("seller data: "+resultArray);
        this.sellerdetails = resultArray;
         console.log(resultArray);
        },err=>{
          console.log(err);

        });

        console.log("seller: "+this.sellerdetails)


  }

  ngOnInit()
  {


  this.authStatusSub =  this.authService.getAuthStatusListener().
  subscribe(authStatus => {
    this.isloading = false;
  });
  this.contractform = new FormGroup(
    {
      BuyerName: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      SellerName: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      BuyerCNIC: new FormControl(null, {validators:[Validators.required, Validators.minLength(13), Validators.maxLength(13)]}),
      SellerCNIC: new FormControl(null, {validators:[Validators.required, Validators.minLength(13), Validators.maxLength(13)]}),
      BuyerPK : new FormControl(null, {validators:[Validators.required]}),
      SellerPK : new FormControl(null),
      carmake: new FormControl(null, {validators:[Validators.required]}),
      carmodel : new FormControl(null,{validators:[ Validators.required]}),
      registrationnumber : new FormControl(null,{validators:[ Validators.required ]}),
      registrationcity : new FormControl(null,{validators:[ Validators.required ]}),
      price : new FormControl(null,{validators:[ Validators.required ]}),
      enginetype : new FormControl(null,{validators:[ Validators.required ]}),
      enginecapacity : new FormControl(null,{validators:[ Validators.required ]}),
      transmission : new FormControl(null,{validators:[ Validators.required ]}),
      assembly : new FormControl(null,{validators:[ Validators.required ]}),
      features : new FormControl(null,{validators:[ Validators.required ]}),
      exteriorcolor : new FormControl(null,{validators:[ Validators.required ]}),
      image : new FormControl(null,{validators: [Validators.required], asyncValidators :[mimeType]})
    });


  }


  oncreatecontract()
  {
    console.log("smart contract ts file create function");
    if(this.contractform.invalid)
    {
      //console.log("onsignup invalid failed");
      return;
    }
    else
    {
      this.isloading = true;

    //this.authService.createUser(form.value.fullName, form.value.email, form.value.password, form.value.phoneNumber, form.value.fullAddress, form.value.cnicNumber );
    this.authService.createContract
    (
      this.contractform.value.BuyerName,
      this.contractform.value.BuyerCNIC ,
      this.contractform.value.BuyerPK ,
      this.contractform.value.SellerName ,
      this.contractform.value.SellerCNIC ,
      this.contractform.value.SellerPK ,
      this.contractform.value.carmake ,
      this.contractform.value.carmodel ,
      this.contractform.value.registrationnumber ,
      this.contractform.value.registrationcity ,
      this.contractform.value.price ,
      this.contractform.value.enginetype ,
      this.contractform.value.enginecapacity ,
      this.contractform.value.transmission ,
      this.contractform.value.assembly ,
      this.contractform.value.features ,
      this.contractform.value.exteriorcolor ,
      this.contractform.value.image
      );
      this.isloading =false;
    }
    this.contractform.reset();
  }

  //on image picked
  onImagePicked(event : Event)
  {
    const file = (event.target as HTMLInputElement).files[0];
    this.contractform.patchValue({image: file});
    this.contractform.get('image').updateValueAndValidity();
    const reader = new FileReader();
    //console.log(file);
    //console.log(this.contractform);
    reader.onload = () =>
    {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    //reader.onload and reader.readAsDataURL works asynchronusly
  }
  //end of on image picked


  ngOnDestroy()
  {
    this.authStatusSub.unsubscribe();
  }



}
