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
      primary: '#2979FF',
      success: '#17BE6B',
      warning: '#FE9800',
      error: '#F93534',
      info: '#8F9399',
    },
    textColor: {
      title: '#323233', // 标题
      content: '#646566', // 普通正文
      secondary: '#909399', // 次要信息，注释/补充/正文
      tip: '#969799', // 失效、默认提示文字
      placeholder: '#969799', // 失效、默认提示文字
      aid: '#C8C9CC', // 不可点击
      disabled: '#C8C9CC', // 不可点击
    },
    borderColor: {
      light: '#E4E7Ed', // 适用于较细或者分割线
      lighter: '#EBEEf5', // 适用于较细或者分割线
      lighter1: '#F2F6Fc', // 用于次要的边框
      dark: '#D4D7DE', // 更深的灰色，用于主要边框
      darker: '#CDD0D6', // 增强暗色背景下的视觉层次感
    },
    backgroundColor: {
      light: '#FFFFFF',
      light1: '#F7F8FA',
      light2: '#F2F3F5',
    },
    fontSize: {
      xs: '10px', // 超小字体，适合标签或辅助信息
      sm: '12px', // 小字体，适合次要信息或描述文本
      base: '14px', // 基础字体，一般用于正文内容
      md: '16px', // 较大字体，适合标题或重要信息
      lg: '18px', // 特大字体，适合主要标题
      xl: '20px', // 超大字体，用于页面的主标题或醒目内容
      xxl: '36px', // 超大字体，用于页面的主标题或醒目内容
    },
    spacing: {
      xs: '8px', // 极小的间距，适合小按钮或图标内边距
      sm: '16px', // 小间距，用于小型组件或列表项
      md: '24px', // 中等间距，适合常见的卡片、内容分区
      lg: '32px', // 较大间距，用于主内容区域分隔
      xl: '48px', // 超大间距，适合页面大块留白和边距
    },
  },
  presets: [
    presetUno(),
    presetTheme<Theme>({
      theme: {
        dark: {
          colors: {
            primary: '#2B84E4',
            success: '#18B565',
            warning: '#F29100',
            error: '#DD6161',
            info: '#82848A',
          },
          textColor: {
            title: '#E0E0E0', // 标题，稍亮以便与深色背景对比
            content: '#CFD2D6', // 普通正文，亮灰色
            secondary: '#A3A6AC', // 次要信息，稍暗的灰色
            tip: '#8A8D93', // 提示文字
            placeholder: '#7E8187', // 占位符
            aid: '#5E6168', // 不可点击
            disabled: '#5E6168', // 不可点击
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

  shortcuts: [
    ['text-break', 'whitespace-normal break-all break-words'], // 文本溢出换行
    ['text-overflow', 'overflow-hidden whitespace-nowrap text-ellipsis'], // 文本溢出显示省略号
    ['wh-full', 'w-full h-full'],

    ['th-btn', 'rounded-md bg-white p-xs shadow-md'],
    ['th-center', 'flex justify-center items-center'],
    ['th-content', 'text-content leading-normal text-base'],
    ['th-secondary', 'text-secondary  leading-normal text-base'],
    ['th-tip', 'text-tip  leading-normal text-sm'],
    ['th-aid', 'text-aid leading-normal'],
    ['th-page', 'bg-light1'],
    ['th-white', 'bg-white'],
    ['th-card', 'bg-white'],
    [/^th-gray-(.*)$/, ([, d]) => `bg-gray-${d} dark:bg-dark`],

    ['th-title', 'text-light-title dark:text-dark-title text-md font-500 leading-normal  leading-[1.4]'],
    [/^th-title-(md|lg|xl|xxl)$/, ([, size]) => `text-light-title dark:text-dark-title text-${size} font-500  leading-[1.4]`],

    [/^th-text-(primary|success|warning|error|info)-(xs|sm|md|lg|xl)$/, ([, type, size]) => `text-${type} dark:text-dark-${type} text-${size} leading-normal`],
    [/^th-(light|dark)-(content|secondary|tip|aid)-(xs|sm|md|lg|base)$/, ([, theme, style, size]) => `text-${theme}-${style} text-${size} leading-normal`],
    [/^th-(content|secondary|tip|aid)-(xs|sm|md|lg|base)$/, ([, style, size]) => `text-light-${style}  dark:text-dark-${style} text-${size} leading-normal`],
    [/^th-page-(xs|sm|md|lg|xl)$/, ([, padding]) => `bg-light dark:bg-dark p-${padding} `],
    [/^th-page-(light)-(xs|sm|md|lg|xl)$/, ([, light, padding]) => `bg-${light} dark:bg-dark p-${padding} `],

    [/^th-btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
    [/^wh-(.*)$/, ([, d]) => `w-[${d}] h-[${d}]`],
],

  transformers: [transformerVariantGroup(), transformerDirectives()],
});
