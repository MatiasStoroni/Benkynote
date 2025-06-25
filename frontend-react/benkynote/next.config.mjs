/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true

};

export default nextConfig;



// const nextConfig = {
//   reactStrictMode: true,
//   webpackDevMiddleware: (config) => {
//     config.watchOptions = {
//       poll: 1000, // Verifica los cambios cada medio segundo
//       aggregateTimeout: 300, // Agrega un retraso de 300ms
//     };
//     return config;
//   },
// };

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   // webpackDevMiddleware: (config) => {
//   //   config.watchOptions = {
//   //     poll: 1000,
//   //     aggregateTimeout: 300,
//   //   };
//   //   return config;
//   // },
// };

// export default nextConfig;
