export default async function openFileSelect({
  multiple,
  required,
  accept,
}: {
  multiple?: boolean;
  required?: boolean;
  accept?: string;
}): Promise<File[]> {
  return new Promise((resolve, reject) => {
    try {
      const fileInputEl = document.createElement("input");
      fileInputEl.type = "file";
      fileInputEl.required = !!required;
      if (accept) fileInputEl.accept = accept;

      if (multiple) {
        fileInputEl.multiple = true;
      }

      fileInputEl.onchange = (e: any) => {
        resolve(Array.from(e.target.files));
      };

      fileInputEl.click();
    } catch (e) {
      reject(e);
    }
  });
}
