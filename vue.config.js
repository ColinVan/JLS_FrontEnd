module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'public',
    indexPath: 'index.html',
    lintOnSave: true,
    runtimeCompiler: false,
    productionSourceMap: true,
    css: {

    },
    devServer: {
        host: '192.168.1.103',
        port: 8081,
        https: true,
        proxy: {
            '/api': {
                target: "http://192.168.1.103:8080",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    }
}
