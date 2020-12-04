import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
//import { SSL_OP_NO_TLSv1_1 } from 'constants';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/posts/posts.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-sellercontract',
  templateUrl:'./seller-contract.component.html',
  styleUrls: ['./seller-contract.component.css']
})

export class SellerContractComponent
{
  isloading =false;
  private authStatusSub: Subscription;
  contractform : FormGroup;
  contractId : string;
  contract:any;
  constructor(public authService: AuthService,public route: ActivatedRoute, public postsService: PostsService,)
  {
    this.contractId =  this.route.snapshot.paramMap.get('id');
    console.log("contractid:" +this.contractId);
    this.authService.getcontractdetails(this.contractId).subscribe(result =>
      {
        this.contract = result;
        let q= Object.entries(result);
        //console.log("this.contract: "+q);
      })
  }

  ngOnInit()
  {


  this.authStatusSub =  this.authService.getAuthStatusListener().
  subscribe(() => {
    this.isloading = false;
  });
  this.contractform = new FormGroup({SellerPK : new FormControl(null, {validators:[Validators.required]}),})
  }




  ngOnDestroy()
  {
    this.authStatusSub.unsubscribe();
  }



}
