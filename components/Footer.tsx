'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="font-serif text-3xl font-bold text-wedding-gold mb-4">
            Phước Đại & Anh Thư
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Cảm ơn bạn đã cùng chúng tôi lưu giữ những kỷ niệm đẹp nhất của ngày cưới.
            Những khoảnh khắc này sẽ mãi mãi là kho báu quý giá nhất trong cuộc đời chúng tôi.
          </p>
          <div className="w-24 h-1 bg-wedding-gold mx-auto mb-6" />
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Phước Đại & Anh Thư Wedding Memories. Made with ❤️
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

