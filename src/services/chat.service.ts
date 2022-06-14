import { io, Socket } from 'socket.io-client';

export class ChatService {
  socket: Socket;
  constructor() {
    this.socket = io("https://whats-chatt.herokuapp.com/");
    this.onError((error: any) => {
      console.error(error);
      alert(error.message);
    })
  }

  joinRoom(roomname: string | null, username: string | null) {
    this.socket.emit("joinRoom", { username, roomname });
    localStorage.setItem('roomname', roomname ?? '');
    localStorage.setItem('username', username ?? 'Anonymous');
  }

  sendMessage(message: string) {
    this.socket.emit("chat", message);
  }

  disconnect() {
    this.socket.disconnect();
  }

  onMessage(callback: (message: any) => void) {
    this.socket.on("message", callback);
  }

  onError(callback: (error: any) => void) {
    this.socket.on("error", callback);
  }
}

export class SingletonChatService {
  private static instance: ChatService;
  private constructor() { }
  static getInstance(): ChatService {
    if (!SingletonChatService.instance) {
      SingletonChatService.instance = new ChatService();
    }
    return SingletonChatService.instance;
  }
}
