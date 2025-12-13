import React, { useState, useEffect } from 'react';
import { MessageCircle, QrCode, Scan, RefreshCcw, Power, CheckCircle, XCircle, Clock, Phone } from 'lucide-react';

const WhatsAppManagement = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected'); // disconnected, connecting, connected
  const [qrCode, setQrCode] = useState(null);
  const [sessionInfo, setSessionInfo] = useState(null);
  const [stats, setStats] = useState({
    messagesReceived: 0,
    messagesProcessed: 0,
    activeChats: 0,
    lastMessage: null
  });

  // Dummy session info
  const dummySessionInfo = {
    phoneNumber: '+62 812-3456-7890',
    deviceName: 'Chrome (Windows)',
    connectedSince: '2025-12-11 14:30:00',
    platform: 'WhatsApp Web'
  };

  // Simulate QR code loading
  const handleStartConnection = () => {
    setConnectionStatus('connecting');
    setQrCode(null);
    
    // Simulate QR code generation
    setTimeout(() => {
      // This would come from backend in production
      const dummyQR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mNk+M9Qz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC';
      setQrCode(dummyQR);
    }, 1500);

    // Simulate successful connection after scanning (for demo)
    setTimeout(() => {
      setConnectionStatus('connected');
      setQrCode(null);
      setSessionInfo(dummySessionInfo);
      setStats({
        messagesReceived: 142,
        messagesProcessed: 138,
        activeChats: 24,
        lastMessage: '2025-12-11 21:25:00'
      });
    }, 10000); // 10 seconds to simulate scanning
  };

  const handleDisconnect = () => {
    if (window.confirm('Yakin ingin memutuskan koneksi WhatsApp?')) {
      setConnectionStatus('disconnected');
      setQrCode(null);
      setSessionInfo(null);
      setStats({
        messagesReceived: 0,
        messagesProcessed: 0,
        activeChats: 0,
        lastMessage: null
      });
    }
  };

  const handleRestart = () => {
    handleDisconnect();
    setTimeout(() => {
      handleStartConnection();
    }, 500);
  };

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case 'connected':
        return (
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
            <CheckCircle size={20} />
            <span className="font-semibold">Terhubung</span>
          </div>
        );
      case 'connecting':
        return (
          <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
            <Clock size={20} className="animate-spin" />
            <span className="font-semibold">Menghubungkan...</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full">
            <XCircle size={20} />
            <span className="font-semibold">Terputus</span>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manajemen WhatsApp</h1>
          <p className="text-gray-600 mt-1">Kelola koneksi WhatsApp untuk menerima laporan kerusakan</p>
        </div>
        {getStatusBadge()}
      </div>

      {/* Connection Status Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <MessageCircle className="text-green-500" size={32} />
          <div>
            <h2 className="text-xl font-bold">Status Koneksi WhatsApp</h2>
            <p className="text-sm text-gray-600">Pantau status koneksi WhatsApp Bot</p>
          </div>
        </div>

        {connectionStatus === 'disconnected' && (
          <div className="text-center py-8">
            <div className="mb-4">
              <Phone className="mx-auto text-gray-400" size={64} />
            </div>
            <h3 className="text-lg font-semibold mb-2">WhatsApp Belum Terhubung</h3>
            <p className="text-gray-600 mb-6">Scan QR Code untuk menghubungkan WhatsApp Bot dengan aplikasi</p>
            <button
              onClick={handleStartConnection}
              className="flex items-center gap-2 mx-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              <QrCode size={20} />
              Mulai Koneksi
            </button>
          </div>
        )}

        {connectionStatus === 'connecting' && qrCode && (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">Scan QR Code</h3>
            <p className="text-gray-600 mb-6">
              Buka WhatsApp di ponsel Anda → Settings → Linked Devices → Link a Device
            </p>
            <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300 inline-block mb-4">
              {/* QR Code Placeholder - In production, display actual QR from backend */}
              <div className="w-64 h-64 bg-gray-100 flex items-center justify-center rounded">
                <div className="text-center">
                  <QrCode className="mx-auto text-gray-400 mb-2" size={48} />
                  <p className="text-sm text-gray-500">QR Code akan muncul di sini</p>
                  <div className="mt-4 animate-pulse">
                    <div className="grid grid-cols-8 gap-1">
                      {[...Array(64)].map((_, i) => (
                        <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Clock size={16} />
              <span>QR Code akan kadaluarsa dalam 60 detik</span>
            </div>
            <button
              onClick={handleRestart}
              className="mt-4 flex items-center gap-2 mx-auto text-blue-600 hover:text-blue-700"
            >
              <RefreshCcw size={16} />
              Refresh QR Code
            </button>
          </div>
        )}

        {connectionStatus === 'connecting' && !qrCode && (
          <div className="text-center py-8">
            <div className="animate-spin mx-auto mb-4">
              <Scan className="text-blue-600" size={48} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Memuat QR Code...</h3>
            <p className="text-gray-600">Tunggu sebentar</p>
          </div>
        )}

        {connectionStatus === 'connected' && sessionInfo && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-sm text-gray-600 mb-1">Nomor WhatsApp</p>
                <p className="text-lg font-bold text-green-700">{sessionInfo.phoneNumber}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-gray-600 mb-1">Perangkat</p>
                <p className="text-lg font-bold text-blue-700">{sessionInfo.deviceName}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <p className="text-sm text-gray-600 mb-1">Platform</p>
                <p className="text-lg font-bold text-purple-700">{sessionInfo.platform}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-500">
                <p className="text-sm text-gray-600 mb-1">Terhubung Sejak</p>
                <p className="text-lg font-bold text-gray-700">{sessionInfo.connectedSince}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                <RefreshCcw size={18} />
                Restart Koneksi
              </button>
              <button
                onClick={handleDisconnect}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                <Power size={18} />
                Putuskan Koneksi
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Statistics Cards */}
      {connectionStatus === 'connected' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pesan Diterima</p>
                <p className="text-3xl font-bold text-gray-800">{stats.messagesReceived}</p>
              </div>
              <MessageCircle className="text-blue-500" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pesan Diproses</p>
                <p className="text-3xl font-bold text-gray-800">{stats.messagesProcessed}</p>
              </div>
              <CheckCircle className="text-green-500" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Chat Aktif</p>
                <p className="text-3xl font-bold text-gray-800">{stats.activeChats}</p>
              </div>
              <Phone className="text-purple-500" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pesan Terakhir</p>
                <p className="text-sm font-semibold text-gray-800">{stats.lastMessage || '-'}</p>
              </div>
              <Clock className="text-yellow-500" size={40} />
            </div>
          </div>
        </div>
      )}

      {/* Instructions Card */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
        <h3 className="font-bold text-blue-900 mb-2">📱 Cara Menghubungkan WhatsApp</h3>
        <ol className="list-decimal list-inside space-y-2 text-blue-800">
          <li>Klik tombol "Mulai Koneksi" di atas</li>
          <li>Buka WhatsApp di ponsel Anda</li>
          <li>Buka menu Settings / Pengaturan</li>
          <li>Pilih "Linked Devices" / "Perangkat Tertaut"</li>
          <li>Tap "Link a Device" / "Tautkan Perangkat"</li>
          <li>Scan QR Code yang muncul di layar</li>
          <li>Tunggu hingga status berubah menjadi "Terhubung"</li>
        </ol>
      </div>

      {/* Feature Info */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h3 className="font-bold text-lg mb-4">🤖 Fitur WhatsApp Bot</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="text-green-600" size={18} />
            </div>
            <div>
              <p className="font-semibold">Penerimaan Laporan Otomatis</p>
              <p className="text-sm text-gray-600">Menerima laporan kerusakan via WhatsApp secara real-time</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="text-blue-600" size={18} />
            </div>
            <div>
              <p className="font-semibold">Notifikasi ke Teknisi</p>
              <p className="text-sm text-gray-600">Mengirim notifikasi tugas baru ke teknisi yang ditugaskan</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="text-purple-600" size={18} />
            </div>
            <div>
              <p className="font-semibold">Update Status Real-time</p>
              <p className="text-sm text-gray-600">Memberikan update status perbaikan kepada pelapor</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="text-yellow-600" size={18} />
            </div>
            <div>
              <p className="font-semibold">Log Aktivitas</p>
              <p className="text-sm text-gray-600">Mencatat semua interaksi WhatsApp untuk audit trail</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppManagement;
