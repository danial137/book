"use client";

import { IKImage, IKUpload, IKVideo, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const {
    env: {
        imagekit: { publicKey, urlEndpoint },
    },
} = config;

const authenticator = async () => {
    try {
        const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { token, expire, signature };
    } catch (error: any) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

interface Props {
    type: "image" | "video";
    accept: string;
    placeholder: string;
    folder: string;
    variant: "dark" | "light";
    onFileChange: (filePath: string) => void;
    value?: string;
}

const FileUpload = ({
    type,
    accept,
    placeholder,
    folder,
    variant,
    onFileChange,
    value,
}: Props) => {
    
    const ikUploadRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<{ filePath: string | null }>({
        filePath: value ?? null,
    });
    const [progress, setProgress] = useState(0);

    const styles = {
        button: variant === "dark" ? "bg-dark-300" : "bg-light-600 border-gray-100 border",
        placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
        text: variant === "dark" ? "text-light-100" : "text-dark-400",
    };

    const onError = (error: any) => {
        console.error(error);
        toast.error(`Failed to upload ${type}`, {
            description: error.message || "An error occurred during upload.",
        });
    };

    const onSuccess = (res: any) => {
        console.log("Upload Success ✅", res);
        setFile(res);
        onFileChange(res.filePath);
        toast.success(`${type} uploaded successfully`, {
            description: `${res.filePath} uploaded successfully!`
        });
    };


    const onValidate = (file: File) => {
        const maxSize = type === "image" ? 20 : 50; // MB
        if (file.size > maxSize * 1024 * 1024) {
            toast.error(`File too large`, {
                description: `Maximum size for ${type}s is ${maxSize}MB.`,
            });
            return false;
        }
        return true;
    };

    return (
        <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
        >
            <IKUpload
                ref={ikUploadRef}
                onError={onError}
                onSuccess={onSuccess}
                useUniqueFileName={true}
                validateFile={onValidate}
                onUploadStart={() => setProgress(0)}
                onUploadProgress={({ loaded, total }) => {
                    const percent = Math.round((loaded / total) * 100);
                    setProgress(percent);
                }}
                folder={folder}
                accept={accept}
                className="hidden"
            />

            <button
                className={cn("upload-btn flex items-center gap-2 rounded-xl px-4 py-2", styles.button)}
                onClick={(e) => {
                    e.preventDefault();
                    if (ikUploadRef.current) {
                        // @ts-ignore
                        ikUploadRef.current.click();
                    }
                }}
            >
                <Image
                    src="/icons/upload.svg"
                    alt="upload-icon"
                    width={20}
                    height={20}
                    className="object-contain"
                />
                <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
                {file?.filePath && (
                    <p className={cn("upload-filename truncate text-sm", styles.text)}>
                        {file.filePath}
                    </p>
                )}
            </button>

            {progress > 0 && progress < 100 && (
                <div className="w-full rounded-full bg-gray-200 mt-2">
                    <div
                        className="bg-green-500 text-xs text-white text-center rounded-full py-1"
                        style={{ width: `${progress}%` }}
                    >
                        {progress}%
                    </div>
                </div>
            )}

            {file?.filePath &&
                (type === "image" ? (
                    <IKImage
                        alt={file.filePath ?? ""}
                        path={file.filePath ?? ""}
                        width={500}
                        height={300}
                        className="rounded-xl mt-4"
                    />
                ) : type === "video" ? (
                    <IKVideo
                        path={file.filePath ?? ""}
                        controls
                        className="h-96 w-full rounded-xl mt-4"
                    />
                ) : null)}
        </ImageKitProvider>
    );
};

export default FileUpload;
