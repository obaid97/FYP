import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import * as io from 'socket.io-client';
import { PostsService } from 'src/app/posts/posts.service';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-chat-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})


export class InboxComponent
{
  constructor(private authService: AuthService,public router: Router)
  {

  }
}
