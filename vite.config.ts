import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import externalGlobals from 'rollup-plugin-external-globals';

import { viteMockServe } from 'vite-plugin-mock';
import { visualizer } from 'rollup-plugin-visualizer';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import ElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import VitePluginCompression from 'vite-plugin-compression';

import BrCompress from 'rollup-plugin-brotli';
import { createHtmlPlugin } from 'vite-plugin-html';

const globals = externalGlobals({
    moment: 'moment',
    'video.js': 'videojs',
    jspdf: 'jspdf',
    xlsx: 'XLSX'
});

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
    // 获取当前工作目录
    const root = process.cwd();
    // 获取环境变量
    const env = loadEnv(mode, root);

    return {
        // 项目根目录
        root,
        // 项目部署的基础路径
        base: './',
        publicDir: fileURLToPath(new URL('./public', import.meta.url)), // 无需处理的静态资源位置
        assetsInclude: fileURLToPath(new URL('./src/assets', import.meta.url)), // 需要处理的静态资源位置

        css: {
            preprocessorOptions: {
                less: {
                    additionalData: `@import "@/styles/variable.less";`
                }
            }
        },
        plugins: [
            // BrCompress({}),

            createHtmlPlugin({
                inject: {
                    data: {
                        monentscript:
                            '<script src="https://cdn.jsdelivr.net/npm/moment@2.29.1/min/moment.js"></script>',
                        videoscript:
                            '<script src="https://cdn.jsdelivr.net/npm/video.js@7.14.3/dist/video.min.js"></script>',
                        echartscript: '<script src="https://cdn.jsdelivr.net/npm/echarts@5.2.1/echarts"></script>',
                        jspdfscript: '<script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/pdf.js"></script>',
                        xlsxscript:
                            '<script src="https://cdn.jsdelivr.net/npm/xlsx@0.17.4/dist/xlsx.full.min.js"></script>'
                    }
                }
            }),
            VitePluginCompression({
                threshold: 1024 * 20, // 体积大于20kb的文件会被压缩
                ext: '.gz', // 压缩文件后缀
                algorithm: 'gzip' // 压缩算法
            }),
            // Vue模板文件编译插件
            vue(),
            // jsx文件编译插件
            vueJsx(),
            // 开启mock插件，开启后就可以在项目中模拟接口请求了
            viteMockServe({
                // 如果接口为 /mock/xxx 以 mock 开头就会被拦截响应配置的内容
                mockPath: 'mock', // 数据模拟需要拦截的请求起始 URL
                enable: true // 是否启用
                // localEnabled: true, // 本地开发是否启用
                // prodEnabled: false // 生产模式是否启用
            }),
            // 开启ElementPlus自动引入CSS
            ElementPlus({}),
            // 自动引入组件及ICON
            AutoImport({
                // 定义需要自动引入的框架
                imports: ['vue', 'vue-router', 'pinia'],
                // 处理 eslint, 记得还要去 eslint.config.js 中配置这个自动生成的 `.eslintrc-auto-import.json`规则
                eslintrc: {
                    enabled: true // Default `false`
                },
                resolvers: [ElementPlusResolver(), IconsResolver()],
                dts: fileURLToPath(new URL('./types/auto-imports.d.ts', import.meta.url))
            }),
            // 自动注册组件
            Components({
                resolvers: [IconsResolver(), ElementPlusResolver()],
                dts: fileURLToPath(new URL('./types/components.d.ts', import.meta.url)),
                dirs: [fileURLToPath(new URL('./src/components/auto', import.meta.url))]
            }),
            // 自动安装图标
            Icons({
                autoInstall: true
            })
        ],
        // 运行后本地预览的服务器
        server: {
            // 是否开启https
            https: false,
            // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
            host: true,
            // 开发环境预览服务器端口
            port: 3000,
            // 启动后是否自动打开浏览器
            open: false,
            // 是否开启CORS跨域
            cors: true,
            // 代理服务器
            // 帮助我们开发时解决跨域问题
            proxy: {
                // 这里的意思是 以/api开头发送的请求都会被转发到 http://xxx:3000
                [env.VITE_APP_API_BASEURL]: {
                    target: 'http://xxx:3000',
                    // 改变 Host Header
                    changeOrigin: true
                    // 如果后端请求没有这个 api 前缀，则发起请求时将 '/api' 替换为 ''
                    // rewrite: (path) => path.replace(/^\/api/, '')
                },
                [env.VITE_APP_MOCK_BASEURL]: {
                    target: 'http://xxx:3000',
                    changeOrigin: true
                    // rewrite: (path) => path.replace(/^\/mock/, '')
                }
            }
        },
        // 打包配置
        build: {
            // 关闭 sorcemap 报错不会映射到源码
            sourcemap: false,
            // 打包大小超出 400kb 提示警告
            chunkSizeWarningLimit: 400,

            rollupOptions: {
                // 打包入口文件 根目录下的 index.html
                // 也就是项目从哪个文件开始打包
                input: {
                    index: fileURLToPath(new URL('./index.html', import.meta.url))
                },
                plugins: [visualizer({ open: true })],
                // experimentalLogSideEffects: true,

                treeshake: {
                    preset: 'recommended'
                    // propertyReadSideEffects: true
                },
                external: ['moment', 'video.js', 'jspdf', 'xlsx', 'echarts'],
                output: {
                    // 方式1 过多的 chunk
                    // format: 'esm',
                    // chunkFileNames: 'static/js/[name]-[hash].js',
                    // entryFileNames: 'static/js/[name]-[hash].js',
                    // assetFileNames: 'static/[ext]/[name]-[hash].[ext]',

                    // 方式2 过大的chunk
                    manualChunks: (id: string) => {
                        if (id.includes('node_modules')) {
                            return 'vendor';
                        }

                        if (id.includes('src/views/about')) {
                            return 'about';
                        }
                        // 业务代码
                        // return 'index';
                    },

                    // 方式3 折中的方式
                    experimentalMinChunkSize: 20 * 1024, // 单位是 B

                    // 其他的配置

                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
                }
                // 静态资源分类打包
                // output: {
                //     format: 'esm',
                //     chunkFileNames: 'static/js/[name]-[hash].js',
                //     entryFileNames: 'static/js/[name]-[hash].js',
                //     assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
                // }
            }
        },
        // 配置别名
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '#': fileURLToPath(new URL('./types', import.meta.url))
            }
        }
    };
});
