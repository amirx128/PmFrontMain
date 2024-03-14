import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { SupportDownloadFilesAction } from '../../redux/features/supportSlicer';
import EditIcon from '@mui/icons-material/Edit';
interface IUploadFileProps {
  changeHandler?: (e: any) => void;
  multiple?: boolean;
  maxFileUpload?: number;
  defaultValue?: { id: number; fileName: string; isNew: boolean }[];
  removeHandler?: (file: any) => void;
  uploadable?: boolean;
  canDelete?: boolean;
  text?: string;
  hasPreview?: boolean;
  previewUrl?: string;
  onEditFile?: () => void;
  downloadable?: boolean;
}
export default function UploadFIle({
  changeHandler,
  multiple = false,
  maxFileUpload = 10,
  defaultValue = [],
  removeHandler,
  uploadable = true,
  canDelete = true,
  text = 'آپلود فایل',
  hasPreview = false,
  previewUrl = '',
  onEditFile,
  downloadable = true,
}: IUploadFileProps) {
  const dispatch = useDispatch<any>();
  const [files, setFiles] = useState(defaultValue);
  useEffect(() => {
    setFiles(defaultValue);
  }, [defaultValue]);
  const handleUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length + files.length > maxFileUpload) {
      toast.error(`تعداد فایل های آپلودی نباید بیشتر از ${maxFileUpload} باشد`);
      return;
    }

    setFiles((prev) => [
      ...prev,
      ...selectedFiles
        .slice(0, maxFileUpload - files.length)
        .map((file: any) => ({
          fileName: file.name,
          id: files.length,
          isNew: true,
        })),
    ]);
    changeHandler(e);
  };
  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((p) => p.id !== index));
    removeHandler(index);
  };
  const handleDownloadFile = async (file) => {
    if (file.isNew) {
      toast.error('برای دانلود این فایل لازم است ابتدا فرم را ذخیره کنید');
    }
    await dispatch(SupportDownloadFilesAction({ fileId: file.id }));
  };
  const handleDownloadPreviewFile = async () => {
    const link = document.createElement('a');
    link.href = previewUrl;
    link.target = '_blank';
    link.download = previewUrl.split('/')?.at(-1);
    link.click();
  };
  if (hasPreview && previewUrl.length > 0) {
    return (
      <div className="flex">
        <img src={previewUrl} alt="signature" width={200} height={200} />
        <div>
          <div>
            <IconButton
              onClick={handleDownloadPreviewFile}
              className="text-green-500 hover:text-green-700 "
            >
              <ArrowDownwardIcon fontSize="medium" />
            </IconButton>
          </div>
          <div>
            <IconButton
              onClick={onEditFile}
              className="text-green-500 hover:text-green-700 "
            >
              <EditIcon fontSize="medium" />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-4 flex gap-6">
      {uploadable && files.length < maxFileUpload && (
        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
          <svg
            className="w-8 h-8 mb-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM4.72 11l1.06-1.06L10 14.88l4.22-4.94 1.06 1.06L10 16.12 4.72 11z"
            />
          </svg>
          <span className="text-base leading-normal">{text}</span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleUpload(e)}
            multiple={multiple}
          />
        </label>
      )}
      <div>
        {uploadable || <p>فایل های آپلود شده:</p>}
        {files.length > 0 && (
          <div className="mt-4">
            <ul className="flex">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-center bg-gray-100 p-2 mb-2 relative group w-44 cursor-pointer hover:bg-blue-100 transition-all"
                >
                  <div className="flex flex-col items-center gap-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-16 h-16"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>

                    <span className="text-blue-500 mr-2 text-xs text-ellipsis overflow-hidden whitespace-nowrap w-24 ">
                      {file.fileName}
                    </span>
                  </div>
                  {canDelete && (
                    <div className="absolute top-0 right-0 hidden group-hover:block">
                      <IconButton
                        onClick={() => handleRemoveFile(file.id)}
                        className="text-red-500 hover:text-red-700 "
                      >
                        <DeleteIcon fontSize="medium" />
                      </IconButton>
                    </div>
                  )}
                  {downloadable && (
                    <div className="absolute top-0 left-0 hidden group-hover:block">
                      <IconButton
                        onClick={() => handleDownloadFile(file)}
                        className="text-green-500 hover:text-green-700 "
                      >
                        <ArrowDownwardIcon fontSize="medium" />
                      </IconButton>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
