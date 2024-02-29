export interface ISendMessage {
  senderId: {
    _id: string;
    name: string;
    profilePicture: string | null;
  };
  message: string;
  attachments: File[];
}

export interface IAttachment {
  fileName: string;
  filePath: string;
  fileType: "audio" | "image" | "video";
  uploadedAt: string;
  _id: string;
}

export interface IMessage extends Omit<ISendMessage, "attachments"> {
  _id: string;
  attachments: IAttachment[];
  createdAt: string;
  updatedAt: string;
}
