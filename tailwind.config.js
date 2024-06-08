/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
    content: [
      './pages/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',
      './app/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}',
    ],
    theme: {
        screens: {
            sm: '0px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        fontFamily: {
            mulishRegular: 'MulishRegular',
            mulishMedium: 'MulishMedium',
            mulishSemiBold: 'MulishSemiBold',
        },
        // Semantic colors
        // Loosely adapted from: https://material.io/design/color/the-color-system.html#color-theme-creation
        colors: {
            primary: '#50A8FF',
            secondary: '#5AEBDD',

            primaryText: 'rgba(255, 255, 255, 0.8)',
            primaryTextHighlight: 'rgba(255, 255, 255, 1)',
            secondaryText: 'rgba(0, 0, 0, 0.8)',
            secondaryTextHighlight: 'rgba(0, 0, 0, 1)',

            background: '#111827',
            backgroundSecondary: '#1B212A',
            overlay: 'rgba(0, 0, 0, 0.8)',

            surface: 'rgba(255, 255, 255, 0.06)',
            surfaceLight: 'rgba(255, 255, 255, 0.8)',
            surfaceTooltip: 'rgba(17, 24, 39, 0.8)',

            surfaceDisabled: '#414651',
            textDisabled: '#737373',

            line: 'rgba(255, 255, 255, 0.2)',

            error: '#CA5F62',
            warning: '#EDB12C',
            positive: '#4ADE80',
            negative: '#F87171',

            disabled: '#6B7A97',

            black: '#000000',
            white: '#fff',
        },
        minWidth: (theme) => theme('spacing'),
        maxWidth: (theme) => theme('spacing'),
        minHeight: (theme) => theme('spacing'),
        maxHeight: (theme) => theme('spacing'),
        borderRadius: {
            // Legacy border-radius classes -> slowly migrate to new ones below
            none: '0',
            xl: '1.25 rem',
            '2xl': '1.5 rem',
            '3xl': '1.75 rem',
            DEFAULT: '1.25rem',

            // New border-radius classes
            sm: '4px', // Field
            md: '8px', // Button
            lg: '16px', // Card, containers, etc.
            full: '9999px', // Tab components, avatars, etc
        },
    },
    plugins: [
        plugin(({addUtilities}) => {
            addUtilities({
                // Text classes
                'tx-h1': 'text-48px leading-67px font-mulishRegular text-primaryText',
                'tx-h1-medium': 'text-48px leading-67px font-mulishMedium text-primaryText',
                'tx-h1-semibold': 'text-48px leading-67px font-mulishSemiBold text-primaryText',
                'tx-h2': 'text-40px leading-56px font-mulishRegular text-primaryText',
                'tx-h2-medium': 'text-40px leading-56px font-mulishMedium text-primaryText',
                'tx-h2-semibold': 'text-40px leading-56px font-mulishSemiBold text-primaryText',
                'tx-h3': 'text-32px leading-45px font-mulishRegular text-primaryText',
                'tx-h3-medium': 'text-32px leading-45px font-mulishMedium text-primaryText',
                'tx-h3-semibold': 'text-32px leading-45px font-mulishSemiBold text-primaryText',
                'tx-h4': 'text-28px leading-39px font-mulishRegular text-primaryText',
                'tx-h4-medium': 'text-28px leading-39px font-mulishMedium text-primaryText',
                'tx-h4-semibold': 'text-28px leading-39px font-mulishSemiBold text-primaryText',
                'tx-h5': 'text-24px leading-34px font-mulishRegular text-primaryText',
                'tx-h5-medium': 'text-24px leading-34px font-mulishMedium text-primaryText',
                'tx-h5-semibold': 'text-24px leading-34px font-mulishSemiBold text-primaryText',
                'tx-h6': 'text-20px leading-28px font-mulishRegular text-primaryText',
                'tx-h6-medium': 'text-20px leading-28px font-mulishMedium text-primaryText',
                'tx-h6-semibold': 'text-20px leading-28px font-mulishSemiBold text-primaryText',
                'tx-title': 'text-18px leading-25px font-mulishRegular text-primaryText',
                'tx-title-medium': 'text-18px leading-25px font-mulishMedium text-primaryText',
                'tx-title-semibold': 'text-18px leading-25px font-mulishSemiBold text-primaryText',
                'tx-body': 'text-16px leading-22px font-mulishRegular text-primaryText',
                'tx-body-medium': 'text-16px leading-22px font-mulishMedium text-primaryText',
                'tx-body-semibold': 'text-16px leading-22px font-mulishSemiBold text-primaryText',
                'tx-note': 'text-14px leading-20px font-mulishRegular text-primaryText',
                'tx-note-medium': 'text-14px leading-20px font-mulishMedium text-primaryText',
                'tx-note-semibold': 'text-14px leading-20px font-mulishSemiBold text-primaryText',
                'tx-small': 'text-12px leading-14px font-mulishRegular text-primaryText',
                'tx-small-medium': 'text-12px leading-14px font-mulishMedium text-primaryText',
                'tx-small-semibold': 'text-12px leading-14px font-mulishSemiBold text-primaryText',
                'tx-xsmall': 'text-10px leading-14px font-mulishRegular text-primaryText',
                'tx-xsmall-medium': 'text-10px leading-14px font-mulishMedium text-primaryText',
                'tx-xsmall-semibold': 'text-10px leading-14px font-mulishSemiBold text-primaryText',

                // Image resize mode
                'resize-cover': {resizeMode: 'cover'},
                'resize-contain': {resizeMode: 'contain'},
                'resize-stretch': {resizeMode: 'stretch'},
                'resize-repeat': {resizeMode: 'repeat'},
                'resize-center': {resizeMode: 'center'},

                // Custom utilities
                'outline-none': {outline: 'none'},
                'absolute-fill': 'absolute top-0 left-0 right-0 bottom-0',
                'absolute-footer': 'absolute left-0 right-0 bottom-0',
                'absolute-header': 'absolute left-0 right-0 top-0',
                debug: 'border-2 border-error',

                // Responsive container
                // Usage:
                // sm: modal, confirmation-dialog
                // md: bigger-modals, pages without sidebar visible
                // xl: pages with sidebar visible
                'app-container-sm': 'max-w-[540px] md:w-full md:mx-auto',
                'app-container-md': 'max-w-[720px] md:w-full md:mx-auto',
                'app-container-lg': 'max-w-[960px] md:w-full md:mx-auto',
                'app-container-xl': 'max-w-[1140px] md:w-full md:mx-auto',
            });
        }),
    ],
};
