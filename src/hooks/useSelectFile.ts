import React from "react";

// type Props = {}

const useSelectFile = () => {
  const [selectedFile, setSelectedFile] = React.useState("");

  function onSelectImage(e: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  }
  return {
    selectedFile,
    onSelectImage,
    setSelectedFile,
  };
};

export default useSelectFile;
