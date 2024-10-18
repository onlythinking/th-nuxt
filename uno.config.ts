import type { Theme } from 'unocss/preset-uno';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import presetIcons from '@unocss/preset-icons';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import { defineConfig, presetAttributify, presetTypography, presetUno } from 'unocss';
import presetChinese from 'unocss-preset-chinese';
import presetTheme from 'unocss-preset-theme';

export default defineConfig<Theme>({
  theme: {
    colors: {
      'primary': '#1677ff',
      'primary-border': '#1677ff',
      'text': 'rgba(0, 0, 0, 0.88)',
      'container': '#ffffff',
      'border': '#d9d9d9',
    },
    textColor: {},
    borderColor: {},
    spacing: {
      xss: '4px',
      xs: '8px',
      sm: '12px',
      base: '16px',
      lg: '24px',
      xl: '32px',
    },
  },
  presets: [
    presetUno(),
    presetTheme<Theme>({
      theme: {
        dark: {
          colors: {
            'primary': '#1668dc',
            'primary-border': '#1668dc',
            'border': '#424242',
            'container': '#141414',
            'text': 'rgba(255, 255, 255, 0.85)',
          },
        },
        compact: {
          spacing: {
            xss: '2px',
            xs: '4px',
            sm: '6px',
            base: '8px',
            lg: '12px',
            xl: '16px',
          },
        },
      },
    }),
    presetIcons({
      // https://icon-sets.iconify.design/
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        custom: FileSystemIconLoader('./assets/icons', svg =>
          svg.replace(/#fff/, 'currentColor')),
      },
    }),

    presetAttributify(),
    presetTypography(),
    presetChinese({
      chineseType: 'simplified', // 指定文本为简体中文
    }),
  ],

  shortcuts: {
    'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
    'btn-green': 'text-white bg-green-500 hover:bg-green-700',
    // single utility alias
    'center': 'flex justify-center items-center', // flex布局居中
    'flex-x-center': 'flex justify-center', // flex布局：主轴居中
    'flex-y-center': 'flex items-center', // flex布局：交叉轴居中
    'm-0-auto': 'm-0 ma', // margin: 0 auto
    'text-break': 'whitespace-normal break-all break-words', // 文本溢出换行
    'text-overflow': 'overflow-hidden whitespace-nowrap text-ellipsis', // 文本溢出显示省略号
    'wh-full': 'w-full h-full', // width: 100%, height: 100%
  },

  transformers: [transformerVariantGroup(), transformerDirectives()],
});
