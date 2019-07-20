import Layout from "../components/Layout";
import { MeComponent, SignS3Component } from "../generated/apolloComponents";
import { Flex, Heading, Text } from "rebass";
import DropZone from "../modules/messages/DropZone";

// import AudioRecorder from "react-audio-recorder";
// import dynamic from "next/dynamic";
// import { isBrowser } from "../lib/isBrowser";

// const AudioRecorder = dynamic(() => import("react-audio-recorder") as any, {
//   ssr: false
// });

const DropPage = () => (
  <Layout>
    <MeComponent>
      {({ data: dataMe, loading: loadingMe, error: errorMe }) => {
        if (!dataMe || !dataMe.me) {
          return null;
        }
        if (errorMe) {
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading>error!!!</Heading>
            <Text>{errorMe.message}</Text>
          </Flex>;
        }
        if (loadingMe) {
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
            <SignS3Component>
              {(
                signS3,
                { data: dataSignS3, error: errorSignS3, loading: loadingSignS3 }
              ) => {
                return (
                  <DropZone
                    signS3={signS3}
                    data={dataSignS3}
                    error={errorSignS3}
                    loading={loadingSignS3}
                    mutation={signS3}
                    onFilesAdded={console.log}
                    me={dataMe.me}
                  />
                );
              }}
            </SignS3Component>
          </Flex>
        );
      }}
    </MeComponent>
  </Layout>
);

export default DropPage;
