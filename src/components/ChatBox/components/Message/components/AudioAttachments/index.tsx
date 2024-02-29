import { FC } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

// Models
import { IAttachment } from "@/models/message.model";

interface IAudioAttachmentsProps {
  attachments: IAttachment[];
}

const AudioAttachments: FC<IAudioAttachmentsProps> = ({ attachments }) => {
  return (
    <div className="flex flex-col gap-3">
      {attachments.map((attachment: IAttachment) => (
        <AudioPlayer
          key={attachment.filePath}
          className="rounded-lg p-2 bg-primary-hover"
          src={attachment.filePath}
          showFilledVolume={false}
          showJumpControls={false}
          layout="horizontal-reverse"
          customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
        />
      ))}
    </div>
  );
};

export default AudioAttachments;
