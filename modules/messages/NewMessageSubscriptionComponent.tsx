import { NewMessageComponent as NewMessageComponentWithDataSub } from "../../generated/apolloComponents";
import { IncomingMessageBubble } from "./IncomingMessageBubbleNew";

export const NewMessageComponent = ({
  variables = { message: "init" }
}: any) => {
  <NewMessageComponentWithDataSub variables={variables}>
    {({ loading, error, data }) => (
      <div>
        <div>{loading ? "loading..." : ""}</div>
        <div>{error ? error.message : ""}</div>
        {data ? <IncomingMessageBubble {...data.newMessage} /> : ""}
      </div>
    )}
  </NewMessageComponentWithDataSub>;
};

export const NewMessageComponentSubcriptionRenderProp = ({
  message,
  newMessageSub
}) => (
  <NewMessageComponentWithDataSub
    // onSubscriptionData={() => console.log("SUBSCIPTION BOOOOOOOY")}
    subscription={newMessageSub}
    variables={{
      message
    }}
  >
    {({ loading, error, data }) => (
      <div>
        {/* {JSON.stringify(variables, null, 2)} */}
        {/* {!loading && newMessage.message} */}
        {/* {data ? Object.keys(data) : "no data"}
          {data ? <Text>{data.newMessage.message}</Text> : "not yet"} */}
        {loading ? "loading... " : ""}
        {!loading && <IncomingMessageBubble {...data.newMessage} />}
      </div>
    )}
  </NewMessageComponentWithDataSub>
);
