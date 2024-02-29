import { FC, ReactElement } from "react";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";

// Store
import { useAppSelector } from "@/store/hooks";

// Models
import { IMessage } from "@/models/message.model";

// Utils
import Icon from "@/utils/icons.util";

// Components
import ImageAttachments from "./components/ImageAttachments";
import AudioAttachments from "./components/AudioAttachments";
import VideoAttachments from "./components/VideoAttachments";

interface IMessageProps {
  message: IMessage;
}

const Message: FC<IMessageProps> = ({ message }) => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.app);
  const firstLetters = message.senderId.name
    ?.split(" ")
    .map((word: string) => word[0])
    .join("");

  const messageTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const attachmentType = message.attachments[0]?.fileType;

  const AttachmentTypeComponents: {
    [key: string]: ReactElement;
  } = {
    audio: <AudioAttachments attachments={message.attachments} />,
    image: <ImageAttachments attachments={message.attachments} />,
    video: <VideoAttachments attachments={message.attachments} />,
  };

  return (
    <div
      className={`px-5 w-[90%] date ${
        message.senderId._id === user?._id && "self-end"
      }`}
      data-tooltip-id={message._id}
    >
      <Tooltip
        place="bottom"
        id={message._id}
        content={new Date(message.createdAt).toLocaleString()}
      />
      <div className="flex items-center justify-between">
        <span className="text-paragraph text-body-sm font-medium flex items-center gap-1">
          {message.senderId._id === user?._id ? (
            t("ME")
          ) : (
            <>
              {message.senderId.profilePicture ? (
                <img
                  src={message.senderId.profilePicture}
                  alt="profile"
                  className="w-6 h-6 rounded-full object-cover border border-[#83899F] border-opacity-30"
                />
              ) : (
                <div className="bg-[#70825E] w-6 h-6 text-white text-body-xs rounded-full flex justify-center items-center">
                  {firstLetters}
                </div>
              )}
              <span className="overflow-hidden text-ellipsis">
                {message.senderId.name}
              </span>
            </>
          )}
        </span>

        <span className="text-secondary-300 text-body-xs font-normal flex items-center gap-1 whitespace-nowrap">
          <Icon name="Clock" size={12} /> {messageTime}
        </span>
      </div>
      <div
        className={`${
          message.senderId._id === user?._id
            ? "bg-primary-600 text-white rounded-e-none rounded-s-xl"
            : "bg-white border-[#83899F] border border-opacity-30 rounded-s-none rounded-e-xl"
        } mt-2 py-2 px-3 rounded-bl-xl rounded-br-xl text-body-sm font-normal whitespace-break-spaces`}
      >
        {message.message}

        {message.attachments.length
          ? AttachmentTypeComponents[attachmentType]
          : null}
      </div>
    </div>
  );
};

export default Message;
