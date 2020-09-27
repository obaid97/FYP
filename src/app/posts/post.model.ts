export interface Post
{

  //id
  id: string;
  //car inormation
  city:string;
  make:string;
  model:string;
  registrationcity:string;
  mileage:string;
  exteriorcolor: string;
  description: string;

  //price
  price: string;

  //images
  imagePath: string;

  //additional information
  enginetype:string;
  enginecapacity:string;
  transmission:string;
  assembly:string;
  features:string;

  //contact information
  mobilenumber:string;

  /*
  title: string;
  engine: string;
  location: string;
  creator: string;*/
  /*
  id: string;
  title: string;
  model:string;
  engine: string;
  location: string;
  content: string;
  imagePath: string;
  creator: string;*/
}
