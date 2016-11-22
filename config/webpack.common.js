var webpack=require("webpack");
var helpers=require("./helpers");

/**
 * webpack Plugins
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin'); 

/**
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
  title: 'ng2 jce',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

/**
 * Webpack Configuration
 */
module.exports=function(options){
    isProd=options.env==="production";
    return {
        /**
         * Static metadata for index.html(index.html的静态元数据)
         * See: (custom attribute)(自定义属性)
         */
        metadata:METADATA,
        /**
         * Cache generated modules and chunks to improve performance for multiple incremental builds.(缓存生成模块和多个增量构建块来提高性能)
         * This is enabled by default in watch mode.(观看模式下默认启用缓存)
         * You can pass false to disable it.(你可以手动禁用)
         *
         * See: http://webpack.github.io/docs/configuration.html#cache
         */
        cache:false,
        /*
         * The entry point for the bundle(ng应用的入口位置)
         * Our Angular.js app
         *
         * See: http://webpack.github.io/docs/configuration.html#entry
         */
        entry:{
            "polyfills":"./src/polyfills.browser.ts",
            "vendor":"./src/vendor.browser.ts",
            "main":"./src/main.browser.ts"
        },
        /**
         * Options affecting the resolving of modules.(配置影响解析的模块)
         * See: http://webpack.github.io/docs/configuration.html#resolve
         */
        resolve:{
            /**
             * An array of extensions that should be used to resolve modules.(用于解析模块的指定扩展名的文件)
             * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
             */
            extensions:["",".ts",".js",".json"],
            // Make sure root is src(确保根目录是src)
            root:helpers.root("src"),
            // remove other default values(移除其他默认值)
            modulesDirectories:["node_modules"]
        },
        /**
         * Options affecting the normal modules.(配置影响正常的模块)
         * See: http://webpack.github.io/docs/configuration.html#module
         */
        module:{
            /**
             * An array of applied pre and post loaders.(预加载器)
             */
            preLoader:[
                {
                    test:/\.ts$/,
                    loader:"string-replace-loader",
                    query:{
                        search:"(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)",
                        replace:"$1.import($3).then(mod => (mod.__esModule && mod.default) ? mod.default : mod)",
                        flags:"g"
                    },
                    include:[helpers.root("src")]     
                }
            ],
            /**
             * An array of automatically applied loaders.(自动加载加载器)
             * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.(重要：这里的加载器解析响应的相应应用)
             * This means they are not resolved relative to the configuration file.(这意味着他们不解析相应的配置文件)
             * See: http://webpack.github.io/docs/configuration.html#module-loaders
             */
            loaders:[
                /**
                 * Typescript loader support for .ts and Angular 2 async routes via .async.ts
                 * Replace templateUrl and stylesUrl with require()
                 * See: https://github.com/s-panferov/awesome-typescript-loader
                 * See: https://github.com/TheLarkInn/angular2-template-loader
                 */
                {
                    test:/\.ts$/,
                    loaders:[
                        "@angularclass/hmr-loader?pretty="+!isProd+"&prod="+isProd,
                        "awesome-typescript-loader",
                        "angular2-template-loader"
                    ],
                    exclude:[/\.(spec|e2e)\.ts$/]
                },
                /**
                 * Json loader support for *.json files.
                 * See: https://github.com/webpack/json-loader
                 */
                {
                    test:/\.json$/,
                    loader:"json-loader"
                },
                /**
                 * to string and css loader support for *.css files
                 * Returns file content as string
                 */
                {
                    test:/\.css$/,
                    loaders:["to-string-loader","css-loader"]
                },
                /**
                 * Raw loader support for *.html
                 * Returns file content as string
                 * See: https://github.com/webpack/raw-loader
                 */
                {
                    test:/\.html$/,
                    loader:"raw-loader",
                    exclude:[helpers.root("src/index.html")]
                },
                /**
                 * File loader for supporting images, for example, in CSS files.
                 */
                {
                    test:/\.(jpg|png|gif)$/,
                    loader:"file"
                }
            ],
            postLoaders:[
                {
                    test:/\.js$/,
                    loader:"string-replace-loader",
                    query:{
                        search:"var sourceMappingUrl=extractSourceMappingUrl\\(cssText\\);",
                        replace:"var sourceMappingUrl='';",
                        flags:"g"
                    }
                }
            ]
        },
        /**
         * Add additional plugins to the compiler.(添加额外的编译器插件)
         * See: http://webpack.github.io/docs/configuration.html#plugins
         */
        plugins:[
            new AssetsPlugin({
                path:helpers.root("dist"),
                filename:"webpack-asset.json",
                prettyPrint:true
            }),
            /**
             * Plugin: ForkCheckerPlugin
             * Description: Do type checking in a separate process, so webpack don't need to wait.(在一个单独的进程做类型检查，所有webpack不需要等待)
             * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
             */
            new ForkCheckerPlugin(),
            /**
             * Plugin: CommonsChunkPlugin
             * Description: Shares common code between the pages.(共享通用的代码页)
             * It identifies common modules and put them into a commons chunk.(能够识别常见的模块，并将它们放在一块通用的代码页)
             * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
             * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
             */
            new webpack.optimize.CommonsChunkPlugin({
                name:["polyfills","vendor"].reverse()
            }),
            /**
             * Plugin: ContextReplacementPlugin
             * Description: Provides context to Angular's use of System.import(提供上下文给ng使用系统导入)
             */
            new ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                helpers.root('src') // location of your src
            ),
            /**
             * Plugin: CopyWebpackPlugin
             * Description: Copy files and directories in webpack.(在Webpack复制文件和目录)
             * Copies project static assets.(复制项目静态资产)
             * See: https://www.npmjs.com/package/copy-webpack-plugin
             */
            new CopyWebpackPlugin([{
                from:"src/assets",
                to:"assets"
            }]),
            /**
             * Plugin: HtmlWebpackPlugin
             * Description: Simplifies creation of HTML files to serve your webpack bundles.(简单创建Html文件到你的webpack构建中)
             * This is especially useful for webpack bundles that include a hash in the filename
             * which changes every compilation.
             * See: https://github.com/ampedandwired/html-webpack-plugin
             */
            new HtmlWebpackPlugin({
                template:"src/index.html",
                chunksSortMode:"dependency"
            }),
            /**
             * Plugin: HtmlHeadConfigPlugin
             * Description: Generate html tags based on javascript maps.
             *
             * If a publicPath is set in the webpack output configuration, it will be automatically added to
             * href attributes, you can disable that by adding a "=href": false property.
             * You can also enable it to other attribute by settings "=attName": true.
             *
             * The configuration supplied is map between a location (key) and an element definition object (value)
             * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
             *
             * Example:
             *  Adding this plugin configuration
             *  new HtmlElementsPlugin({
             *    headTags: { ... }
             *  })
             *
             *  Means we can use it in the template like this:
             *  <%= webpackConfig.htmlElements.headTags %>
             *
             * Dependencies: HtmlWebpackPlugin
             */
            new HtmlElementsPlugin({
                headTags:require("./head-config.common")
            }),
        ],
        /**
         * Include polyfills or mocks for various node stuff
         * Description: Node configuration
         *
         * See: https://webpack.github.io/docs/configuration.html#node
         */
        node:{
            global:"window",
            crypto:"empty",
            process:true,
            module:false,
            clearImmediate:false,
            setImmediate:false
        }
    };
}
