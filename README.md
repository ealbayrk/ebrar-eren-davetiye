# Ebrar & Eren — Online Davetiye

Bu klasör GitHub Pages'e doğrudan yüklenebilir.

## Dosyalar
- `index.html` — davetiye içeriği
- `styles.css` — tüm tasarım
- `script.js` — geri sayım + RSVP gönderimi
- `assets/davetiye.svg` — tek parça çiçekli arka plan

## GitHub Pages ile yayınlama
1. GitHub'da yeni bir repository oluşturun (ör. `ebrar-eren-davetiye`).
2. Bu klasördeki dosyaları repository'nin ana dizinine yükleyin.
3. Repository'de `Settings` → `Pages` bölümüne gidin.
4. `Build and deployment` altında `Deploy from a branch` seçin.
5. Branch olarak `main`, klasör olarak `/ (root)` seçip `Save` deyin.
6. Birkaç dakika içinde GitHub Pages adresiniz oluşur.

## RSVP
RSVP endpoint'i `script.js` içinde `RSVP_ENDPOINT` değişkeninde tanımlıdır.

## Önemli
Apps Script dağıtımı değişirse yeni `/exec` URL'sini `script.js` içindeki `RSVP_ENDPOINT` değerine yazın.
