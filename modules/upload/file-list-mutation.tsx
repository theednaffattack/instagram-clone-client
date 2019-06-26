import { CreatePostComponent } from "../../generated/apolloComponents";
import FileListBase from "./file-list-create-post";

interface IFileListMutation {
  me: string;
}

const CreatePostMutation = ({ me }: IFileListMutation) => {
  return (
    <CreatePostComponent>
      {createPost => <FileListBase me={me} mutate={createPost} />}
    </CreatePostComponent>
  );
};

export default CreatePostMutation;
