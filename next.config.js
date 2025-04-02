/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // webpack設定を追加してチャンクサイズを最適化
  webpack: (config, { isServer }) => {
    // クライアント側のみの設定
    if (!isServer) {
      // チャンクサイズを小さくする
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 70000,
      };
    }
    
    return config;
  },
  // ビルド時の出力を詳細にする
  output: 'standalone',
  // 開発サーバーのタイムアウト増加と指標の位置
  devIndicators: {
    position: 'bottom-right',
  },
  experimental: {
    // 必要に応じて実験的なオプション
    optimizeCss: true,   // CSSを最適化
  },
};

module.exports = nextConfig; 