import { FC } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

// Models
import { IAttachment } from "@/models/message.model";

interface IImageAttachmentsProps {
  attachments: IAttachment[];
}

const ImageAttachments: FC<IImageAttachmentsProps> = ({ attachments }) => {
  return (
    <div
      className={`grid gap-2 mt-1 ${
        attachments.length >= 3
          ? "grid-cols-3"
          : attachments.length === 2
          ? "grid-cols-2"
          : "grid-cols-1"
      }`}
    >
      {attachments.map((attachment: IAttachment) => (
        <Zoom key={attachment._id}>
          <img
            key={attachment.fileName}
            src={attachment.filePath}
            alt={attachment.fileName}
            loading="lazy"
            className="w-full aspect-square object-cover rounded-md bg-[rgba(0,0,0,0.1)]"
          />
        </Zoom>
      ))}
    </div>
  );
};

export default ImageAttachments;
