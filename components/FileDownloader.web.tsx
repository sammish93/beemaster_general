import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import { Button } from "react-native-paper";

interface FileDownloaderProps {
  jsonString: string;
  fileName: string;
}

const FileDownloader = (props: FileDownloaderProps) => {
  const { userViewModel } = useContext(MobXProviderContext);

  const downloadJson = async () => {
    const blob = new Blob([props.jsonString], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = props.fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button icon="download" mode="contained" onPress={downloadJson}>
      {userViewModel.i18n.t("download hive data")}
    </Button>
  );
};

export default FileDownloader;
