// /** @type {import('eslint').Linter.Config[]} */ 初始化模版示例
// export default [
//   {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   ...pluginVue.configs["flat/essential"],
//   {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
// ];

import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// import eslintConfigPrettier from "eslint-config-prettier";
import autoImportsConfig from './.eslintrc-auto-import.json' assert { type: 'json' };

// const autoImportsConfig = () => import('./.eslintrc-auto-import.json', { assert: { type: 'json' } });
export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,vue}']
    },
    {
        // 使 eslint 支持 node 与 ES6
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
                myCustomGlobal: 'readonly'
            }
        }
    },

    // 引入推荐的语法校验规则
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    // For flat configuration, this plugin ships with an eslint-plugin-prettier/recommended config that sets up both eslint-plugin-prettier and eslint-config-prettier in one go.
    eslintPluginPrettierRecommended, // 这个插件会 eslintConfigPrettier 冲突，导致无法自动修复
    //   eslintConfigPrettier, // // 关闭 ESLint 中与 Prettier 冲突的规则

    {
        files: ['**/*.{js,mjs,cjs,ts,vue}'],
        languageOptions: {
            parserOptions: {
                // 使用最新版 ES 语法
                ecmaVersion: 'latest',
                parser: tseslint.parser,
                // 使用 ES 模块化规范
                sourceType: 'module'
            },
            // vite.config.ts 中自动引入生成的文件
            ...autoImportsConfig
        },

        // 自定义规则
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            indent: [
                'error',
                4,
                {
                    SwitchCase: 1
                }
            ],
            'vue/multi-word-component-names': [
                'error',
                {
                    ignores: ['index', 'Header'] //需要忽略的组件名
                }
            ],
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            semi: 'off',
            '@typescript-eslint/no-this-alias': 'off',
            'eslintno-debugger': 'off',
            'vue/no-unused-vars': 'off',
            'vue/no-template-shadow': 'off',
            'vue/require-v-for-key': 'off',
            'vue/no-textarea-mustache': 'off',
            'vue/no-v-html': 'off'
        },
        ignores: [
            'node_modules',
            '*.md',
            '.vscode',
            '.idea',
            'dist',
            '/public',
            '/docs',
            '.husky',
            '.local',
            '/bin',
            'Dockerfile'
        ]
    }
];
