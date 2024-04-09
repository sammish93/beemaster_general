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
    const directoryUri = FileSystem.documentDirectory;
    const fileUri = directoryUri + props.fileName;

    await FileSystem.writeAsStringAsync(fileUri, props.jsonString);

    await Sharing.shareAsync(fileUri, {
      UTI: ".json",
      mimeType: "application/json",
    });
  };

  return (
    <Button icon="download" mode="contained" onPress={downloadJson}>
      {userViewModel.i18n.t("download hive data")}
    </Button>
  );
};

export default FileDownloader;
