export const downloadFile = ({blob, filename}: { blob: Blob; filename: string; }) =>
{
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    try {
        document.body.appendChild(a);
        a.click();
    } finally {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};