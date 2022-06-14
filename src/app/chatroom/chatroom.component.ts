import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService, SingletonChatService } from 'src/services/chat.service';

import { Message } from '../models/message';

export interface SendMessage {
  message: FormControl<string>;
}

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  chatService: ChatService = SingletonChatService.getInstance();

  messageForm = new FormGroup<SendMessage>({
    message: new FormControl<string>('', {nonNullable: true})
  });

  messages: Message[];

  constructor() {
    this.messages = [];
    this.chatService.onMessage((message: any) => {
      console.log(message);

      this.messages.push({ userId: message.userId, username: message.username, message: message.text, ownMessage: message.username === localStorage.getItem('username') });
    });
  }

  ngOnInit(): void {
    this.chatService = SingletonChatService.getInstance();

    this.chatService?.joinRoom(localStorage.getItem('roomname'), localStorage.getItem('username'));


  }


  onSubmitMessage() {
    if(!this.messageForm.value.message) {
      alert('Please enter a message');
      return;
    }

    this.chatService?.sendMessage(this.messageForm.value.message ? this.messageForm.value.message : '');
    // this.messages.push({ userId: '', username: localStorage.getItem('username'), message: this.messageForm.value.message });
    this.messageForm.reset();
  }



}
