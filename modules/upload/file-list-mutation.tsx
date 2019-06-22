import { CreatePostComponent } from "../../generated/apolloComponents";
import FileListBase from "./file-list-create-post";

interface IFileListMutation {
  me: string;
}

const FileListMutation = ({ me }: IFileListMutation) => {
  return (
    <CreatePostComponent>
      {createPost => <FileListBase me={me} mutate={createPost} />}
    </CreatePostComponent>
  );
};

export default FileListMutation;
