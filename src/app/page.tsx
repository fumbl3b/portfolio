// src/app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        {/* Profile Image Wrapper */}
        <div className="relative w-48 h-48 mx-auto">
          <Image
            src={"/profile.jpg"}
            alt="Photo of Harry"
            fill
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>

        {/* Name */}
        <h1 className="text-3xl font-bold text-gray-900">Harry Winkler</h1>

        {/* Links */}
        <div className="flex space-x-4 items-center justify-center">
          <a
            href="https://github.com/fumbl3b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            GitHub
          </a>
          <a
            href="mailto:harry@fumblebee.site"
            className="text-blue-600 hover:underline"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/harrywinkler"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
