import React from "react";
import {
  Box as BoxBase,
  Card as CardBase,
  Flex as FlexBase,
  Heading,
  Text,
  Button
} from "rebass";
import styled from "styled-components";
import { borders, display, overflow } from "styled-system";

import { FollowUserComponent } from "../../generated/apolloComponents";

import Layout from "../../components/Layout";
import { GetGobalPostsComponent } from "../../generated/apolloComponents";

const Box = styled(BoxBase)`
  ${borders}
`;

const Flex = styled(FlexBase)`
  ${borders}
`;

const Card = styled(CardBase)`
  ${display}
  ${overflow}
`;

export const DisplayPosts = ({
  data,
  dataFollowUser,
  errorFollowUser,
  followUser,
  loadingFollowUser,
  me
}) => {
  const cards = data.getGobalPosts.map((post, index) => (
    <Card
      key={`${index} - ${data.__typename}`}
      my={[3, 3, 3]}
      mx={[3, 3, 3]}
      borderRadius="15px"
      width={[1, "350px", "350px"]}
      // border="lime"
      boxShadow="0 0 16px rgba(0, 0, 0, .25)"
      display="flex"
      overflow="hidden"
    >
      <Flex width={[1, 1, 1]} flexDirection="column">
        <Box
          width={[1, 1, 1]}
          style={{
            minHeight: "250px",
            maxHeight: "250px",
            overflow: "hidden", // `url(${Background})`
            backgroundImage: `url(http://192.168.1.8:4000/temp/${
              post.images[0].uri
            })`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        >
          {/* <img
              src={`http://192.168.1.8:4000/temp/${post.images[0].uri}`}
              style={{
                maxWidth: "100%",
                minHeight: "100%"
              }}
            /> */}
        </Box>
        <Box p={[3, 3, 3]} pt={[1, 1, 2]}>
          <Flex alignItems="center">
            <Heading mr="auto">{post.title}</Heading>
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              {post.user.firstName}
              <Button
                onClick={() =>
                  followUser({
                    variables: {
                      data: {
                        userIDToFollow: post.user.id
                      }
                    }
                  })
                }
                type="button"
                p={0}
              >
                follow
              </Button>
            </Flex>
          </Flex>
          <Text alignSelf="end">{post.text}</Text>
        </Box>
      </Flex>
    </Card>
  ));

  return cards;
};

interface IFollowButtonProps {}

interface IFollowButtonState {}

// class FollowButton extends React.Component {
//   constructor(props) {
//     super(props);

//     this.handleMutationClick = this.handleMutationClick.bind(this);
//   }
//   handleMutationClick() {
//     console.log("some mutation click");
//   }
//   render() {
//     return (
//       <Button
//         type="button"
//         onClick={() => this.handleMutationClick(followUser)}
//       >
//         something
//         {data ? JSON.stringify(data, null, 2) : ""}
//       </Button>
//     );
//   }
// }

const Feed = ({ me }) => (
  <Layout title="My Feed">
    <GetGobalPostsComponent>
      {({
        data: dataGlblPosts,
        error: errorGlblPosts,
        loading: loadingGlblPosts
      }) => {
        if (errorGlblPosts) return <div>{JSON.stringify(errorGlblPosts)}</div>;
        if (loadingGlblPosts) {
          return <div>LOADING...</div>;
        }
        console.log("data.getGobalPosts");
        console.log(dataGlblPosts ? dataGlblPosts : "nope");
        return (
          <Flex pt={3} width={1} flexDirection="column">
            <Heading as="h3">{me.name}</Heading>
            <Heading as="h3">{me.id}</Heading>
            <Heading>Global Feed</Heading>
            <Flex
              justifyContent="center"
              width={1}
              flexDirection="row"
              flexWrap="wrap"
            >
              <FollowUserComponent>
                {(
                  followUser,
                  {
                    data: dataFollowUser,
                    error: errorFollowUser,
                    loading: loadingFollowUser
                  }
                ) => {
                  return (
                    <DisplayPosts
                      dataFollowUser={dataFollowUser}
                      errorFollowUser={errorFollowUser}
                      loadingFollowUser={loadingFollowUser}
                      followUser={followUser}
                      data={dataGlblPosts}
                      me={me}
                    />
                  );
                }}
              </FollowUserComponent>
            </Flex>
          </Flex>
        );
      }}
    </GetGobalPostsComponent>
  </Layout>
);

export default Feed;
