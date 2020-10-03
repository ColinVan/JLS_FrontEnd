module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'public',
    indexPath: 'index.html',
    /**
     * 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。
     * 这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
     * 设置为 true 或 'warning' 时，eslint-loader 会将 lint 错误输出为编译警告。
     * 默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
     */
    lintOnSave: true,
    /**
     * 是否使用包含运行时编译器的 Vue 构建版本。
     * 设置为 true 后你就可以在 Vue 组件中使用 template 选项了,
     * ，但是这会让你的应用额外增加 10kb 左右。
     */
    runtimeCompiler: false,
    /**
     * 设置生产环境是否生成sourcemap文件, 默认为true
     * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
     */
    productionSourceMap: true,
    css: {

    },
    devServer: {
        host: '192.168.1.103',
        port: 8081,
        https: true,
        proxy: {
            '/api': {
                target: "http://192.168.1.103:8080", /*后端接口地址, 可能是因为原后端项目不支持https, 所以...*/
                ws: true, /*是否启用websockets*/
                /**
                 * changeOrigin选项配置是否允许跨域
                 * true:开启代理.
                 * 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据.
                 * 这样服务端和服务端进行数据的交互就不会有跨域问题
                 */
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    }
}
