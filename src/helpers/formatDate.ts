import { format } from "date-fns";

export default function formatDate(timestamp: any, formatStr = "MMM do, yyyy") {
  if (!timestamp) {
    return false;
  }

  try {
    return format(
      typeof timestamp === "string"
        ? new Date(Date.parse(timestamp))
        : typeof timestamp === "object"
        ? timestamp?.toDate
          ? timestamp.toDate()
          : timestamp
        : parseInt(timestamp),
      formatStr
    );
  } catch (e) {
    console.warn("Error formatting date", e);
  }

  return timestamp;
}
