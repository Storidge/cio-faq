// /.vuepress/config.js

module.exports = {
    title: '', // Title of the website
    description: "Frequently asked questions",
    plugins: [
      [
        '@vuepress/google-analytics',
        {
          'ga': 'UA-102974094-1' // UA-00000000-0
        }
      ],
      {
        'sitemap': {
          hostname: 'https://pake.web.id'
        },
      }
    ],
    themeConfig: {
//        logo: 'https://storidge.com/wp-content/uploads/2019/04/logo_storidge_automated_2_370x100.png',
      lastUpdated: 'Last Updated',
      editLink: true,
      editLinkText: 'Help us improve this page!',
      sidebarDepth: 3,
      nav: [
          { text: 'Home', link: 'https://storidge.com', },
          { text: 'Guide', link: 'https://guide.storidge.com' },
          { text: 'Docs', link: 'https://docs.storidge.com' },
          { text: 'API', link: 'https://storidge.com/api' },
          { text: 'Support', link: 'https://storidge.com/support' }
      ],
        sidebar: [
          ['/', 'FAQ Home'],
          {
            title: 'Categories',
            collapsable: true,
            children: [
              '/general.md',
              '/cluster.md',
              '/data-services.md',
              '/docker-swarm.md',
              '/docker-volumes.md',
              '/drives.md',
              '/hardware.md',
              '/integrations.md',
              '/kubernetes-storage.md',
              '/license.md',
              '/nodes.md',
              '/profiles.md',
              '/software.md',
              '/troubleshooting.md'
            ]
          }
        ]
    }
}
