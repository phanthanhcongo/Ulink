import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1280px' }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          strong: 'hsl(var(--brand-strong))',
          foreground: 'hsl(var(--brand-foreground))'
        },
        blue: {
          50: 'hsl(214 100% 96%)',
          100: 'hsl(214 100% 92%)',
          200: 'hsl(214 95% 85%)',
          300: 'hsl(214 88% 75%)',
          400: 'hsl(214 83% 63%)',
          500: 'hsl(214 80% 54%)',
          600: 'hsl(var(--brand))',
          700: 'hsl(var(--brand-strong))',
          800: 'hsl(214 78% 34%)',
          900: 'hsl(214 78% 26%)'
        },
        sky: {
          50: 'hsl(214 100% 96%)',
          100: 'hsl(214 100% 92%)',
          200: 'hsl(214 95% 85%)',
          300: 'hsl(214 88% 75%)',
          400: 'hsl(214 83% 63%)',
          500: 'hsl(214 80% 54%)',
          600: 'hsl(var(--brand))',
          700: 'hsl(var(--brand-strong))',
          800: 'hsl(214 78% 34%)',
          900: 'hsl(214 78% 26%)'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        silver: 'hsl(var(--silver))',
        onyx: 'hsl(var(--onyx))'
      },
      borderRadius: {
        base: '3px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace']
      }
    }
  },
  plugins: [animate]
};

export default config;
