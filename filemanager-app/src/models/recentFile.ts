import { model, models, Schema } from "mongoose";
import { IFile } from "../../next-env";

const RecentFileSchema = new Schema<IFile>(
  {
    filename: String,
    extension: String,
    path: String,
    size: String,
    uploader: String,
    idCategory: String,
    bgColor: String,
    color: String,
    type: String,
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
      },
    },
  }
);

const RecentFile = models.RecentFile || model("RecentFile", RecentFileSchema);
export default RecentFile;
