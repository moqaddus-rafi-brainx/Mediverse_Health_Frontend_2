//import { IMAGES_ASSESTS_PATH, NOTIFICATIONS_TYPES } from "../shared/constants";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import JSZip from "jszip";
import FileSaver, { saveAs } from "file-saver";

export const dataURLtoFile = (dataUrl, fileName) => {
  let arr = dataUrl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};

export const isCorrectImageRatio = (file, success, fail) => {
  let image = new Image();
  image.src = window.URL.createObjectURL(file);
  image.onload = function () {
    const w = this.width;
    const h = this.height;
    if (
      Math.ceil(h / w) === 2 ||
      Math.ceil(h / w) === 3 ||
      Math.floor(h / w) === 2 ||
      Math.floor(h / w) === 2
    ) {
      success();
      return;
    }
    fail();
    return;
  };
};

export const isValidURL = (string) => {
  let res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
};

// service for file

export const getErrorMessageFromAxios = (axiosObject) => {
  return axiosObject?.response?.data?.error
    ? axiosObject?.response?.data?.error
    : "Something went wrong";
};

export const getAccessToken = () => {
  const user = localStorage.getItem("user");
  return user.access_token || "";
};

export const getRefreshTOken = () => {
  const user = localStorage.getItem("user");
  return user.refresh_token || "";
};

export const getFilePreview = async (file, local = true) => {
  const url = file.url || file.name;
  const parts = url.split(".");
  const ext = parts[parts.length - 1].toLowerCase();
  switch (ext) {
    case "pdf":
      return local
        ? {
            preview: `${"v"}/PDF.svg`,
            size: file.size,
            type: file.type,
            name: file.name,
            ext,
            previewed: false,
            data: await getBase64(file),
          }
        : `${"v"}/PDF.svg`;

    case "jpg":
    case "jpeg":
    case "png":
      return local
        ? {
            preview: await getBase64(file),
            size: file.size,
            type: file.type,
            name: file.name,
            ext,
            previewed: true,
          }
        : file.url;

    case "doc":
    case "docx":
      return local
        ? {
            preview: `${"v"}/DOCX.svg`,
            size: file.size,
            type: file.type,
            name: file.name,
            ext,
            previewed: false,
            data: await getBase64(file),
          }
        : `${"v"}/DOCX.svg`;

    case "xls":
    case "xlsx":
      return local
        ? {
            preview: `${"v"}/pdf.svg`,
            size: file.size,
            type: file.type,
            name: file.name,
            ext,
            previewed: false,
            data: await getBase64(file),
          }
        : `${"v"}/pdf.svg`;

    default:
      return local
        ? {
            preview: await getBase64(file),
            size: file.size,
            type: file.type,
            name: file.name,
            ext,
            previewed: true,
          }
        : file.url;
  }
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("Error reading file."));
    };

    reader.readAsDataURL(file);
  });
};

export const base64ToBlob = (base64Data) => {
  const contentType = base64Data.substring(base64Data.indexOf(":") + 1, base64Data.indexOf(";"));
  const byteCharacters = atob(base64Data.substring(base64Data.indexOf(",") + 1));
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: contentType });
};

export const getTimeDiff = (time) => {
  let unit = "minute";
  let diff = moment().diff(moment(time), "minutes");
  if (diff >= 60 && unit === "minute") {
    unit = "hour";
    diff = moment().diff(moment(time), "hours");
  }
  if (diff >= 24 && unit === "hour") {
    unit = "day";
    diff = moment().diff(moment(time), "days");
  }
  return diff + " " + unit + "(s)";
};

export const generateFileName = (path, name, ext) => {
  return path + name + uuidv4() + "." + ext;
};

export const getFileNameFromURL = (url) => {
  const paths = url.split("/");
  const name = paths[paths.length - 1].split(".");
  const file = name[name.length - 2] || "";
  if (file.length > 10) {
    return file.substr(0, 10) + "...";
  }
  return file;
};

export const bytesToSize = (bytes) => {
  const kbs = bytes / 8 / 1024;
  return kbs < 1024 ? Math.round(kbs) + " KB" : Math.round(kbs / 1024) + " MB";
};

export const downloadFiles = async (fileUrls, zip = false) => {
  if (zip) {
    const zip = new JSZip();
    const promises = fileUrls.map(async (fileUrl, index) => {
      const response = await fetch(fileUrl);
      const fileData = await response.blob();
      const paths = fileUrl.split("/");
      const fileName = paths[paths.length - 1];
      zip.file(fileName, fileData);
    });

    await Promise.all(promises);
    const zipFile = await zip.generateAsync({ type: "blob" });
    FileSaver.saveAs(zipFile, "files.zip");
  } else {
    const fileUrl = fileUrls[0];
    const paths = fileUrl.split("/");
    const fileName = paths[paths.length - 1];
    const response = await fetch(fileUrl);
    const fileData = await response.blob();
    saveAs(fileData, fileName);
  }
};

