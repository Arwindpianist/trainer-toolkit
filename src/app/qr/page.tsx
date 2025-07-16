'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Save, Copy, Trash2, ExternalLink, QrCode, Maximize2, Minimize2 } from 'lucide-react';
import Header from '@/components/Header';
import { useTrainerToolkitStore, QRCode } from '@/lib/store';
import Link from 'next/link';

type QRType = 'url' | 'text' | 'vcard' | 'wifi';

interface WiFiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
}

interface VCardData {
  name: string;
  phone: string;
  email: string;
  company?: string;
  title?: string;
}

export default function QRCodeGenerator() {
  const [qrType, setQrType] = useState<QRType>('url');
  const [qrContent, setQrContent] = useState('');
  const [qrName, setQrName] = useState('');
  const [qrSize, setQrSize] = useState(256);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wifiData, setWifiData] = useState<WiFiData>({
    ssid: '',
    password: '',
    encryption: 'WPA'
  });
  const [vcardData, setVcardData] = useState<VCardData>({
    name: '',
    phone: '',
    email: '',
    company: '',
    title: ''
  });

  const { qrCodes, addQRCode, deleteQRCode } = useTrainerToolkitStore();

  const generateQRContent = (): string => {
    switch (qrType) {
      case 'url':
        return qrContent;
      case 'text':
        return qrContent;
      case 'vcard':
        return `BEGIN:VCARD
VERSION:3.0
FN:${vcardData.name}
TEL:${vcardData.phone}
EMAIL:${vcardData.email}
ORG:${vcardData.company || ''}
TITLE:${vcardData.title || ''}
END:VCARD`;
      case 'wifi':
        return `WIFI:T:${wifiData.encryption};S:${wifiData.ssid};P:${wifiData.password};;`;
      default:
        return qrContent;
    }
  };

  const handleSave = () => {
    const content = generateQRContent();
    if (!content.trim() || !qrName.trim()) return;

    addQRCode({
      name: qrName,
      content,
      type: qrType,
      size: qrSize
    });

    // Reset form
    setQrName('');
    setQrContent('');
    setWifiData({ ssid: '', password: '', encryption: 'WPA' });
    setVcardData({ name: '', phone: '', email: '', company: '', title: '' });
  };

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${qrName || 'qr-code'}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleCopyLink = (qrCode: QRCode) => {
    const url = `${window.location.origin}/qr/${qrCode.id}`;
    navigator.clipboard.writeText(url);
  };

  const toggleFullscreen = () => {
    const qrPreview = document.getElementById('qr-preview');
    if (!document.fullscreenElement) {
      qrPreview?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const renderInputFields = () => {
    switch (qrType) {
      case 'url':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL
              </label>
              <input
                type="url"
                value={qrContent}
                onChange={(e) => setQrContent(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Content
              </label>
              <textarea
                value={qrContent}
                onChange={(e) => setQrContent(e.target.value)}
                placeholder="Enter any text content..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case 'vcard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={vcardData.name}
                  onChange={(e) => setVcardData({ ...vcardData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={vcardData.phone}
                  onChange={(e) => setVcardData({ ...vcardData, phone: e.target.value })}
                  placeholder="+1234567890"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={vcardData.email}
                  onChange={(e) => setVcardData({ ...vcardData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={vcardData.company}
                  onChange={(e) => setVcardData({ ...vcardData, company: e.target.value })}
                  placeholder="Company Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={vcardData.title}
                  onChange={(e) => setVcardData({ ...vcardData, title: e.target.value })}
                  placeholder="Job Title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 'wifi':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Network Name (SSID) *
                </label>
                <input
                  type="text"
                  value={wifiData.ssid}
                  onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
                  placeholder="WiFi Network Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={wifiData.password}
                  onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
                  placeholder="WiFi Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Encryption Type
                </label>
                <select
                  value={wifiData.encryption}
                  onChange={(e) => setWifiData({ ...wifiData, encryption: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="WPA">WPA/WPA2/WPA3</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">No Password</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentQRContent = generateQRContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header 
        title="QR Code Generator" 
        subtitle="Create and share QR codes for URLs, text, contacts, and WiFi"
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl mb-4 shadow-lg">
            <QrCode className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">QR Code Generator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional QR codes for URLs, text, contact information, and WiFi credentials. 
            Save and share your codes instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Section */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-card-foreground mb-6 flex items-center">
              <QrCode className="h-5 w-5 mr-2 text-primary" />
              Generate QR Code
            </h2>
            
            {/* QR Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-card-foreground mb-3">
                QR Code Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['url', 'text', 'vcard', 'wifi'] as QRType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setQrType(type)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      qrType === type
                        ? 'bg-gradient-to-r from-teal-400 to-blue-400 text-white shadow-lg shadow-teal-500/25'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:shadow-sm border border-border/50'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Fields */}
            <div className="mb-6">
              {renderInputFields()}
            </div>

            {/* QR Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                QR Code Name
              </label>
              <input
                type="text"
                value={qrName}
                onChange={(e) => setQrName(e.target.value)}
                placeholder="My QR Code"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* QR Size */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                QR Code Size: {qrSize}px
              </label>
              <input
                type="range"
                min="128"
                max="512"
                step="32"
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                disabled={!currentQRContent.trim() || !qrName.trim()}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-400 text-white rounded-lg hover:from-teal-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg shadow-teal-500/25"
              >
                <Save className="h-4 w-4 mr-2" />
                Save QR Code
              </button>
              <button
                onClick={handleDownload}
                disabled={!currentQRContent.trim()}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-lg hover:from-green-500 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg shadow-green-500/25"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PNG
              </button>
            </div>
          </div>

          {/* QR Preview */}
          <div id="qr-preview" className="bg-card rounded-2xl border border-border/50 p-6 sm:p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-card-foreground">Live Preview</h2>
              {currentQRContent.trim() && (
                <button
                  onClick={toggleFullscreen}
                  className="flex items-center px-3 py-2 bg-gradient-to-r from-teal-400 to-blue-400 text-white rounded-lg hover:from-teal-500 hover:to-blue-500 transition-all duration-200 text-sm"
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="h-4 w-4 mr-1" />
                      Exit
                    </>
                  ) : (
                    <>
                      <Maximize2 className="h-4 w-4 mr-1" />
                      Fullscreen
                    </>
                  )}
                </button>
              )}
            </div>
            
            <div className="flex justify-center">
              {currentQRContent.trim() ? (
                <div className="p-6 bg-white border-2 border-gray-200 rounded-xl shadow-sm">
                  <QRCodeSVG
                    value={currentQRContent}
                    size={qrSize}
                    level="M"
                    includeMargin={true}
                  />
                </div>
              ) : (
                <div className="w-64 h-64 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Enter content to generate QR code</p>
                  </div>
                </div>
              )}
            </div>

            {currentQRContent.trim() && (
              <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200/50">
                <p className="text-sm text-teal-800">
                  <strong>Content:</strong> {currentQRContent.length > 50 ? currentQRContent.substring(0, 50) + '...' : currentQRContent}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Saved QR Codes */}
        {qrCodes.length > 0 && (
          <div className="mt-12 bg-card rounded-2xl border border-border/50 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-card-foreground mb-6">Saved QR Codes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {qrCodes.map((qrCode) => (
                <div key={qrCode.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-900">{qrCode.name}</h3>
                    <button
                      onClick={() => deleteQRCode(qrCode.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex justify-center mb-4">
                    <div className="p-2 bg-white border border-gray-200 rounded-lg">
                      <QRCodeSVG
                        value={qrCode.content}
                        size={120}
                        level="M"
                        includeMargin={true}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleCopyLink(qrCode)}
                      className="flex items-center text-sm text-teal-600 hover:text-teal-700 font-medium"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy Link
                    </button>
                    <Link
                      href={`/qr/${qrCode.id}`}
                      className="flex items-center text-sm text-teal-600 hover:text-teal-700 font-medium"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
} 