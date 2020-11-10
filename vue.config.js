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
        host: 'localhost',
        port: 8081,
        // https: true,
        proxy: {
            '/api': {
                target: "http://localhost:8080",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    }
}
