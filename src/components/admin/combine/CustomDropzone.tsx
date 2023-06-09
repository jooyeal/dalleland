import useCustomToast from "@/hooks/useCustomToast";
import { Text } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";

type Props = {
  onFileAccepted: <T extends File>(files: T[]) => void;
};

const CustomDropzone: React.FC<Props> = ({ onFileAccepted }) => {
  const toast = useCustomToast();
  const onDrop = useCallback(
    <T extends File>(
      acceptedFiles: T[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      /** when accepted not acceptable files */
      if (fileRejections.length > 0) {
        toast({
          status: "error",
          title: "The file must be a image file and less than 5MB sizes",
        });
      } else {
        onFileAccepted(acceptedFiles);
      }
    },
    [onFileAccepted, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
    maxSize: 5242880,
  });

  return (
    <div
      {...getRootProps()}
      className={`h-40 flex flex-col justify-center items-center border border-dashed cursor-pointer hover:bg-zinc-100 ${
        isDragActive ? "bg-zinc-100" : ""
      } `}
    >
      <input {...getInputProps()} />
      {/* テスト */}
      <Text className="text-xl font-semibold">
        Drag and drop some files here, or click to select files
      </Text>
      <Text className="text-xs">
        The file must be a image file and less than 5MB sizes
      </Text>
    </div>
  );
};

export default CustomDropzone;
