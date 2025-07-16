'use client';

import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, Download, Copy, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useTrainerToolkitStore, QRCode } from '@/lib/store';

interface QRCodeViewClientProps {
  id: string;
}

export default function QRCodeViewClient({ id }: QRCodeViewClientProps) {
  const [qrCode, setQrCode] = useState<QRCode | null>(null);
  const [notFound, setNotFound] = useState(false);
  const { qrCodes } = useTrainerToolkitStore();

  useEffect(() => {
    const found = qrCodes.find(qr => qr.id === id);
    if (found) {
      setQrCode(found);
    } else {
      setNotFound(true);
    }
  }, [id, qrCodes]);

  const handleDownload = () => {
    if (!qrCode) return;
    
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${qrCode.name}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleCopyContent = () => {
    if (!qrCode) return;
    navigator.clipboard.writeText(qrCode.content);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">QR Code Not Found</h1>
          <p className="text-gray-600 mb-6">
            The QR code you&apos;re looking for doesn&apos;t exist or has been deleted.
          </p>
          <Link
            href="/qr"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to QR Generator
          </Link>
        </div>
      </div>
    );
  }

  if (!qrCode) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading QR code...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/qr"
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Back to QR Generator"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{qrCode.name}</h1>
                <p className="text-sm text-gray-500">Shared QR Code</p>
              </div>
            </div>
            <Link
              href="/"
              className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
            >
              TrainerToolkit
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            {/* QR Code Display */}
            <div className="mb-8">
              <div className="inline-block p-4 bg-white border border-gray-200 rounded-lg">
                <QRCodeSVG
                  value={qrCode.content}
                  size={256}
                  level="M"
                  includeMargin={true}
                />
              </div>
            </div>

            {/* QR Code Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{qrCode.name}</h2>
              <p className="text-gray-600 mb-4">
                Type: <span className="font-medium">{qrCode.type.toUpperCase()}</span>
              </p>
              <p className="text-sm text-gray-500">
                Created: {formatDate(qrCode.createdAt)}
              </p>
            </div>

            {/* Content Preview */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Content</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap break-all">
                  {qrCode.content}
                </pre>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PNG
              </button>
              
              <button
                onClick={handleCopyContent}
                className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors shadow-lg hover:shadow-xl"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Content
              </button>
              
              {qrCode.type === 'url' && (
                <a
                  href={qrCode.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open URL
                </a>
              )}
            </div>

            {/* Share Info */}
            <div className="mt-8 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-100">
              <p className="text-sm text-teal-800">
                <strong>Share this QR code:</strong> Copy the URL from your browser&apos;s address bar to share this QR code with others.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 