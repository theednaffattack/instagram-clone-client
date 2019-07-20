export type Maybe<T> = T | null;

export interface GetMessagesFromUserInput {
  sentBy: string;

  user: string;
}

export interface ProductInput {
  name: string;
}

export interface RegisterInput {
  password: string;

  firstName: string;

  lastName: string;

  email: string;

  termsAndConditions: boolean;

  keepMeSignedIn: boolean;
}

export interface ChangePasswordInput {
  password: string;

  token: string;
}

export interface PostInput {
  text: string;

  title?: Maybe<string>;

  user: string;

  images?: Maybe<string[]>;

  picture: Upload;
}

export interface FollowUserInput {
  userIDToFollow: string;
}

export interface UnFollowUserInput {
  userIDToUnFollow: string;
}

export interface QuickPostSubsInput {
  sentBy: string;

  message: string;
}

export interface AddMessageToThreadInputV2 {
  threadId: string;

  sentTo: string;

  invitees: string[];

  message: string;

  images?: Maybe<Upload[]>;
}

export interface GetAllMyMessagesInput {
  user: string;
}

export interface GetAllMyMessageThreadsInput {
  user: string;
}

export interface GetMessageThreadsFromUserInput {
  sentBy: string;

  user: string;
}

export interface PasswordInput {
  password: string;
}

/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = any;

/** The `Upload` scalar type represents a file upload. */
export type Upload = any;

// ====================================================
// Documents
// ====================================================

export type AddMessageToThreadVariables = {
  threadId: string;
  sentTo: string;
  message: string;
  invitees: string[];
  images?: Maybe<Upload[]>;
};

export type AddMessageToThreadMutation = {
  __typename?: "Mutation";

  addMessageToThread: AddMessageToThreadAddMessageToThread;
};

export type AddMessageToThreadAddMessageToThread = {
  __typename?: "AddMessagePayload";

  success: boolean;

  invitees: AddMessageToThreadInvitees[];

  threadId: string;

  message: AddMessageToThreadMessage;

  user: AddMessageToThread_User;
};

export type AddMessageToThreadInvitees = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;
};

export type AddMessageToThreadMessage = {
  __typename?: "Message";

  id: string;

  message: string;

  images: Maybe<AddMessageToThreadImages[]>;

  sentBy: AddMessageToThreadSentBy;

  user: AddMessageToThreadUser;
};

export type AddMessageToThreadImages = {
  __typename?: "Image";

  id: string;

  uri: string;
};

export type AddMessageToThreadSentBy = {
  __typename?: "User";

  id: string;

  firstName: string;
};

export type AddMessageToThreadUser = {
  __typename?: "User";

  id: string;

  firstName: string;
};

export type AddMessageToThread_User = {
  __typename?: "User";

  id: string;

  firstName: string;
};

export type AddNewMessageVariables = {
  sentTo: string;
  message: string;
};

export type AddNewMessageMutation = {
  __typename?: "Mutation";

  addNewMessage: boolean;
};

export type CreateMessageThreadVariables = {
  sentTo: string;
  message: string;
  images?: Maybe<Upload[]>;
  invitees: string[];
};

export type CreateMessageThreadMutation = {
  __typename?: "Mutation";

  createMessageThread: CreateMessageThreadCreateMessageThread;
};

export type CreateMessageThreadCreateMessageThread = {
  __typename?: "Thread";

  id: Maybe<string>;

  invitees: CreateMessageThreadInvitees[];

  messages: CreateMessageThreadMessages[];
};

export type CreateMessageThreadInvitees = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;
};

export type CreateMessageThreadMessages = {
  __typename?: "Message";

  id: string;

  created_at: Maybe<DateTime>;

  message: string;

  images: Maybe<CreateMessageThreadImages[]>;

  sentBy: CreateMessageThreadSentBy;

  user: CreateMessageThreadUser;
};

export type CreateMessageThreadImages = {
  __typename?: "Image";

  id: string;

  uri: string;
};

export type CreateMessageThreadSentBy = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;
};

export type CreateMessageThreadUser = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;
};

export type SignS3Variables = {
  filename: string;
  filetype: string;
};

export type SignS3Mutation = {
  __typename?: "Mutation";

  signS3: SignS3SignS3;
};

export type SignS3SignS3 = {
  __typename?: "SignedS3Payload";

  url: string;

  signedRequest: string;
};

export type GetAllMyMessagesVariables = {};

export type GetAllMyMessagesQuery = {
  __typename?: "Query";

  getAllMyMessages: Maybe<GetAllMyMessagesGetAllMyMessages>;
};

export type GetAllMyMessagesGetAllMyMessages = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  mappedMessages: GetAllMyMessagesMappedMessages[];
};

export type GetAllMyMessagesMappedMessages = {
  __typename?: "Message";

  id: string;

  created_at: Maybe<DateTime>;

  updated_at: Maybe<DateTime>;

  message: string;

  sentBy: GetAllMyMessagesSentBy;

  user: GetAllMyMessagesUser;
};

