# Phước Đại & Anh Thư - Wedding Memories Website

Website lưu giữ kỷ niệm cưới với gallery ảnh và video đẹp mắt, được xây dựng bằng Next.js, Framer Motion và Tailwind CSS.

## Tính năng

- 🎨 **Giao diện đẹp mắt**: Thiết kế hiện đại với màu sắc tinh tế
- 📸 **Gallery ảnh**: Hiển thị ảnh cưới với lightbox và filter theo danh mục
- 🎥 **Gallery video**: Xem video kỷ niệm với player tích hợp
- ✨ **Animations mượt mà**: Sử dụng Framer Motion cho trải nghiệm tuyệt vời
- 📱 **Responsive**: Tối ưu cho mọi thiết bị

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy development server:
```bash
npm run dev
```

3. Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt

## Cấu trúc dự án

```
├── app/
│   ├── layout.tsx      # Layout chính
│   ├── page.tsx        # Trang chủ
│   └── globals.css     # Styles toàn cục
├── components/
│   ├── Hero.tsx        # Section hero
│   ├── Navigation.tsx  # Navigation bar
│   ├── PhotoGallery.tsx # Gallery ảnh
│   ├── VideoGallery.tsx # Gallery video
│   └── Footer.tsx      # Footer
└── package.json
```

## Thêm ảnh và video thật

### Thêm ảnh mới:

Chỉnh sửa file `components/PhotoGallery.tsx`, tìm mảng `mockPhotos` và thêm ảnh của bạn:

```typescript
const mockPhotos: Photo[] = [
  {
    id: 1,
    src: '/images/your-photo.jpg', // Đường dẫn đến ảnh của bạn
    alt: 'Mô tả ảnh',
    category: 'ceremony' // 'ceremony' hoặc 'reception'
  },
  // ... thêm ảnh khác
]
```

**Lưu ý**: Đặt ảnh của bạn trong thư mục `public/images/` và sử dụng đường dẫn `/images/your-photo.jpg`

### Thêm video mới:

Chỉnh sửa file `components/VideoGallery.tsx`, tìm mảng `mockVideos` và thêm video của bạn:

```typescript
const mockVideos: Video[] = [
  {
    id: 1,
    title: 'Tiêu đề video',
    thumbnail: '/images/video-thumbnail.jpg', // Ảnh thumbnail
    videoUrl: '/videos/your-video.mp4', // Đường dẫn đến video
    duration: '5:23',
    category: 'ceremony' // 'ceremony', 'reception', hoặc 'highlights'
  },
  // ... thêm video khác
]
```

**Lưu ý**: Đặt video của bạn trong thư mục `public/videos/` và sử dụng đường dẫn `/videos/your-video.mp4`

## Tùy chỉnh

### Màu sắc:

Chỉnh sửa file `tailwind.config.ts` để thay đổi màu sắc chủ đạo:

```typescript
colors: {
  wedding: {
    gold: '#D4AF37',    // Màu vàng
    rose: '#F4C2C2',    // Màu hồng
    cream: '#FFF8E7',   // Màu kem
    blush: '#FFE5E5',   // Màu hồng nhạt
  },
}
```

### Font chữ:

Font chữ được cấu hình trong `app/layout.tsx`. Bạn có thể thay đổi font từ Google Fonts.

## Build cho production

```bash
npm run build
npm start
```

## Công nghệ sử dụng

- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Next.js Image**: Optimized images

## License

Private project - All rights reserved

