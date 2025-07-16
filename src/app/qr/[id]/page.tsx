import QRCodeViewClient from './QRCodeViewClient';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function QRCodeView({ params }: PageProps) {
  const { id } = await params;
  
  return <QRCodeViewClient id={id} />;
} 