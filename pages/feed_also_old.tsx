import Layout from "../components/Layout";
import { GetThoseIFollowAndTheirPostsResolverComponent } from "../generated/apolloComponents";
import { Flex, Heading, Text, Image, Box, Card } from "rebass";

const Feed = () => (
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
            {data.getThoseIFollowAndTheirPostsResolver.am_follower.map(
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

export default Feed;
