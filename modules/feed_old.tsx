import { NextFunctionComponent } from "next";
import { Card, Flex, Heading, Text, Image, Box } from "rebass";

import Layout from "../components/Layout";
// import List from "../components/List";
import { GetThoseIFollowAndTheirPostsResolverComponent } from "../generated/apolloComponents";

// import IDataObject from "../interfaces";

// type Props = {
//   items: IDataObject[];
// };

type Post = {
  id: string;
  title: string;
  text: string;
  images: string[];
};

const ListFunction: NextFunctionComponent = () => (
  <Layout title="List Example (with Function Components) | Next.js + TypeScript Example">
    {/* <List items={items} /> */}

    <GetThoseIFollowAndTheirPostsResolverComponent>
      <Heading as="h1">My Feed</Heading>
      {({ data, loading, error }) => {
        if (!data || !data.getThoseIFollowAndTheirPostsResolver) {
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
            {data.getThoseIFollowAndTheirPostsResolver.followers.map(
              peopleIFollow => {
                return peopleIFollow.posts.map(
                  ({ title, text, images }, index) => {
                    return (
                      <Card
                        key={index}
                        mx={[3, 3, 3]}
                        borderRadius="15px"
                        width={[1, "700px", "700px"]}
                        border="lime"
                        style={{ overflow: "hidden" }}
                      >
                        <Image
                          width={[1, "700px", "700px"]}
                          src={`http://192.168.1.8:4000/temp/${images[0].uri}`}
                        />
                        <Box p={[3, 3, 3]}>
                          <Heading>{title}</Heading>
                          {peopleIFollow.firstName}
                          <Text>{text}</Text>
                        </Box>
                      </Card>
                    );
                  }
                );
              }
            )}
          </Flex>
        );
      }}
    </GetThoseIFollowAndTheirPostsResolverComponent>
  </Layout>
);

// ListFunction.getInitialProps = async ({ pathname }: NextContext) => {
//   // Example for including initial props in a Next.js function compnent page.
//   // Don't forget to include the respective types for any props passed into
//   // the component.
//   //   const dataArray: IDataObject[] = [
//   //     { id: 101, name: "larry" },
//   //     { id: 102, name: "sam" },
//   //     { id: 103, name: "jill" },
//   //     { id: 104, name: pathname }
//   //   ];
//   //   return { items: dataArray };
//   return pathname;
// };

export default ListFunction;
