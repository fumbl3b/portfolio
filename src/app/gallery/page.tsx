"use client"

import { useState } from "react";
import Image from "next/image";

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const images = [
        "/images/DSCF4942.jpg",
        "/images/DSCF5050.jpg",
        "/images/DSCF5317.jpg",
        "/images/DSCF4942.jpg",
        "/images/DSCF5050.jpg",
        "/images/DSCF5317.jpg",
        "/images/DSCF4942.jpg",
        "/images/DSCF5050.jpg",
        "/images/DSCF5317.jpg",
    ];
    
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Gallery</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className="relative w-full h-64 cursor-pointer"
                        onClick={() => setSelectedImage(img)}
                    >
                        <Image
                            src={img}
                            alt={`Photo ${idx + 1}`}
                            fill
                            className="object-cover rounded-lg"
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,..."
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"    
                        />
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative w-full max-w-3xl h-auto p-4">
                        <Image
                            src={selectedImage}
                            alt="Expanded view"
                            width={1200}
                            height={800}
                            className="object-contain mx-auto"
                        />
                    </div>
                </div>
            )}
        </div>
    )

}