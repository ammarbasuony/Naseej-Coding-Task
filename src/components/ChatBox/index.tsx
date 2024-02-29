import { CSSProperties, FC } from "react";
import { useTranslation } from "react-i18next";

// Utils
import Icon from "@/utils/icons.util";

// Components
import Dialog from "./components/Dialog";
import TypeMessage from "./components/TypeMessage";

// Models
import { IMessage } from "@/models/message.model";

interface IChatBoxProps {
  style?: CSSProperties;
  chat: IMessage[];
}

const ChatBox: FC<IChatBoxProps> = ({ style, chat }) => {
  const { t } = useTranslation();
  return (
    <div
      className="bg-[#F5F6F8] col-span-2 w-full border border-[#E7E7E9] shadow-[0_0_10px_rgba(0,0,0,0.1)] lg:shadow-none lg:bottom-[unset] overflow-hidden z-30 lg:transition-none transition-all ltr h-full"
      style={style}
    >
      {/* Top Bar */}
      <div className="bg-white border-b border-[#E7E7E9] flex items-center gap-1 lg:pointer-events-none pointer-events-auto lg:cursor-auto cursor-pointer">
        <div className="flex items-center gap-2 px-5 py-3">
          <Icon size={24} name="MessagesSquare" className="text-primary-700" />
          <span className="text-paragraph text-body-lg font-medium">
            {t("CHAT")}
          </span>
        </div>
      </div>

      <Dialog chat={chat} />
      <TypeMessage />
    </div>
  );
};

export default ChatBox;
