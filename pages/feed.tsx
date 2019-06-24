import Layout from "../components/Layout";
import { GetThoseIFollowAndTheirPostsResolverComponent } from "../generated/apolloComponents";
import { Flex, Heading, Text, Image, Box, Card } from "rebass";

const Feed = () => (
  <Layout title="List Example (with Function Components) | Next.js + TypeScript Example">
    {/* <List items={items} /> */}
    <Heading as="h1">My Feed</Heading>

    <GetThoseIFollowAndTheirPostsResolverComponent>
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
          <Flex flexWrap="wrap" justifyContent="center">
            {data.getThoseIFollowAndTheirPostsResolver.am_follower.map(
              peopleIFollow => {
                return peopleIFollow.posts.map(
                  ({ title, text, images }, index) => {
                    return (
                      <Card
                        key={index}
                        my={[3, 3, 3]}
                        mx={[3, 3, 3]}
                        borderRadius="15px"
                        width={[0.43, "350px", "350px"]}
                        // border="lime"
                        boxShadow="0 0 16px rgba(0, 0, 0, .25)"
                        style={{ overflow: "hidden" }}
                      >
                        <Image
                          width={[1, "350px", "350px"]}
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
