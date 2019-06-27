export type Maybe<T> = T | null;

export interface GetMessagesInput {
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

export interface QuickPostSubsInput {
  sentBy: string;

  message: string;
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

  id: string;

  title: Maybe<string>;

  text: string;
};

export type FollowUserVariables = {
  data: FollowUserInput;
};

export type FollowUserMutation = {
  __typename?: "Mutation";

  followUser: Maybe<FollowUserFollowUser>;
};

export type FollowUserFollowUser = {
  __typename?: "User";

  id: string;

  firstName: string;
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

  id: string;

  title: Maybe<string>;

  text: string;

  images: Maybe<GetGlobalPostsImages[]>;

  user: GetGlobalPostsUser;
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

  followers: Maybe<GetThoseIFollowAndTheirPostsResolverFollowers[]>;
};

export type GetThoseIFollowAndTheirPostsResolverFollowers = {
  __typename?: "User";

  id: string;

  firstName: string;

  posts: Maybe<GetThoseIFollowAndTheirPostsResolverPosts[]>;
};

export type GetThoseIFollowAndTheirPostsResolverPosts = {
  __typename?: "Post";

  id: string;

  title: Maybe<string>;

  text: string;

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

export type GlobalPostsVariables = {};

export type GlobalPostsSubscription = {
  __typename?: "Subscription";

  globalPosts: GlobalPostsGlobalPosts;
};

export type GlobalPostsGlobalPosts = {
  __typename?: "PostSubType";

  id: string;

  title: string;

  text: string;

  images: GlobalPostsImages[];

  user: GlobalPostsUser;
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
};

export type MyFollowerPostsVariables = {
  data: QuickPostSubsInput;
};

export type MyFollowerPostsSubscription = {
  __typename?: "Subscription";

  followingPosts: MyFollowerPostsFollowingPosts;
};

export type MyFollowerPostsFollowingPosts = {
  __typename?: "PostSubType";

  id: string;

  title: string;

  text: string;

  images: MyFollowerPostsImages[];

  user: MyFollowerPostsUser;
};

export type MyFollowerPostsImages = {
  __typename?: "Image";

  id: string;

  uri: string;
};

export type MyFollowerPostsUser = {
  __typename?: "User";

  id: string;

  firstName: string;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

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
    followUser(data: $data) {
      id
      firstName
    }
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
export const MeDocument = gql`
  query Me {
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
      followers {
        id
        firstName
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
export const MyFollowerPostsDocument = gql`
  subscription MyFollowerPosts($data: QuickPostSubsInput!) {
    followingPosts(data: $data) {
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
      }
    }
  }
`;
export class MyFollowerPostsComponent extends React.Component<
  Partial<
    ReactApollo.SubscriptionProps<
      MyFollowerPostsSubscription,
      MyFollowerPostsVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Subscription<
        MyFollowerPostsSubscription,
        MyFollowerPostsVariables
      >
        subscription={MyFollowerPostsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MyFollowerPostsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MyFollowerPostsSubscription, MyFollowerPostsVariables>
> &
  TChildProps;
export function MyFollowerPostsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MyFollowerPostsSubscription,
        MyFollowerPostsVariables,
        MyFollowerPostsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MyFollowerPostsSubscription,
    MyFollowerPostsVariables,
    MyFollowerPostsProps<TChildProps>
  >(MyFollowerPostsDocument, operationOptions);
}
