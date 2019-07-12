// import AudioRecorder from "react-audio-recorder";
import dynamic from "next/dynamic";

import Layout from "../components/Layout";
import { MeComponent } from "../generated/apolloComponents";
import { Flex, Heading, Text } from "rebass";
import DropZone from "../modules/messages/DropZone";
import { isBrowser } from "../lib/isBrowser";

const AudioRecorder = dynamic(() => import("react-audio-recorder") as any, {
  ssr: false
});

const DropPage = () => (
  <Layout>
    <MeComponent>
      {({ data, loading, error }) => {
        if (!data || !data.me) {
          return null;
        }
        if (error) {
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading>error!!!</Heading>
            <Text>{error.message}</Text>
          </Flex>;
        }
        if (loading) {
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading>loading...</Heading>
          </Flex>;
        }

        return (
          <Flex>
            <DropZone onFilesAdded={console.log} me={data.me} />
            {isBrowser && typeof window.navigator !== "undefined" ? (
              <AudioRecorder />
            ) : (
              ""
            )}
          </Flex>
        );
      }}
    </MeComponent>
  </Layout>
);

export default DropPage;