// download files from url of tender attachements files
export const handleDownload = async (quote, setSpinner) => {
  setSpinner(true);
  const urls = quote?.attachments?.map((attachment) => attachment.url);
  await downloadFiles(urls, true);
  setSpinner(false);
};

export const generateUniqueId = () => uuidv4();

export const getTenderID = (id) => {
  return id ? id.substr(id.length - 6, id.length - 1) : "";
};

export const getDayOrDate = (date) => {
  const TODAY = moment().startOf("day");
  const YESTERDAY = moment().subtract(1, "days").startOf("day");

  if (moment(date).isSame(TODAY, "d")) {
    return "Today";
  } else if (moment(date).isSame(YESTERDAY, "d")) {
    return "Today";
  } else {
    return moment(date).format("DD-MM-YYYY");
  }
};

export const getSubString = (str) => {
  if (!str) {
    return "";
  }
  if (str.length > 12) {
    return str.substr(0, 12) + "...";
  }
  return str;
};

export const getUploadedFilesPreview = (files) => {
  return files.map((file) => {
    const url = file.url;
    const parts = url.split(".");
    const ext = parts[parts.length - 1].toLowerCase();
    switch (ext) {
      case "pdf":
        return { preview: `${"v"}/PDF.svg` };

      case "jpg":
      case "jpeg":
      case "png":
        return { preview: file.url };

      case "doc":
      case "docx":
        return { preview: `${"v"}/DOCX.svg` };

      case "xls":
      case "xlsx":
        return { preview: `${"v"}/pdf.svg` };

      default:
        return { preview: file.url };
    }
  });
};

export const isSameDay = (date1, date2) => {
  return moment(date1).isSame(moment(date2), "day");
};

export const getNotificationImg = (type, data) => {
  // switch (type) {
  //   case NOTIFICATIONS_TYPES.mark_disputed:
  //   case NOTIFICATIONS_TYPES.funds_transferred:
  //     return data?.profileUrl || `${"v"}/Profle-Image.svg`;

  //   default:
  //     return `${"v"}/Profle-Image.svg`;
  // }
};

export const getNotifiNavigate = (type, data) => {
  // switch (type) {
  //   case NOTIFICATIONS_TYPES.mark_disputed:
  //   case NOTIFICATIONS_TYPES.funds_transferred:
  //     return `/admin/listing/${data?.tenderId}`;

  //   default:
  //     return "";
  // }
};

export const isDatePassed = (targetDate) => {
  const target = moment(targetDate);
  const current = moment();

  return target.isBefore(current);
};

export const lastDateOfWeek = () => {
  const today = new Date();
  const lastDayOfPreviousWeek = new Date(today);
  lastDayOfPreviousWeek.setDate(today.getDate() - ((today.getDay() + 7) % 7));
  return lastDayOfPreviousWeek;
};

export const currentDate = () => {
  const today = new Date();
  return today;
};

export const minutesToHours = (minutes) => {
  if (typeof minutes !== "number" || isNaN(minutes)) {
    minutes = 0;
  }
  const minute = parseInt(minutes) % 60;
  let hours = parseInt(minutes) / 60;
  return `${Math.floor(hours)}h ${minute}m`;
};

export function formatTimeFromDateString(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export const weekFormat = (week) => {
  const weekString = week;

  const weekNumberRegex = /Week (\d+)/;

  const match = weekNumberRegex.exec(weekString);

  const weekStringMatch = match ? match[0] : null;
  return weekStringMatch;
};

export const formatTimeDifference = (dateString) => {
  const currentDate = new Date();
  const inputDate = new Date(dateString);

  const timeDifference = currentDate - inputDate;

  // Calculate seconds, minutes, hours, and days
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else {
    return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
  }
};

export const downloadFile = async (fileUrl) => {
  const paths = fileUrl.split("/");
  const fileName = paths[paths.length - 1];
  const response = await fetch(fileUrl);
  const fileData = await response.blob();
  saveAs(fileData, fileName);
};

export const isPdf = (url) => {
  const fileExtension = url?.split(".").pop();
  const isPDF = fileExtension.toLowerCase() === "pdf";
  return isPDF ? true : false;
};

export const getYears = () => {
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  return years;
};

export const downloadImage = (base64Data, fileName) => {
  const byteCharacters = atob(base64Data.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/jpeg" }); // Adjust the type accordingly
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
