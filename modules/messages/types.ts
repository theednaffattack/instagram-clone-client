export interface MessageBody {
  id: string;
  title?: string;
  message: string;
  createdAt: any;
}

export interface MessageThreadProps {
  active: boolean;
  avatar: string;
  data: any;
  id: string;
  handleSelectMessageThread: any;
  last: boolean;
  userId: string;
  messageIndex: number;
  messages: MessageBody[];
  name: string;
}

export interface TemporaryNameProps {
  arrayOfMessages: any[];
  me: any;
  selectedMessageId: string | null;
}

export interface MessagePageState {
  selectedMessageType: string;
  selectedMessageId: string | null;
}