export type GetAllMyMessagesSentBy = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;
};

export type GetAllMyMessagesUser = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;
};

export type GetListToCreateThreadVariables = {};

export type GetListToCreateThreadQuery = {
  __typename?: "Query";

  getListToCreateThread: Maybe<GetListToCreateThreadGetListToCreateThread>;
};

export type GetListToCreateThreadGetListToCreateThread = {
  __typename?: "TransUserReturn";

  id: string;

  firstName: string;

  thoseICanMessage: Maybe<GetListToCreateThreadThoseICanMessage[]>;
};

export type GetListToCreateThreadThoseICanMessage = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;
};

export type GetMessageThreadsVariables = {};

export type GetMessageThreadsQuery = {
  __typename?: "Query";

  getMessageThreads: Maybe<GetMessageThreadsGetMessageThreads[]>;
};

export type GetMessageThreadsGetMessageThreads = {
  __typename?: "Thread";

  id: Maybe<string>;

  invitees: GetMessageThreadsInvitees[];

  messages: GetMessageThreadsMessages[];
};

export type GetMessageThreadsInvitees = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;
};

export type GetMessageThreadsMessages = {
  __typename?: "Message";

  id: string;

  created_at: Maybe<DateTime>;

  message: string;

  images: Maybe<GetMessageThreadsImages[]>;

  sentBy: GetMessageThreadsSentBy;

  user: GetMessageThreadsUser;
};

export type GetMessageThreadsImages = {
  __typename?: "Image";

  id: string;

  uri: string;
};

export type GetMessageThreadsSentBy = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;
};

export type GetMessageThreadsUser = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;
};

export type GetMyMessagesFromUserVariables = {
  input: GetMessagesFromUserInput;
};

export type GetMyMessagesFromUserQuery = {
  __typename?: "Query";

  getMyMessagesFromUser: Maybe<GetMyMessagesFromUserGetMyMessagesFromUser[]>;
};

export type GetMyMessagesFromUserGetMyMessagesFromUser = {
  __typename?: "Message";

  id: string;

  message: string;

  created_at: Maybe<DateTime>;

  sentBy: GetMyMessagesFromUserSentBy;
};

export type GetMyMessagesFromUserSentBy = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;
};

export type NewMessageVariables = {
  message: string;
  sentTo: string;
};

export type NewMessageSubscription = {
  __typename?: "Subscription";

  newMessage: NewMessageNewMessage;
};

export type NewMessageNewMessage = {
  __typename?: "MessageSubType";

  id: string;

  message: Maybe<string>;

  sentBy: NewMessageSentBy;

  user: NewMessageUser;

  created_at: Maybe<DateTime>;

  updated_at: Maybe<DateTime>;
};

export type NewMessageSentBy = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;
};

export type NewMessageUser = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;
};

export type ChangePasswordVariables = {
  data: ChangePasswordInput;
};

export type ChangePasswordMutation = {
  __typename?: "Mutation";

  changePassword: Maybe<ChangePasswordChangePassword>;
};

export type ChangePasswordChangePassword = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  email: string;

  name: string;
};

export type ConfirmUserVariables = {
  token: string;
};

export type ConfirmUserMutation = {
  __typename?: "Mutation";

  confirmUser: boolean;
};

export type CreatePostVariables = {
  data: PostInput;
};

export type CreatePostMutation = {
  __typename?: "Mutation";

  createPost: CreatePostCreatePost;
};

export type CreatePostCreatePost = {
  __typename?: "Post";

  id: Maybe<string>;

  title: Maybe<string>;

  text: Maybe<string>;
};

export type FollowUserVariables = {
  data: FollowUserInput;
};

export type FollowUserMutation = {
  __typename?: "Mutation";

  followUser: boolean;
};

export type ForgotPasswordVariables = {
  email: string;
};

export type ForgotPasswordMutation = {
  __typename?: "Mutation";

  forgotPassword: boolean;
};

export type LoginVariables = {
  email: string;
  password: string;
};

export type LoginMutation = {
  __typename?: "Mutation";

  login: Maybe<LoginLogin>;
};

export type LoginLogin = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  email: string;

  name: string;
};

export type LogoutVariables = {};

export type LogoutMutation = {
  __typename?: "Mutation";

  logout: boolean;
};

export type RegisterVariables = {
  data: RegisterInput;
};

export type RegisterMutation = {
  __typename?: "Mutation";

  register: RegisterRegister;
};

export type RegisterRegister = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  email: string;

  name: string;
};

export type UnFollowUserVariables = {
  data: UnFollowUserInput;
};

export type UnFollowUserMutation = {
  __typename?: "Mutation";

  unFollowUser: boolean;
};

export type GetAllMyImagesVariables = {};

