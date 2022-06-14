import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteConfigLoadStart, Router, RouterLink } from '@angular/router';
import { ChatService, SingletonChatService } from '../../services/chat.service';


export interface DetailsForm {
  roomname: FormControl<string>;
  username: FormControl<string>;
}

@Component({

  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [ChatService],

})
export class HomepageComponent implements OnInit {
  chatService?: ChatService;

  detailsForm = new FormGroup<DetailsForm>({
    roomname: new FormControl<string>('', {nonNullable: true}),
    username: new FormControl<string>('', {nonNullable: true})
  });


  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.chatService = SingletonChatService.getInstance();
  }

  onSubmitDetailsForm() {
    localStorage.setItem('roomname', this.detailsForm.value.roomname ?? '');
    localStorage.setItem('username', this.detailsForm.value.username ?? 'Anonymous');
    localStorage.setItem('userId', this.chatService?.socket.id ?? "RandomUserId");

    this.chatService?.joinRoom(this.detailsForm.value.roomname ?? 'global-room', this.detailsForm.value.username ?? 'Anonymous');

    this.router.navigate(['chatroom', this.detailsForm.value.roomname ?? 'global-room']);
    this.detailsForm.reset();

  }

}
