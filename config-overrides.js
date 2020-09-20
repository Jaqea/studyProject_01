config = rewireLess.withLoaderOptions({
    javascriptEnabled: true
})(
    config, env);
// module.exports = {
//     dev: {
//         assetsSubDirectory: 'static',
//         assetsPublicPath: '/',
//         proxyTable: { //反向代理
//             '/local_api': {
//                 target: 'http://localhost:8080',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/local_api': ''
//                 }
//             }
//         }
//     }
// }