import {useEffect, useState} from "react";
import {convertBase64} from "@/lib/utils";
import {ImagePlus} from "lucide-react";

interface UploadProps {
    name: string;
    label?: string;
    accept?: string;
    value?: string;
    multiple?: boolean;
    previewHeight?: number;
    onChange?: (value: string, name: string) => void;
}
const UploadImage = ({name,value, accept, label, multiple, onChange, previewHeight}: UploadProps) => {
    const [preview, setPreview] = useState<string >( "");
    debugger;
    const handleFileRead = async (event: any) :Promise<void> => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setPreview(String(base64) || "");
        onChange && onChange( String(base64) || "", name);
    }
    useEffect(() => {
        setPreview(value || "");
    }, []);
    return (
        <div>
            <label >
                <div className="font-normal pointer-events-none text-blue-gray-500 text-sm mb-2">{label ? label : 'Upload Image'}</div>
                <input
                    accept={accept || "*" }
                    className="hidden w-0 h-0 opacity-0"
                    multiple={multiple || false }
                    type="file"
                    onChange={handleFileRead}
                />
                {preview ? <div className={`cursor-pointer inline-block group border ${previewHeight ? "h-["+previewHeight+"px]" : "h-20"} rounded relative`}>
                    <div className="opacity-0 group-hover:opacity-100 absolute bg-gray-100 text-gray-600 py-1 px-3 text-xs rounded-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                    >Update</div>
                        <img src={preview} alt="preview" className="h-full" />
                    </div> :
                    <div className="flex flex-col items-center justify-center px-4 py-6 bg-white rounded-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-gray-100 ">
                        <ImagePlus/>
                    </div>}
            </label>
        </div>)
}

export default UploadImage;