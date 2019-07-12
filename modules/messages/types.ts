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

export interface IChatBodyProps {
  handleThreadSelection: any;
  disabled: boolean;
  chatEmoji: string;
  chatInput: string;
  selectedThreadId: any;
  selectedThreadIndex: number | null;
  handleThreadAddThreadClick: any;
  showMessagingAddressBook: any;
  handleChatMenuClick: any;
  handleAddInviteeToThread: any;
  handleRemoveInviteeToThread: any;
  newThreadInvitees: any;
  me: any;
  dataMessageThreads: any;
  handleEngageMicrophoneClick: any;
  handleOpenEmojiMenuClick: any;
  handleChatFieldChange: any;
  handleUploadFileClick: any;
  emojiPickerVisible: boolean;
  newThreadDisabled: boolean;
}
