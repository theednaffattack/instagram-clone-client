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
