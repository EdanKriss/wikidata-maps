import { join, resolve } from 'node:path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

Error.stackTraceLimit = 3;

/**
 *  @param {env} env 
 *  @param {any} argv 
 *  @returns {webpack.Configuration}
 */
export default function (env, argv) {
    console.log('env:', env);
    console.log('argv:', argv);
    const isDev = env.WEBPACK_SERVE;
    const {
        ANALYZE_BUNDLE,
    } = env;
    const {
        WEBSERVER_DOMAIN,
        WEBSERVER_PORT,
        WEBSERVER_BASE_PATH,
        WEBSERVER_FRONTEND_STATIC_PATH,
    } = process.env;

    console.log(
        'Loaded shell env variables:',
        { WEBSERVER_DOMAIN, WEBSERVER_PORT,WEBSERVER_BASE_PATH, WEBSERVER_FRONTEND_STATIC_PATH },
    );

    if (!WEBSERVER_BASE_PATH || !WEBSERVER_FRONTEND_STATIC_PATH) {
        throw new Error('Missing shell env variable');
    }

    if (isDev) {
        if (!WEBSERVER_DOMAIN || !WEBSERVER_PORT) {
            throw new Error('Missing shell env variable');
        }
        if (WEBSERVER_BASE_PATH !== '/' || WEBSERVER_FRONTEND_STATIC_PATH !== '/') {
            throw new Error(
                "When using 'webpack serve', WEBSERVER_BASE_PATH and WEBSERVER_FRONTEND_STATIC_PATH must both equal '/'."
                + "This does not apply to webpack builds, only the dev server."
                + "The reason for this is because the historyApiFallback stops working when publicPath is not '/'."
            );
        }
    }

    return {
        // stats: 'verbose',
        entry: './src/0-root.tsx',
        output: {
            filename:
                isDev
                ? '[name].js'
                : '[name].[contenthash].js',
            path: resolve('dist'),
            publicPath: join(WEBSERVER_BASE_PATH, WEBSERVER_FRONTEND_STATIC_PATH, '/'),
            clean: true,
            assetModuleFilename:
                isDev
                ? '[name][ext]'
                : `[name].[contenthash][ext]`,
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            extensionAlias: {
                '.js': ['.tsx', '.ts', '.js'],
            },
            // plugins: [
            //     new TsconfigPathsPlugin({extensions: ['.tsx', '.ts']}),
            // ]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    include: resolve('src'),
                },{
                    test: /\.css$/,
                    use: [
                        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                        "css-loader",
                    ],
                    include: [ resolve('src'), resolve('node_modules') ],
                },{
                    test: /\.(gif|png|jpe?g|svg|webp)$/,
                    type: 'asset',
                    include: resolve('public/images'),
                },{
                    test: /\.json$/,
                    type: 'asset',
                    include: resolve('public'),
                },
                // {
                //     test: /\.pdf$/,
                //     type: 'asset/resource',
                // },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                REST_API_URL:
                    isDev
                    ? JSON.stringify(`http://${WEBSERVER_DOMAIN}:${WEBSERVER_PORT}${WEBSERVER_BASE_PATH === '/' ? '' : WEBSERVER_BASE_PATH}`)
                    : JSON.stringify(WEBSERVER_BASE_PATH === '/' ? '' : WEBSERVER_BASE_PATH),
                WEBSERVER_BASE_PATH: JSON.stringify(WEBSERVER_BASE_PATH),
            }),
            isDev
                ? undefined
                : new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                template: './src/template.html',
                filename: 'index.html',
                title: 'EXAMPLE PORTAL',
                scriptLoading: 'module',
            }),
            ANALYZE_BUNDLE
                ? new BundleAnalyzerPlugin({
                    // analyzerMode: 'static',
                })
                : undefined,
        ],
        devServer: {
            historyApiFallback: true,
            port: 9000,
            // client: {
            //     overlay: {
            //         runtimeErrors: false,
            //     }
            // },
        },
    };
}