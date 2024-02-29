import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

// Lang
import i18n from "@/lang";

// Data
import chatMessages from "@/data/chat-messages.json";

// Store
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/app.slice";
import { setMessages } from "@/store/slices/chat.slice";

// Assets
import Logo from "@/assets/media/webp/Logo.webp";

// Models
import { IMessage } from "@/models/message.model";
import ChatBox from "@/components/ChatBox";

const App = () => {
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state) => state.chat);

  const [chatOpened, setChatOpened] = useState(false);
  const [lang, setLang] = useState<"ar" | "en">(localStorage.getItem("naseej-lang") as "ar" | "en") || "en";

  const changeLang = (lang: "ar" | "en") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("naseej-lang", lang);
    setLang(lang);
  };

  useEffect(() => {
    const loggedInUser = {
      _id: "60f3b3e3e6e6f3e3e6e6f3e3",
      name: "Ammar Yaser",
      profilePicture:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    };

    dispatch(setUser(loggedInUser));
    dispatch(setMessages(([...chatMessages] as IMessage[]).reverse()));
  }, []);

  return (
    <div className={`relative h-screen w-screen ${lang === "en" ? "dir-ltr" : "dir-rtl"}`}>
      <div>
        <img
          src={Logo}
          alt="Naseej"
          className="max-h-20 max-w-full mx-auto mt-6 p-8 box-content"
        />

        <div className="bg-gray-200 p-1 rounded-lg w-[200px] mx-auto grid grid-cols-2 dir-ltr">
          <div
            className={`text-gray-500 px-3 py-2 rounded-md text-center cursor-pointer ${
              lang === "ar" && "bg-white"
            }`}
            onClick={() => changeLang("ar")}
          >
            العربية
          </div>
          <div
            className={`text-gray-500 px-3 py-2 rounded-md text-center cursor-pointer ${
              lang === "en" && "bg-white"
            }`}
            onClick={() => changeLang("en")}
          >
            English
          </div>
        </div>
      </div>

      <div className="fixed sm:bottom-20 bottom-0 sm:end-14 end-0 sm:w-auto sm:h-auto w-screen h-screen">
        {chatOpened && (
          <>
            <div
              className="sm:w-20 sm:hidden w-10 sm:h-20 h-10 rounded-full bg-blue-500 active:bg-blue-800 hover:bg-blue-600 flex items-center justify-center cursor-pointer shadow absolute z-20 top-2 end-2"
              onClick={() => setChatOpened(!chatOpened)}
            >
              {chatOpened ? (
                <X size={30} className="text-white" />
              ) : (
                <MessageCircle size={30} className="text-white" />
              )}
            </div>
            <div className="absolute sm:w-[340px] w-screen sm:h-[700px] h-screen sm:bottom-28 bottom-0 end-0">
              <ChatBox chat={messages} />
            </div>
          </>
        )}

        <div
          className="w-20 h-20 rounded-full bg-blue-500 active:bg-blue-800 hover:bg-blue-600 flex items-center justify-center cursor-pointer shadow sm:relative absolute bottom-20 sm:bottom-0 end-14 sm:end-0 -z-10"
          onClick={() => setChatOpened(!chatOpened)}
        >
          {chatOpened ? (
            <X size={37} className="text-white" />
          ) : (
            <MessageCircle size={37} className="text-white" />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
