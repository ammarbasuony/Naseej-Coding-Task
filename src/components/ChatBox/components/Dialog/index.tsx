import React, { FC } from "react";

// Components
import Message from "../Message";

// Models
import { IMessage } from "@/models/message.model";

interface IDialog {
  chat: IMessage[];
}

const Dialog: FC<IDialog> = ({ chat }) => {
  return (
    <div className="h-[calc(100%-195px)] flex items-end">
      <div className="flex flex-col-reverse gap-5 w-full py-5 h-full overflow-auto">
        {chat.map((message: IMessage) => (
          <React.Fragment key={message._id}>
            <Message message={message} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Dialog;
