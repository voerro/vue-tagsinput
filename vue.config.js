const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    // needed to generate
    parallel: false,
    outputDir: 'dist',
    indexPath: 'index.html',
    devServer: {
        historyApiFallback: true,
        overlay: {
            warnings: true,
            errors: true,
        },
    },
    productionSourceMap: true,
    configureWebpack: (config) => {
        config.module.rules.forEach((rule) => {
            if (rule.use) {
                let idx = rule.use.findIndex((w) => {
                    w.loader === 'thread-loader';
                });
                if (idx !== -1) {
                    rule.use.splice(idx, 1);
                }
            }
        });
    },
    chainWebpack: (config) => {
        config.module.rule('ts').uses.delete('cache-loader');
        config.module.rule('tsx').uses.delete('cache-loader');
        config.module.rule('ts').use('ts-loader')
            .loader('ts-loader')
            .tap((options) => {
                return {
                    ...options,
                    transpileOnly: false,
                    happyPackMode: false,
                };
            });
        config.module.rule('tsx').use('ts-loader')
            .loader('ts-loader')
            .tap((options) => {
                return {
                    ...options,
                    transpileOnly: false,
                    happyPackMode: false,
                };
            });
        if (isProduction) {
            const TSCONFIG_PATH = './tsconfig.production.json';
                config
                .plugin('fork-ts-checker')
                .tap(args => {
                    console.log(args);
                  args[0].tsconfig = TSCONFIG_PATH;
                  return args;
                })
        }
    },
};