export type GetAllMyImagesQuery = {
  __typename?: "Query";

  GetAllMyImages: GetAllMyImagesGetAllMyImages[];
};

export type GetAllMyImagesGetAllMyImages = {
  __typename?: "Image";

  id: string;

  uri: string;
};

export type GetGlobalPostsVariables = {};

export type GetGlobalPostsQuery = {
  __typename?: "Query";

  getGlobalPosts: Maybe<GetGlobalPostsGetGlobalPosts[]>;
};

export type GetGlobalPostsGetGlobalPosts = {
  __typename?: "Post";

  id: Maybe<string>;

  title: Maybe<string>;

  text: Maybe<string>;

  created_at: Maybe<DateTime>;

  images: Maybe<GetGlobalPostsImages[]>;

  user: Maybe<GetGlobalPostsUser>;
};

export type GetGlobalPostsImages = {
  __typename?: "Image";

  id: string;

  uri: string;
};

export type GetGlobalPostsUser = {
  __typename?: "User";

  id: string;

  firstName: string;
};

export type GetThoseIFollowAndTheirPostsResolverVariables = {};

export type GetThoseIFollowAndTheirPostsResolverQuery = {
  __typename?: "Query";

  getThoseIFollowAndTheirPostsResolver: Maybe<
    GetThoseIFollowAndTheirPostsResolverGetThoseIFollowAndTheirPostsResolver
  >;
};

export type GetThoseIFollowAndTheirPostsResolverGetThoseIFollowAndTheirPostsResolver = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  email: string;

  name: string;

  following: Maybe<GetThoseIFollowAndTheirPostsResolverFollowing[]>;
};

export type GetThoseIFollowAndTheirPostsResolverFollowing = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  posts: Maybe<GetThoseIFollowAndTheirPostsResolverPosts[]>;
};

export type GetThoseIFollowAndTheirPostsResolverPosts = {
  __typename?: "Post";

  id: Maybe<string>;

  title: Maybe<string>;

  text: Maybe<string>;

  images: Maybe<GetThoseIFollowAndTheirPostsResolverImages[]>;
};

export type GetThoseIFollowAndTheirPostsResolverImages = {
  __typename?: "Image";

  id: string;

  uri: string;
};

export type HelloWorldVariables = {};

export type HelloWorldQuery = {
  __typename?: "Query";

  helloWorld: string;
};

export type MeVariables = {};

export type MeQuery = {
  __typename?: "Query";

  me: Maybe<MeMe>;
};

export type MeMe = {
  __typename?: "User";

  firstName: string;

  lastName: string;

  email: string;

  name: string;

  id: string;
};

export type MyFollowingPostsVariables = {};

export type MyFollowingPostsQuery = {
  __typename?: "Query";

  myFollowingPosts: Maybe<MyFollowingPostsMyFollowingPosts[]>;
};

export type MyFollowingPostsMyFollowingPosts = {
  __typename?: "Post";

  id: Maybe<string>;

  title: Maybe<string>;

  text: Maybe<string>;

  created_at: Maybe<DateTime>;

  images: Maybe<MyFollowingPostsImages[]>;

  user: Maybe<MyFollowingPostsUser>;
};

export type MyFollowingPostsImages = {
  __typename?: "Image";

  id: string;

  uri: string;
};

export type MyFollowingPostsUser = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;
};

export type FollowingPostsVariables = {
  data: QuickPostSubsInput;
};

export type FollowingPostsSubscription = {
  __typename?: "Subscription";

  followingPosts: FollowingPostsFollowingPosts;
};

export type FollowingPostsFollowingPosts = {
  __typename?: "PostSubType";

  id: string;

  title: string;

  text: string;

  created_at: DateTime;

  images: FollowingPostsImages[];

  user: FollowingPostsUser;
};

export type FollowingPostsImages = {
  __typename?: "Image";

  id: string;

  uri: string;
};

export type FollowingPostsUser = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;
};

export type GlobalPostsVariables = {};

export type GlobalPostsSubscription = {
  __typename?: "Subscription";

  globalPosts: Maybe<GlobalPostsGlobalPosts>;
};

export type GlobalPostsGlobalPosts = {
  __typename?: "Post";

  id: Maybe<string>;

  title: Maybe<string>;

  text: Maybe<string>;

  images: Maybe<GlobalPostsImages[]>;

  user: Maybe<GlobalPostsUser>;
};

export type GlobalPostsImages = {
  __typename?: "Image";

  id: string;

  uri: string;
};

export type GlobalPostsUser = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;
};

export type MessageThreadsVariables = {
  data: AddMessageToThreadInputV2;
};

export type MessageThreadsSubscription = {
  __typename?: "Subscription";

  messageThreads: MessageThreadsMessageThreads;
};

export type MessageThreadsMessageThreads = {
  __typename?: "AddMessagePayload";

  success: boolean;

  message: MessageThreadsMessage;
};

