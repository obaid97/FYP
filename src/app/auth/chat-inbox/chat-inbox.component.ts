import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { PostsService } from 'src/app/posts/posts.service';
import { AuthService } from '../auth.service';



const SOCKET_ENDPOINT = 'localhost:5000';


@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})


export class ChatInboxComponent implements OnInit {
  socket;
  message: string;
  usertoken:string;

  constructor(public authService: AuthService, public postService:PostsService) {
    this.usertoken =this.authService.getToken();

  }

  ngOnInit()
  {
    this.setupSocketConnection();
    this.usertoken =this.authService.getToken();

  }

  /*setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
 }*/


 setupSocketConnection() {



  this.socket = io(SOCKET_ENDPOINT, {

    transports: ['polling'],
    transportOptions: {
      polling: {
         extraHeaders: {
            'authorization': this.usertoken
      }
     }
  }});



  this.socket.on('recieveChatMessage', (data) => {
  if (data) {

    console.log("DATA: ",data);



   const element = document.createElement('li');
   element.innerHTML = data.message;
   element.style.background = 'white';
   element.style.padding =  '15px 30px';
   element.style.margin = '10px';
   document.getElementById('message-list').appendChild(element);
   }
 });


}
/*
 SendMessage()
 {
  this.socket.emit('message', this.message);
  this.message = '';
 }*/


//  SendMessage() {

//   this.socket.emit('message', this.message);

//   var element = document.createElement("LI");

//   element.innerHTML = this.message;

//   element.style.background = 'white';

//   element.style.padding =  '15px 30px';

//   element.style.margin = '10px';

//   element.style.textAlign = 'right';

//   document.getElementById('message-list').appendChild(element);

//   this.message = '';

// }


SendMessage() {

  this.socket.emit('sendMessage', {message: this.message, to_id:this.postService.getCreatorId()});

  var element = document.createElement("LI");

  element.innerHTML = this.message;

  element.style.background = 'green';

  element.style.padding =  '15px 30px';

  element.style.margin = '10px';

  element.style.textAlign = 'right';

  document.getElementById('message-list').appendChild(element);

  this.message = '';

}

}
