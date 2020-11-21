import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../posts/post.model';
import { AuthSignupData } from '../auth-signup-data.model';
import { PostsService } from '../../posts/posts.service';
import {Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';
import { Chart } from '../../../../node_modules/chart.js';

@Component(
{
  selector: 'app-admin',
  templateUrl:'./admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit, OnDestroy
{

users: AuthSignupData[] = [];
unverifiedUsers: AuthSignupData[] = [];
verifiedUsers: AuthSignupData[] = [];
isloading =false;
totalUnverifiedUsers = 0;
unverifiedUsersPerPage = 5;
currentPage = 1;
pageSizeOptions = [1,2,5,10];
userId :string;
private postsSub: Subscription;
private authServiceSub : Subscription;
private alluser: Subscription;
private allunverifiedUsers: Subscription;
private allverifiedUser: Subscription;

userIsAuthenticated =false;
accountStatus:string;
verified:boolean ;
allusercount:number;
allunverifiedUserCount:number;
allverifiedUserCount:number;
allpostscount:number;
allposts:Post[]=[];
totalPosts = 0;

Linechart =[];
piedata=[8,5,3];
pieoptions=["All Users","UnVerified","verified"];
/*pie chart data */


constructor(public authService: AuthService,public postsService: PostsService)
{}


ngOnInit()
  {
    this.isloading=true;
    this.users = this.authService.getallUsers();
    this.allusercount = this.users.length;
    this.unverifiedUsers = this.authService.getUnverifiedUsers();
    this.allunverifiedUserCount = this.unverifiedUsers.length;
    this.verifiedUsers = this.authService.getVerifiedUsers();
    this.allverifiedUserCount=this.verifiedUsers.length;
    this.postsService.getPosts(this.unverifiedUsersPerPage,this.currentPage);
    this.postsSub = this.postsService.getPostUpdate()
    .subscribe((postData: { posts: Post[], postCount: number }) => {
      this.isloading = false;
      this.totalPosts = postData.postCount;
      this.allposts = postData.posts;
    });
    this.isloading=false;

    /*line chart check*/

    this.Linechart = new Chart('linechart',
    {
      type: 'line',
      data:
      {
        labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets:
        [{
          label:'Number of Ads in Months',
          data: [8,7,6,22,7,3,5,11,9,0,17],
          fill:false,
          lineTesion:0.3,
          borderColor:"red",
          borderWidth:1
        }]
      },
      options:
      {
        title:
        {text:"Line Chart",
        display:false
      },
      scales:
      {
        yAxis:
        [{
          ticks:
          {
            beginAtZero:true
          }
        }]
      }
    }});

    /*line chart check*/

    /*chart check
    stat*/


    var myChart = new Chart("myChart", {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    /*chart chk end */

    /*pie chart*/
    /*var myPieChart = new Chart("piechart", {
      type: 'pie',
      data: this.piedata,
      options: this.pieoptions
  });*/
  var piechart = new Chart("pieChart", {
    type: 'pie',
    data: {
        labels: ['All Users', 'Unverified Users', 'Verified Users'],
        datasets: [{
            label: '# of Users',
            data: this.piedata,
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  });
}


onChangedPage(pageData: PageEvent)
{
  this.currentPage = pageData.pageIndex +1;
  this.unverifiedUsersPerPage = pageData.pageSize;
  this.authService.getUnverifiedUsers();
}

ngOnDestroy()
{}

onDelete(cnicNumber: number)
{
  this.isloading = true;
  this.authService.deleteUser(cnicNumber);
  this.isloading=false;
}

onApprove(cnicNumber:number)
{
  this.isloading=true;
  this.authService.approveUser(cnicNumber);
  this.isloading=false;
}
onLogout()
    {
      this.authService.logout();
    }
}