export type MessageThreadsMessage = {
  __typename?: "Message";

  id: string;

  created_at: Maybe<DateTime>;

  message: string;

  images: Maybe<MessageThreadsImages[]>;

  sentBy: MessageThreadsSentBy;

  user: MessageThreadsUser;
};

export type MessageThreadsImages = {
  __typename?: "Image";

  id: string;

  uri: string;
};

export type MessageThreadsSentBy = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;
};

export type MessageThreadsUser = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export const AddMessageToThreadDocument = gql`
  mutation AddMessageToThread(
    $threadId: ID!
    $sentTo: String!
    $message: String!
    $invitees: [ID!]!
    $images: [Upload]
  ) {
    addMessageToThread(
      threadId: $threadId
      sentTo: $sentTo
      message: $message
      invitees: $invitees
      images: $images
    ) {
      success
      invitees {
        id
        firstName
        lastName
      }
      threadId
      message {
        id
        message
        images {
          id
          uri
        }
        sentBy {
          id
          firstName
        }
        user {
          id
          firstName
        }
      }
      user {
        id
        firstName
      }
    }
  }
`;
export class AddMessageToThreadComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      AddMessageToThreadMutation,
      AddMessageToThreadVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        AddMessageToThreadMutation,
        AddMessageToThreadVariables
      >
        mutation={AddMessageToThreadDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AddMessageToThreadProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    AddMessageToThreadMutation,
    AddMessageToThreadVariables
  >
> &
  TChildProps;
export type AddMessageToThreadMutationFn = ReactApollo.MutationFn<
  AddMessageToThreadMutation,
  AddMessageToThreadVariables
>;
export function AddMessageToThreadHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AddMessageToThreadMutation,
        AddMessageToThreadVariables,
        AddMessageToThreadProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AddMessageToThreadMutation,
    AddMessageToThreadVariables,
    AddMessageToThreadProps<TChildProps>
  >(AddMessageToThreadDocument, operationOptions);
}
export const AddNewMessageDocument = gql`
  mutation AddNewMessage($sentTo: String!, $message: String!) {
    addNewMessage(sentTo: $sentTo, message: $message)
  }
`;
export class AddNewMessageComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<AddNewMessageMutation, AddNewMessageVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<AddNewMessageMutation, AddNewMessageVariables>
        mutation={AddNewMessageDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AddNewMessageProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<AddNewMessageMutation, AddNewMessageVariables>
> &
  TChildProps;
export type AddNewMessageMutationFn = ReactApollo.MutationFn<
  AddNewMessageMutation,
  AddNewMessageVariables
>;
export function AddNewMessageHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AddNewMessageMutation,
        AddNewMessageVariables,
        AddNewMessageProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AddNewMessageMutation,
    AddNewMessageVariables,
    AddNewMessageProps<TChildProps>
  >(AddNewMessageDocument, operationOptions);
}
export const CreateMessageThreadDocument = gql`
  mutation CreateMessageThread(
    $sentTo: String!
    $message: String!
    $images: [Upload]
    $invitees: [ID!]!
  ) {
    createMessageThread(
      sentTo: $sentTo
      message: $message
      images: $images
      invitees: $invitees
    ) {
      id
      invitees {
        id
        firstName
        lastName
      }
      messages {
        id
        created_at
        message
        images {
          id
          uri
        }
        sentBy {
          id
          firstName
          lastName
        }
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`;
export class CreateMessageThreadComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      CreateMessageThreadMutation,
      CreateMessageThreadVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        CreateMessageThreadMutation,
        CreateMessageThreadVariables
      >
        mutation={CreateMessageThreadDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateMessageThreadProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    CreateMessageThreadMutation,
    CreateMessageThreadVariables
  >
> &
  TChildProps;
export type CreateMessageThreadMutationFn = ReactApollo.MutationFn<
  CreateMessageThreadMutation,
  CreateMessageThreadVariables
>;
export function CreateMessageThreadHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateMessageThreadMutation,
        CreateMessageThreadVariables,
        CreateMessageThreadProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateMessageThreadMutation,
    CreateMessageThreadVariables,
    CreateMessageThreadProps<TChildProps>
  >(CreateMessageThreadDocument, operationOptions);
}
export const SignS3Document = gql`
  mutation SignS3($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`;
export class SignS3Component extends React.Component<
  Partial<ReactApollo.MutationProps<SignS3Mutation, SignS3Variables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<SignS3Mutation, SignS3Variables>
        mutation={SignS3Document}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type SignS3Props<TChildProps = any> = Partial<
  ReactApollo.MutateProps<SignS3Mutation, SignS3Variables>
> &
  TChildProps;
export type SignS3MutationFn = ReactApollo.MutationFn<
  SignS3Mutation,
  SignS3Variables
