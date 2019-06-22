import FileList from "../modules/upload/file-list-create-post";
import Layout from "./../components/Layout";
import { MeComponent } from "../generated/apolloComponents";
import { Flex, Heading, Text } from "rebass";

const CarsPage = () => (
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
          <>
            {JSON.stringify(data)}
            <FileList me={data.me.id} />
          </>
        );
      }}
    </MeComponent>
  </Layout>
);

export default CarsPage;
