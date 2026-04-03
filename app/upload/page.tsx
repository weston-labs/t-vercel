'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '3421') {
      setUnlocked(true);
    } else {
      setMessage('Incorrect PIN');
      setPin('');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage('Please select a file');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.success) {
        setMessage('File uploaded successfully!');
        setSelectedFile(null);
      } else {
        setMessage(data.error || 'Upload failed');
      }
    } catch (err) {
      setMessage('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] p-8 flex flex-col items-center justify-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-bold mb-8">Secure Upload</h1>
          <form onSubmit={handlePinSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              maxLength={4}
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="px-6 py-4 bg-white border border-[#d2d2d7] rounded-2xl text-center text-2xl font-mono tracking-widest focus:outline-none focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#0071e3] text-white font-medium rounded-full hover:bg-[#0077ed] transition-colors"
            >
              Unlock
            </button>
            {message && (
              <p className="text-[#ff3b30] text-sm">{message}</p>
            )}
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] p-8">
      <nav className="fixed top-0 w-full bg-[rgba(245,245,247,0.8)] backdrop-blur-xl border-b border-[rgba(0,0,0,0.05)] z-50">
        <div className="max-w-980px mx-auto px-5 py-3 flex justify-between items-center">
          <a href="/" className="text-xl font-semibold">Weston Labs</a>
          <div className="flex gap-7 text-xs">
            <a href="#about" className="text-[#1d1d1f] no-underline">About</a>
            <a href="#projects" className="text-[#1d1d1f] no-underline">Projects</a>
            <a href="#contact" className="text-[#1d1d1f] no-underline">Contact</a>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto pt-32">
        <h1 className="text-4xl font-bold mb-4">File Upload</h1>
        <p className="text-[#86868b] mb-8">Drop a file here to share with Weston</p>

        <form onSubmit={handleUpload} className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="border-2 border-dashed border-[#d2d2d7] rounded-2xl p-12 text-center mb-6">
            <input
              type="file"
              id="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <label htmlFor="file" className="cursor-pointer">
              <div className="text-4xl mb-4">📁</div>
              {selectedFile ? (
                <p className="text-[#1d1d1f] font-medium">{selectedFile.name}</p>
              ) : (
                <>
                  <p className="text-[#1d1d1f] font-medium mb-2">Click to select a file</p>
                  <p className="text-[#86868b] text-sm">Images, PDFs, or text files</p>
                </>
              )}
            </label>
          </div>

          <button
            type="submit"
            disabled={!selectedFile || uploading}
            className="w-full px-6 py-4 bg-[#0071e3] text-white font-medium rounded-full hover:bg-[#0077ed] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : 'Upload File'}
          </button>

          {message && (
            <p className={`text-center mt-4 ${message.includes('success') ? 'text-[#34c759]' : 'text-[#ff3b30]'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}