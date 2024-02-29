import { FC, useEffect, useState } from "react";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import Modal from 'react-modal';

// Utils
import { VideoToFrames } from "@/utils/videoToFrames.util";

// Models
import { IAttachment } from "@/models/message.model";

// Utils
import Icon from "@/utils/icons.util";

interface IVideoAttachmentsProps {
  attachments: IAttachment[];
}

const VideoAttachments: FC<IVideoAttachmentsProps> = ({ attachments }) => {
  const [thumbs, setThumbs] = useState<string[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<any>();

  const getThumbs = async () => {
    const videoToFrames = attachments.map(async (attachment: IAttachment) => {
      const frames = await VideoToFrames.getFrames(attachment.filePath, 1);
      return frames[0];
    });

    await Promise.all(videoToFrames).then((frames) => {
      setThumbs(frames);
    });
  };

  useEffect(() => {
    getThumbs();
  }, []);

  return (
    <div
      className={`grid gap-2 mt-1 ${
        attachments.length === 2 ? "grid-cols-2" : "grid-cols-1"
      }`}
    >
      {thumbs.map((thumb: string, i: number) => (
        <div
          className="bg-black relative cursor-pointer rounded-xl"
          onClick={() => {
            setCurrentVideo({ ...attachments[i], thumb: thumbs[i] });
            setOpen(true);
          }}
          key={attachments[i].filePath}
        >
          <img
            src={thumb}
            alt={attachments[i].fileName}
            className="object-cover opacity-60 rounded-xl"
          />

          <Icon
            name="Play"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            size={40}
          />
        </div>
      ))}

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
        contentLabel={currentVideo?.fileName}
        className="lg:w-[1000px] m-auto mt-20"
      >
        <Player
          playsInline
          poster={currentVideo?.thumb}
          src={currentVideo?.filePath}
        />
      </Modal>
    </div>
  );
};

export default VideoAttachments;
