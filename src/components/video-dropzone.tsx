import { XIcon } from "lucide-react";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UseFormSetValue } from "react-hook-form";

interface Props {
  setFormValue: UseFormSetValue<any>;
  error: any;
}

const VideoDropzone: FC<Props> = ({ setFormValue, error }) => {
  const [files, setFiles] = useState<any[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/*": [],
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const removeFile = (file: any) => {
    setFiles(files.filter((f) => f.name !== file.name));
  };

  const thumbs = files.map((file) => (
    <div
      key={file.name}
      className="relative w-[200px] aspect-video border rounded-md shadow-md"
    >
      <video
        src={file.preview}
        controls
        className="object-cover rounded-md w-full h-full"
        onLoadStart={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
      <button
        type="button"
        className="absolute -top-[6px] -right-[6px] text-white w-5 h-5 rounded-full bg-red-600 grid place-items-center"
        onClick={() => removeFile(file)}
      >
        <XIcon className="w-3 h-3" />
      </button>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
    setFormValue("videos", files);
  }, [files, setFormValue]);

  return (
    <section>
      <div
        {...getRootProps({ className: "dropzone" })}
        className="border border-dashed bg-[#F5F5F5] aspect-[3] p-6 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-[#FAFAFA] transition"
      >
        <input {...getInputProps()} />
        <Image
          src="/images/upload-images.png"
          width={100}
          height={100}
          alt="Upload image icon"
        />
        <p className="font-bold mt-4">Kéo thả video vào đây</p>
        <p className="text-xs text-muted-foreground">
          Có thể lựa chọn nhiều video cùng lúc
        </p>
      </div>
      {error && (
        <p className="text-xs text-red-600 font-medium mt-2">{error.message}</p>
      )}

      <aside className="flex flex-wrap gap-4 mt-4">{thumbs}</aside>
    </section>
  );
};

export default VideoDropzone;