>;
export function SignS3HOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        SignS3Mutation,
        SignS3Variables,
        SignS3Props<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    SignS3Mutation,
    SignS3Variables,
    SignS3Props<TChildProps>
  >(SignS3Document, operationOptions);
}
export const GetAllMyMessagesDocument = gql`
  query GetAllMyMessages {
    getAllMyMessages {
      id
      firstName
      lastName
      mappedMessages {
        id
        created_at
        updated_at
        message
        sentBy {
          id
          firstName
          lastName
        }
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`;
export class GetAllMyMessagesComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetAllMyMessagesQuery, GetAllMyMessagesVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetAllMyMessagesQuery, GetAllMyMessagesVariables>
        query={GetAllMyMessagesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetAllMyMessagesProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetAllMyMessagesQuery, GetAllMyMessagesVariables>
> &
  TChildProps;
export function GetAllMyMessagesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetAllMyMessagesQuery,
        GetAllMyMessagesVariables,
        GetAllMyMessagesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetAllMyMessagesQuery,
    GetAllMyMessagesVariables,
    GetAllMyMessagesProps<TChildProps>
  >(GetAllMyMessagesDocument, operationOptions);
}
export const GetListToCreateThreadDocument = gql`
  query GetListToCreateThread {
    getListToCreateThread {
      id
      firstName
      thoseICanMessage {
        id
        firstName
        lastName
      }
    }
  }
`;
export class GetListToCreateThreadComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      GetListToCreateThreadQuery,
      GetListToCreateThreadVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<
        GetListToCreateThreadQuery,
        GetListToCreateThreadVariables
      >
        query={GetListToCreateThreadDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetListToCreateThreadProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<
    GetListToCreateThreadQuery,
    GetListToCreateThreadVariables
  >
> &
  TChildProps;
export function GetListToCreateThreadHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetListToCreateThreadQuery,
        GetListToCreateThreadVariables,
        GetListToCreateThreadProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetListToCreateThreadQuery,
    GetListToCreateThreadVariables,
    GetListToCreateThreadProps<TChildProps>
  >(GetListToCreateThreadDocument, operationOptions);
}
export const GetMessageThreadsDocument = gql`
  query GetMessageThreads {
    getMessageThreads {
      id
      invitees {
        id
        firstName
        lastName
      }
      messages {
        id
        created_at
        message
        images {
          id
          uri
        }
        sentBy {
          id
          firstName
          lastName
        }
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`;
export class GetMessageThreadsComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetMessageThreadsQuery, GetMessageThreadsVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetMessageThreadsQuery, GetMessageThreadsVariables>
        query={GetMessageThreadsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetMessageThreadsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetMessageThreadsQuery, GetMessageThreadsVariables>
> &
  TChildProps;
export function GetMessageThreadsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetMessageThreadsQuery,
        GetMessageThreadsVariables,
        GetMessageThreadsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetMessageThreadsQuery,
    GetMessageThreadsVariables,
    GetMessageThreadsProps<TChildProps>
  >(GetMessageThreadsDocument, operationOptions);
}
export const GetMyMessagesFromUserDocument = gql`
  query GetMyMessagesFromUser($input: GetMessagesFromUserInput!) {
    getMyMessagesFromUser(input: $input) {
      id
      message
      created_at
      sentBy {
        id
        firstName
        lastName
      }
    }
  }
`;
export class GetMyMessagesFromUserComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      GetMyMessagesFromUserQuery,
      GetMyMessagesFromUserVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<
        GetMyMessagesFromUserQuery,
        GetMyMessagesFromUserVariables
      >
        query={GetMyMessagesFromUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetMyMessagesFromUserProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<
    GetMyMessagesFromUserQuery,
    GetMyMessagesFromUserVariables
  >
> &
  TChildProps;
export function GetMyMessagesFromUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetMyMessagesFromUserQuery,
        GetMyMessagesFromUserVariables,
        GetMyMessagesFromUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetMyMessagesFromUserQuery,
    GetMyMessagesFromUserVariables,
    GetMyMessagesFromUserProps<TChildProps>
  >(GetMyMessagesFromUserDocument, operationOptions);
}
export const NewMessageDocument = gql`
  subscription NewMessage($message: String!, $sentTo: String!) {
    newMessage(message: $message, sentTo: $sentTo) {
      id
      message
      sentBy {
        id
        firstName
        lastName
      }
      user {
        id
        firstName
        lastName
      }
      created_at
      updated_at
    }
  }
`;
export class NewMessageComponent extends React.Component<
  Partial<
    ReactApollo.SubscriptionProps<NewMessageSubscription, NewMessageVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Subscription<NewMessageSubscription, NewMessageVariables>
        subscription={NewMessageDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type NewMessageProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<NewMessageSubscription, NewMessageVariables>
> &
  TChildProps;
export function NewMessageHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        NewMessageSubscription,
        NewMessageVariables,
        NewMessageProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    NewMessageSubscription,
    NewMessageVariables,
    NewMessageProps<TChildProps>
  >(NewMessageDocument, operationOptions);
}
export const ChangePasswordDocument = gql`
  mutation ChangePassword($data: ChangePasswordInput!) {
    changePassword(data: $data) {
      id
      firstName
      lastName
      email
      name
    }
  }
`;
export class ChangePasswordComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<ChangePasswordMutation, ChangePasswordVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<ChangePasswordMutation, ChangePasswordVariables>
        mutation={ChangePasswordDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ChangePasswordProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<ChangePasswordMutation, ChangePasswordVariables>
> &
  TChildProps;
export type ChangePasswordMutationFn = ReactApollo.MutationFn<
  ChangePasswordMutation,
  ChangePasswordVariables
>;
export function ChangePasswordHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ChangePasswordMutation,
        ChangePasswordVariables,
        ChangePasswordProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ChangePasswordMutation,
    ChangePasswordVariables,
    ChangePasswordProps<TChildProps>
  >(ChangePasswordDocument, operationOptions);
}
export const ConfirmUserDocument = gql`
  mutation ConfirmUser($token: String!) {
    confirmUser(token: $token)
  }
`;
export class ConfirmUserComponent extends React.Component<
  Partial<ReactApollo.MutationProps<ConfirmUserMutation, ConfirmUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<ConfirmUserMutation, ConfirmUserVariables>
        mutation={ConfirmUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ConfirmUserProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<ConfirmUserMutation, ConfirmUserVariables>
> &
  TChildProps;
export type ConfirmUserMutationFn = ReactApollo.MutationFn<
  ConfirmUserMutation,
  ConfirmUserVariables
>;
export function ConfirmUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ConfirmUserMutation,
        ConfirmUserVariables,
        ConfirmUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ConfirmUserMutation,
    ConfirmUserVariables,
    ConfirmUserProps<TChildProps>
  >(ConfirmUserDocument, operationOptions);
}
export const CreatePostDocument = gql`
  mutation CreatePost($data: PostInput!) {
    createPost(data: $data) {
      id
      title
      text
    }
  }
`;
export class CreatePostComponent extends React.Component<
  Partial<ReactApollo.MutationProps<CreatePostMutation, CreatePostVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<CreatePostMutation, CreatePostVariables>
        mutation={CreatePostDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreatePostProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreatePostMutation, CreatePostVariables>
> &
  TChildProps;
export type CreatePostMutationFn = ReactApollo.MutationFn<
  CreatePostMutation,
  CreatePostVariables
>;
export function CreatePostHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreatePostMutation,
        CreatePostVariables,
        CreatePostProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreatePostMutation,
    CreatePostVariables,
    CreatePostProps<TChildProps>
  >(CreatePostDocument, operationOptions);
}
export const FollowUserDocument = gql`
  mutation FollowUser($data: FollowUserInput!) {
    followUser(data: $data)
  }
`;
export class FollowUserComponent extends React.Component<
  Partial<ReactApollo.MutationProps<FollowUserMutation, FollowUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<FollowUserMutation, FollowUserVariables>
        mutation={FollowUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FollowUserProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<FollowUserMutation, FollowUserVariables>
> &
  TChildProps;
export type FollowUserMutationFn = ReactApollo.MutationFn<
  FollowUserMutation,
  FollowUserVariables
>;
export function FollowUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FollowUserMutation,
        FollowUserVariables,
        FollowUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FollowUserMutation,
    FollowUserVariables,
    FollowUserProps<TChildProps>
  >(FollowUserDocument, operationOptions);
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
export class ForgotPasswordComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<ForgotPasswordMutation, ForgotPasswordVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<ForgotPasswordMutation, ForgotPasswordVariables>
        mutation={ForgotPasswordDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ForgotPasswordProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<ForgotPasswordMutation, ForgotPasswordVariables>
> &
  TChildProps;
export type ForgotPasswordMutationFn = ReactApollo.MutationFn<
  ForgotPasswordMutation,
  ForgotPasswordVariables
>;
export function ForgotPasswordHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ForgotPasswordMutation,
        ForgotPasswordVariables,
        ForgotPasswordProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ForgotPasswordMutation,
    ForgotPasswordVariables,
    ForgotPasswordProps<TChildProps>
  >(ForgotPasswordDocument, operationOptions);
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      email
      name
    }
  }
