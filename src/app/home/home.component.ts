import { Component, OnInit, OnDestroy } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { AuthSignupData } from '../auth/auth-signup-data.model';


@Component(
{
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent
{

}
