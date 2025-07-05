import type { NextConfig } from "next";
import type { RuleSetRule as ModuleRule } from 'webpack';


const nextConfig: NextConfig = {
    webpack(config) {
        const fileLoaderRule: ModuleRule | undefined = config.module.rules.find((rule: ModuleRule): rule is ModuleRule =>
            rule.test instanceof RegExp && rule.test.test('.svg')
        );

        if (fileLoaderRule) {
            fileLoaderRule.exclude = /\.svg$/;
        }

        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};

module.exports = {
    turbopack: {
        rules: {
            '*.svg': {
                loaders: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            icon: true,
                            svgoConfig: {
                                plugins: [
                                    {
                                        name: 'convertColors',
                                        params: { currentColor: true }
                                    }
                                ]
                            }
                        }
                    },
                ],
                as: '*.js',
            },
        },
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'shift-intensive.ru',
            },
        ],
    },
}

export default nextConfig;
