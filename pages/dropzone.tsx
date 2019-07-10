import Layout from "../components/Layout";
import { MeComponent } from "../generated/apolloComponents";
import { Flex, Heading, Text } from "rebass";
import DropZone from "../modules/messages/DropZone";

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

        return <DropZone onFilesAdded={console.log} me={data.me} />;
      }}
    </MeComponent>
  </Layout>
);

export default DropPage;
