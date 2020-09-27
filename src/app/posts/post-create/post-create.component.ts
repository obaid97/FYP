import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
//import { templateJitUrl } from '@angular/compiler';
import { Post } from '../post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';
import { Subscription, of } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


interface genericarray {
  value: string;
  viewValue: string;
}

interface features
{
  group: string;
  value: string;
  viewValue: string;
}
interface features_hold
{
  value: string;
}
@Component(
{
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit, OnDestroy
{
  enteredContent = '';
  enteredTitle = '';
  private mode = 'create';
  private postId: string;
  post: Post;
  isloading = false;
  form: FormGroup;
  imagePreview: string;
  private authStatusSub: Subscription;
  //@Output() postCreated= new EventEmitter<Post>();
  newPost = '';

  enginetype: genericarray[] = [{value: 'CNG', viewValue: 'CNG'}, {value: 'Diesel', viewValue: 'Diesel'},
  {value: 'Hybrid', viewValue: 'Hybrid'}, {value: 'Petrol', viewValue: 'Petrol'}];
  transmission: genericarray[] = [{value: 'Manual', viewValue: 'Manual'}, {value: 'Automatic', viewValue: 'Automatic'}];
  cities: genericarray[] = [{value: 'Islamabad', viewValue: 'Islamabad'}, {value: 'Rawalpindi', viewValue: 'Rawalpindi'},
  {value: 'Lahore', viewValue: 'Lahore'}, {value: 'Karachi', viewValue: 'Karachi'}, {value: 'Gujranwala', viewValue: 'Gujranwala'},
  {value: 'Sakrdu', viewValue: 'Sakrdu'}, {value: 'Hunza', viewValue: 'Hunza'},
  {value: 'Pindigheb', viewValue: 'Pindigheb'}, {value: 'Faislabad', viewValue: 'Faislabad'}];
  assembly: genericarray[] = [{value: 'local', viewValue: 'Local'}, {value: 'imported', viewValue: 'Imported'}];
  make: genericarray[] = [{value: 'Toyota', viewValue: 'Toyota'}, {value: 'Suzuki', viewValue: 'Suzuki'},
  {value: 'Honda', viewValue: 'Honda'}, {value: 'BMW', viewValue: 'BMW'}, {value: 'Audi', viewValue: 'Audi'}];
  exteriorcolor: genericarray[] = [{value: 'Red', viewValue: 'Red'}, {value: 'White', viewValue: 'White'},
  {value: 'Black', viewValue: 'Black'}, {value: 'Silver', viewValue: 'Silver'}, {value: 'Blue', viewValue: 'Blue'},
  {value: 'Green', viewValue: 'Green'},{value: 'Yellow', viewValue: 'Yellow'}];

  features: features[] = [{group: 'features', value: 'ABS', viewValue: 'ABS'},
  {group: 'features', value: 'Air Bags', viewValue: 'Air Bags'},
  {group: 'features', value: 'Air Conditioning', viewValue: 'Air Conditioning'},
  {group: 'features', value: 'Alloy Rims', viewValue: 'Alloy Rims'},
  {group: 'features', value: 'AM/FM Radio', viewValue: 'AM/FM Radio'}, {group: 'features', value: 'CD Player', viewValue: 'CD Player'},
  {group: 'features', value: 'Cassette Player', viewValue: 'Cassette Player'},
  {group: 'features', value: 'Cool Box', viewValue: 'Cool Box'}, {group: 'features', value: 'Cruise Control', viewValue: 'Cruise Control'},
  {group: 'features', value: 'Climate Control', viewValue: 'Climate Control'}, {group: 'features', value: 'DVD Player', viewValue: 'DVD Player'},
  {group: 'features', value: 'Front Speakers', viewValue: 'Front Speakers'},
  {group: 'features', value: 'Front Camera', viewValue: 'Front Camera'}, {group: 'features', value: 'Heated Seats', viewValue: 'Heated Seats'}, {group: 'features', value: 'Immobilizer Key', viewValue: 'Immobilizer Key'},
  {group: 'features', value: 'Keyless Entry', viewValue: 'Keyless Entry'}, {group: 'features', value: 'Navigation System', viewValue: 'Navigation System'}, {group: 'features', value: 'Power Locks', viewValue: 'Power Locks'},
  {group: 'features', value: 'Power Mirrors', viewValue: 'Power Mirrors'}, {group: 'features', value: 'Power Steering', viewValue: 'Power Steering'}, {group: 'features', value: 'Power Windows', viewValue: 'Power Windows'},
  {group: 'features', value: 'Rear Seat Entertainment', viewValue: 'Rear Seat Entertainment'},
  {group: 'features', value: 'Rear AC Vents', viewValue: 'Rear AC Vents'},
  {group: 'features', value: 'Rear speakers', viewValue: 'Rear speakers'},
  {group: 'features', value: 'Rear Camera', viewValue: 'Rear Camera'}, {group: 'features', value: 'Sun Roof', viewValue: 'Sun Roof'},
  {group: 'features', value: 'Steering Switches', viewValue: 'Steering Switches'},
  {group: 'features', value: 'USB and Auxillary Cable', viewValue: 'USB and Auxillary Cable'}];

  featureshold = [];

  constructor(public postsService: PostsService, public route: ActivatedRoute, private authService: AuthService  ){}




  //this ngonit method contains paramap observable so that only url changes but loaded single component and works differently on both links/urls

 // ng oninit starts
  ngOnInit()
  {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isloading = false;
      }
    );
    this.form = new FormGroup(
      {
      //basic car info
         city : new FormControl(null,{validators:[ Validators.required ]}),
         make : new FormControl(null,{validators:[ Validators.required ]}),
         model : new FormControl(null,{validators:[ Validators.required ]}),
         registrationcity : new FormControl(null,{validators:[ Validators.required ]}),
         mileage : new FormControl(null,{validators:[ Validators.required ]}),
         //engine : new FormControl(null,{validators:[ Validators.required ]}),
         exteriorcolor : new FormControl(null,{validators:[ Validators.required ]}),
         description : new FormControl(null,{validators:[ Validators.required ]}),

        //price info
        price : new FormControl(null,{validators:[ Validators.required ]}),

        //images
        image : new FormControl(null,  {validators: [Validators.required], asyncValidators : [mimeType]  }),


        //additional information
        enginetype : new FormControl(null,{validators:[ Validators.required ]}),
        enginecapacity : new FormControl(null,{validators:[ Validators.required ]}),
        transmission : new FormControl(null,{validators:[ Validators.required ]}),
        assembly : new FormControl(null,{validators:[ Validators.required ]}),
        features : new FormControl(null,{validators:[ Validators.required ]}),

        //contact information
        mobilenumber: new FormControl(null, {validators:[Validators.required, Validators.minLength(11),Validators.maxLength(11)]})

      }
    );
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if(paramMap.has('postId'))
      {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isloading = true;
        this.postsService.getPost(this.postId).subscribe(postData =>
          {
              //Progress spinner here
          this.isloading = false;
          this.post =
          {
             id: postData._id,
             city:postData.city,
             make: postData.make,
             model:postData.model,
             registrationcity: postData.registrationcity,
             exteriorcolor: postData.exteriorcolor,
             mileage: postData.mileage,
             description: postData.description,
             price: postData.price.toString(),
             imagePath: postData.imagePath,
             enginetype: postData.enginetype,
             enginecapacity: postData.enginecapacity,
             transmission:postData.transmission,
             assembly: postData.assembly,
             features: postData.features,
             mobilenumber: postData.mobilenumber.toString(),
            // creator: postData.creator
          };
          this.form.setValue(
            {
              city:this.post.city,
              make: this.post.make,
              model:this.post.model,
              registrationcity: this.post.registrationcity,
              exteriorcolor: this.post.exteriorcolor,
              mileage: this.post.mileage,
              description: this.post.description,
              price: this.post.price,
              image: this.post.imagePath,
              enginetype: this.post.enginetype,
              enginecapacity: this.post.enginecapacity,
              transmission: this.post.transmission,
              assembly: this.post.assembly,
              features: this.post.features,
              mobilenumber: this.post.mobilenumber,

            });
        });
      }
      else{
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
 // end of ng oninit

//on image picked
  onImagePicked(event: Event)
  {
    const file = (event.target as HTMLInputElement).files[0];
    // const file = (event.target as HTMLInputElement).files[0];

    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () =>
    {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    // if (file.length > 0) {
    //           for (let i = 0; i < file.length; i++) {
    //             const afile = file[i];
    //             console.log(afile);
    //             // console.log(file.length);
    //         }
    //     }
    // reader.onload and reader.readAsDataURL works asynchronusly
  }
  // end of on image picked

  // onchecked
  checked(a: string)
  {
    this.featureshold.push(a);
  }

// on Save post
  onSavePost()
  {
    if (this.form.invalid)
    {
      return;
    }
    this.isloading = true;
    if (this.mode === 'create')
    {
      this.postsService.addPost(
        //basic info
        this.form.value.city,
        this.form.value.make,
        this.form.value.model,
        this.form.value.registrationcity,
        this.form.value.mileage,
        this.form.value.exteriorcolor,
        this.form.value.description,

        //price
        this.form.value.price,
        //images
        this.form.value.image ,
        //additional information
        this.form.value.enginetype,
        this.form.value.enginecapacity,
        this.form.value.transmission,
        this.form.value.assembly,
        this.form.value.features,
        //this.featureshold[],
        //contact information
        this.form.value.mobilenumber
        );
    }
    else {
      this.postsService.updatePost
        (
        this.postId,
        this.form.value.city ,
        this.form.value.make ,
        this.form.value.model ,
        this.form.value.registrationcity ,
        this.form.value.mileage ,
        this.form.value.exteriorcolor ,
        this.form.value.description ,
        this.form.value.price ,
        this.form.value.image,
        this.form.value.enginetype ,
        this.form.value.enginecapacity ,
        this.form.value.transmission ,
        this.form.value.assembly ,
        this.form.value.features ,
        this.form.value.mobilenumber
        );
    }

    this.form.reset();

  }
//End of On Save Post

//ngOnDestroy
 ngOnDestroy()
 {
   this.authStatusSub.unsubscribe();
 }

 //end of class
}
