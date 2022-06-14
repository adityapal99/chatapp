export interface Message {
  message: string;
  username: string | null;
  userId: string | null;
  ownMessage: boolean;
}
