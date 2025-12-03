import { defineConfig } from 'vitepress'
import { meta } from './meta'

export default defineConfig({
  title: 'COON',
  description: 'Token-efficient code compression format for Dart/Flutter and LLM contexts',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#60a5fa' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: meta.name }],
    ['meta', { property: 'og:description', content: meta.description }],
    ['meta', { property: 'og:url', content: meta.url }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: meta.name }],
    ['meta', { name: 'twitter:description', content: meta.description }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Reference', link: '/reference/api' },
      { text: 'CLI', link: '/cli/' },
      { text: 'Ecosystem', link: '/ecosystem/implementations' },
      {
        text: 'v1.0.0',
        items: [
          { text: 'Changelog', link: 'https://github.com/AffanShaikhsurab/COON/blob/master/CHANGELOG.md' },
          { text: 'Contributing', link: 'https://github.com/AffanShaikhsurab/COON/blob/master/CONTRIBUTING.md' },
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Format Overview', link: '/guide/format-overview' },
          ]
        },
        {
          text: 'Usage',
          items: [
            { text: 'LLM Integration', link: '/guide/llm-prompts' },
            { text: 'Benchmarks', link: '/guide/benchmarks' },
          ]
        }
      ],
      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'API Reference', link: '/reference/api' },
            { text: 'Syntax Cheatsheet', link: '/reference/syntax-cheatsheet' },
            { text: 'Specification', link: '/reference/spec' },
            { text: 'Efficiency Analysis', link: '/reference/efficiency-formalization' },
          ]
        }
      ],
      '/cli/': [
        {
          text: 'CLI',
          items: [
            { text: 'CLI Reference', link: '/cli/' },
          ]
        }
      ],
      '/ecosystem/': [
        {
          text: 'Ecosystem',
          items: [
            { text: 'Implementations', link: '/ecosystem/implementations' },
            { text: 'Tools & Playgrounds', link: '/ecosystem/tools-and-playgrounds' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AffanShaikhsurab/COON' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Affan Shaikhsurab'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/AffanShaikhsurab/COON/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