`;
export class LoginComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LoginMutation, LoginVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LoginMutation, LoginVariables>
        mutation={LoginDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LoginProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginVariables>
> &
  TChildProps;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginVariables
>;
export function LoginHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LoginMutation,
        LoginVariables,
        LoginProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LoginMutation,
    LoginVariables,
    LoginProps<TChildProps>
  >(LoginDocument, operationOptions);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export class LogoutComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LogoutMutation, LogoutVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LogoutMutation, LogoutVariables>
        mutation={LogoutDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LogoutProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LogoutMutation, LogoutVariables>
> &
  TChildProps;
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutVariables
>;
export function LogoutHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LogoutMutation,
        LogoutVariables,
        LogoutProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LogoutMutation,
    LogoutVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, operationOptions);
}
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      id
      firstName
      lastName
      email
      name
    }
  }
`;
export class RegisterComponent extends React.Component<
  Partial<ReactApollo.MutationProps<RegisterMutation, RegisterVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<RegisterMutation, RegisterVariables>
        mutation={RegisterDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RegisterProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<RegisterMutation, RegisterVariables>
> &
  TChildProps;
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterVariables
>;
export function RegisterHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RegisterMutation,
        RegisterVariables,
        RegisterProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    RegisterMutation,
    RegisterVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, operationOptions);
}
export const UnFollowUserDocument = gql`
  mutation UnFollowUser($data: UnFollowUserInput!) {
    unFollowUser(data: $data)
  }
`;
export class UnFollowUserComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<UnFollowUserMutation, UnFollowUserVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<UnFollowUserMutation, UnFollowUserVariables>
        mutation={UnFollowUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UnFollowUserProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<UnFollowUserMutation, UnFollowUserVariables>
> &
  TChildProps;
export type UnFollowUserMutationFn = ReactApollo.MutationFn<
  UnFollowUserMutation,
  UnFollowUserVariables
>;
export function UnFollowUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UnFollowUserMutation,
        UnFollowUserVariables,
        UnFollowUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UnFollowUserMutation,
    UnFollowUserVariables,
    UnFollowUserProps<TChildProps>
  >(UnFollowUserDocument, operationOptions);
}
export const GetAllMyImagesDocument = gql`
  query GetAllMyImages {
    GetAllMyImages {
      id
      uri
    }
  }
`;
export class GetAllMyImagesComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetAllMyImagesQuery, GetAllMyImagesVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetAllMyImagesQuery, GetAllMyImagesVariables>
        query={GetAllMyImagesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetAllMyImagesProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetAllMyImagesQuery, GetAllMyImagesVariables>
> &
  TChildProps;
export function GetAllMyImagesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetAllMyImagesQuery,
        GetAllMyImagesVariables,
        GetAllMyImagesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetAllMyImagesQuery,
    GetAllMyImagesVariables,
    GetAllMyImagesProps<TChildProps>
  >(GetAllMyImagesDocument, operationOptions);
}
export const GetGlobalPostsDocument = gql`
  query GetGlobalPosts {
    getGlobalPosts {
      id
      title
      text
      created_at
      images {
        id
        uri
      }
      user {
        id
        firstName
      }
    }
  }
`;
export class GetGlobalPostsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetGlobalPostsQuery, GetGlobalPostsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetGlobalPostsQuery, GetGlobalPostsVariables>
        query={GetGlobalPostsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetGlobalPostsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetGlobalPostsQuery, GetGlobalPostsVariables>
> &
  TChildProps;
export function GetGlobalPostsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetGlobalPostsQuery,
        GetGlobalPostsVariables,
        GetGlobalPostsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetGlobalPostsQuery,
    GetGlobalPostsVariables,
    GetGlobalPostsProps<TChildProps>
  >(GetGlobalPostsDocument, operationOptions);
}
export const GetThoseIFollowAndTheirPostsResolverDocument = gql`
  query GetThoseIFollowAndTheirPostsResolver {
    getThoseIFollowAndTheirPostsResolver {
      id
      firstName
      lastName
      email
      name
      following {
        id
        firstName
        lastName
        posts {
          id
          title
          text
          images {
            id
            uri
          }
        }
      }
    }
  }
`;
export class GetThoseIFollowAndTheirPostsResolverComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      GetThoseIFollowAndTheirPostsResolverQuery,
      GetThoseIFollowAndTheirPostsResolverVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<
        GetThoseIFollowAndTheirPostsResolverQuery,
        GetThoseIFollowAndTheirPostsResolverVariables
      >
        query={GetThoseIFollowAndTheirPostsResolverDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetThoseIFollowAndTheirPostsResolverProps<
  TChildProps = any
> = Partial<
  ReactApollo.DataProps<
    GetThoseIFollowAndTheirPostsResolverQuery,
    GetThoseIFollowAndTheirPostsResolverVariables
  >
> &
  TChildProps;
export function GetThoseIFollowAndTheirPostsResolverHOC<
  TProps,
  TChildProps = any
>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetThoseIFollowAndTheirPostsResolverQuery,
        GetThoseIFollowAndTheirPostsResolverVariables,
        GetThoseIFollowAndTheirPostsResolverProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetThoseIFollowAndTheirPostsResolverQuery,
    GetThoseIFollowAndTheirPostsResolverVariables,
    GetThoseIFollowAndTheirPostsResolverProps<TChildProps>
  >(GetThoseIFollowAndTheirPostsResolverDocument, operationOptions);
}
export const HelloWorldDocument = gql`
  query HelloWorld {
    helloWorld
  }
`;
export class HelloWorldComponent extends React.Component<
  Partial<ReactApollo.QueryProps<HelloWorldQuery, HelloWorldVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<HelloWorldQuery, HelloWorldVariables>
        query={HelloWorldDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type HelloWorldProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<HelloWorldQuery, HelloWorldVariables>
> &
  TChildProps;
export function HelloWorldHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        HelloWorldQuery,
        HelloWorldVariables,
        HelloWorldProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    HelloWorldQuery,
    HelloWorldVariables,
    HelloWorldProps<TChildProps>
  >(HelloWorldDocument, operationOptions);
}
export const MeDocument = gql`
  query me {
    me {
      firstName
      lastName
      email
      name
      id
    }
  }
`;
export class MeComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MeQuery, MeVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MeQuery, MeVariables>
        query={MeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MeProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MeQuery, MeVariables>
> &
  TChildProps;
export function MeHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MeQuery,
        MeVariables,
        MeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MeQuery,
    MeVariables,
    MeProps<TChildProps>
  >(MeDocument, operationOptions);
}
export const MyFollowingPostsDocument = gql`
  query MyFollowingPosts {
    myFollowingPosts {
      id
      title
      text
      created_at
      images {
        id
        uri
      }
      user {
        id
        firstName
        lastName
      }
    }
  }
`;
export class MyFollowingPostsComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<MyFollowingPostsQuery, MyFollowingPostsVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<MyFollowingPostsQuery, MyFollowingPostsVariables>
        query={MyFollowingPostsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MyFollowingPostsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MyFollowingPostsQuery, MyFollowingPostsVariables>
> &
  TChildProps;
export function MyFollowingPostsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MyFollowingPostsQuery,
        MyFollowingPostsVariables,
        MyFollowingPostsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MyFollowingPostsQuery,
    MyFollowingPostsVariables,
    MyFollowingPostsProps<TChildProps>
  >(MyFollowingPostsDocument, operationOptions);
}
export const FollowingPostsDocument = gql`
  subscription FollowingPosts($data: QuickPostSubsInput!) {
    followingPosts(data: $data) {
      id
      title
      text
      created_at
      images {
        id
        uri
      }
      user {
        id
        firstName
        lastName
      }
    }
  }
`;
export class FollowingPostsComponent extends React.Component<
  Partial<
    ReactApollo.SubscriptionProps<
      FollowingPostsSubscription,
      FollowingPostsVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Subscription<
        FollowingPostsSubscription,
        FollowingPostsVariables
      >
        subscription={FollowingPostsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FollowingPostsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FollowingPostsSubscription, FollowingPostsVariables>
> &
  TChildProps;
export function FollowingPostsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FollowingPostsSubscription,
        FollowingPostsVariables,
        FollowingPostsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FollowingPostsSubscription,
    FollowingPostsVariables,
    FollowingPostsProps<TChildProps>
  >(FollowingPostsDocument, operationOptions);
}
export const GlobalPostsDocument = gql`
  subscription GlobalPosts {
    globalPosts {
      id
      title
      text
      images {
        id
        uri
      }
      user {
        id
        firstName
        lastName
      }
    }
  }
`;
export class GlobalPostsComponent extends React.Component<
  Partial<
    ReactApollo.SubscriptionProps<GlobalPostsSubscription, GlobalPostsVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Subscription<GlobalPostsSubscription, GlobalPostsVariables>
        subscription={GlobalPostsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GlobalPostsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GlobalPostsSubscription, GlobalPostsVariables>
> &
  TChildProps;
export function GlobalPostsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GlobalPostsSubscription,
        GlobalPostsVariables,
        GlobalPostsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GlobalPostsSubscription,
    GlobalPostsVariables,
    GlobalPostsProps<TChildProps>
  >(GlobalPostsDocument, operationOptions);
}
export const MessageThreadsDocument = gql`
  subscription MessageThreads($data: AddMessageToThreadInput_v2!) {
    messageThreads(data: $data) {
      success
      message {
        id
        created_at
        message
        images {
          id
          uri
        }
        sentBy {
          id
          firstName
          lastName
        }
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`;
export class MessageThreadsComponent extends React.Component<
  Partial<
    ReactApollo.SubscriptionProps<
      MessageThreadsSubscription,
      MessageThreadsVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Subscription<
        MessageThreadsSubscription,
        MessageThreadsVariables
      >
        subscription={MessageThreadsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MessageThreadsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MessageThreadsSubscription, MessageThreadsVariables>
> &
  TChildProps;
export function MessageThreadsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MessageThreadsSubscription,
        MessageThreadsVariables,
        MessageThreadsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MessageThreadsSubscription,
    MessageThreadsVariables,
    MessageThreadsProps<TChildProps>
  >(MessageThreadsDocument, operationOptions);
}
