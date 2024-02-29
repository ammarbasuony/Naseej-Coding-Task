import { KeyboardEvent, useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

// Store
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addMessage } from "@/store/slices/chat.slice";

// Utils
import Icon from "@/utils/icons.util";
import { IAttachment } from "@/models/message.model";

const TypeMessage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.app);
  const { t } = useTranslation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[] | null>(null);
  const [message, setMessage] = useState("");
  const [filesType, setFilesType] = useState("");
  const [showFileTypes, setShowFileTypes] = useState(false);

  const isMessageEmpty = !files?.length && !message;

  const sendMessage = async () => {
    if (!message) return;

    if (user)
      dispatch(
        addMessage({
          _id: new Date().getTime().toString(),
          senderId: user,
          message,
          attachments: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );

    setMessage("");
  };

  const sendMessageWithFiles = async () => {
    if (files) {
      if (user)
        dispatch(
          addMessage({
            _id: new Date().getTime().toString(),
            senderId: user,
            message,
            attachments: files.map((file) => ({
              _id: new Date().getTime().toString(),
              fileName: file.name,
              fileType: file.type.split("/")[0],
              filePath: URL.createObjectURL(file),
              uploadedAt: new Date().toISOString(),
            })) as IAttachment[],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        );

      setFiles(null);
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // If the user has pressed the enter key without the shift key
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      if (message)
        if (files?.length) sendMessageWithFiles();
        else sendMessage();
    }
  };

  const handleFilesSelection = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFiles(Array.from(e.target.files));
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("click", () => setShowFileTypes(false));
  }, []);

  useEffect(() => {
    if (filesType) {
      fileInputRef.current?.click();
      setFilesType("");
    }
  }, [filesType]);

  return (
    <div className="bg-white px-5 py-3 border-t border-[#E7E7E9]">
      <textarea
        className="bg-[#FAFBFD] px-3 py-2 rounded-xl border border-[#E7E7E9] focus:border-primary-700 resize-none w-full text-body-sm font-normal outline-none"
        placeholder={`${t("TYPE_MESSAGE")}...`}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onKeyDown={handleKeyDown}
      />

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-3 relative">
          {showFileTypes && (
            <div
              className="bg-white shadow rounded-lg p-2 flex flex-col gap-1 absolute w-[100px] h-auto bottom-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="flex text-body-xs gap-1 p-1 rounded text-primary-600 hover:bg-primary-100 cursor-pointer"
                onClick={() => {
                  setFilesType("image/*");
                }}
              >
                <Icon size={20} name="Image" />
                Photos
              </div>
              <div
                className="flex text-body-xs gap-1 p-1 rounded text-green-600 hover:bg-green-50 cursor-pointer"
                onClick={() => {
                  setFilesType("audio/*");
                }}
              >
                <Icon size={20} name="FileAudio2" />
                Audio
              </div>
              <div
                className="flex text-body-xs gap-1 p-1 rounded text-orange-600 hover:bg-orange-50 cursor-pointer"
                onClick={() => {
                  setFilesType("video/*");
                }}
              >
                <Icon size={20} name="FileVideo2" />
                Video
              </div>
            </div>
          )}

          <Icon
            size={20}
            name="Paperclip"
            className="text-secondary-300 cursor-pointer hover:text-secondary-400"
            onClick={(e) => {
              e.stopPropagation();
              setShowFileTypes(!showFileTypes);
            }}
          />

          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFilesSelection}
            accept={filesType}
            multiple
          />

          {files?.length ? (
            <div className="text-paragraph text-body-xs bg-[#f3f3f3] py-1 px-2 rounded-2xl">
              {files.length} file{files.length > 1 ? "s" : ""}
            </div>
          ) : null}
        </div>

        <button
          className="bg-primary-700 hover:bg-primary-hover px-4 py-2 rounded-3xl disabled:bg-opacity-50 disabled:cursor-not-allowed"
          onClick={files?.length ? sendMessageWithFiles : sendMessage}
          disabled={isMessageEmpty}
        >
          <Icon size={18} name="SendHorizontal" className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default TypeMessage;
