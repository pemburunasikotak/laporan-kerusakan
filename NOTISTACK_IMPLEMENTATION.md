# Notistack Implementation Guide

## Instalasi
```bash
npm install notistack
```

## Konfigurasi

### 1. App.jsx
Wrap aplikasi dengan `SnackbarProvider`:
```javascript
import { SnackbarProvider } from 'notistack';

// Di dalam komponen App
<SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
  <BrowserRouter>
    {/* routes */}
  </BrowserRouter>
</SnackbarProvider>
```

## Cara Penggunaan

### 1. Import Hook
```javascript
import { useSnackbar } from 'notistack';
```

### 2. Gunakan di Komponen
```javascript
const MyComponent = () => {
  const { enqueueSnackbar } = useSnackbar();
  
  const handleSuccess = () => {
    enqueueSnackbar('Data berhasil disimpan!', { variant: 'success' });
  };
  
  const handleError = () => {
    enqueueSnackbar('Gagal menyimpan data', { variant: 'error' });
  };
  
  const handleWarning = () => {
    enqueueSnackbar('Peringatan!', { variant: 'warning' });
  };
  
  const handleInfo = () => {
    enqueueSnackbar('Informasi', { variant: 'info' });
  };
  
  return (
    // ... JSX
  );
};
```

## Varian yang Tersedia
- `success` - Notifikasi sukses (hijau)
- `error` - Notifikasi error (merah)
- `warning` - Notifikasi peringatan (kuning/oranye)
- `info` - Notifikasi informasi (biru)
- `default` - Notifikasi default (abu-abu)

## File yang Sudah Diupdate

### ✅ Core Files
1. **src/App.jsx** - Setup SnackbarProvider
2. **src/features/master-data/hooks/useCRUD.js** - Accept enqueueSnackbar parameter
3. **src/features/master-data/MasterDataPage.jsx** - Replace alert() dengan notistack

### ✅ Pages
1. **src/pages/PublicReportPage.jsx** - Replace alert() dengan notistack
2. **src/pages/ReportsList.jsx** - Replace alert() dengan notistack

### ⏳ Files yang Masih Menggunakan alert()
Berikut file yang masih menggunakan `alert()` dan bisa diupdate:

1. **src/pages/TechniciansPage.jsx** (line 263)
2. **src/pages/AdminDashboard.jsx** (lines 16, 18)
3. **src/pages/MasterDataPage.jsx** (lines 124, 164, 167)

### Cara Update File Lain
```javascript
// Sebelum
alert('Pesan sukses');
alert('Pesan error');

// Sesudah
import { useSnackbar } from 'notistack';

const MyComponent = () => {
  const { enqueueSnackbar } = useSnackbar();
  
  // Success
  enqueueSnackbar('Pesan sukses', { variant: 'success' });
  
  // Error
  enqueueSnackbar('Pesan error', { variant: 'error' });
  
  // Warning
  enqueueSnackbar('Pesan peringatan', { variant: 'warning' });
};
```

## Opsi Tambahan

### Durasi
```javascript
enqueueSnackbar('Pesan', { 
  variant: 'success',
  autoHideDuration: 3000  // 3 detik (default: 5000)
});
```

### Prevent Duplicate
```javascript
enqueueSnackbar('Pesan', { 
  variant: 'success',
  preventDuplicate: true
});
```

### Persist (tidak otomatis hilang)
```javascript
enqueueSnackbar('Pesan', { 
  variant: 'info',
  persist: true
});
```

## Keuntungan Notistack vs alert()
1. ✅ Lebih baik UX - tidak blocking
2. ✅ Bisa customize style
3. ✅ Bisa stack multiple notifications
4. ✅ Auto-dismiss dengan animasi
5. ✅ Support berbagai varian (success, error, warning, info)
6. ✅ Posisi bisa diatur
7. ✅ Mobile friendly
