import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'ac1'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '64e'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', 'a1a'),
    exact: true
  },
  {
    path: '/blog/tags/ai',
    component: ComponentCreator('/blog/tags/ai', '233'),
    exact: true
  },
  {
    path: '/blog/tags/education',
    component: ComponentCreator('/blog/tags/education', '623'),
    exact: true
  },
  {
    path: '/blog/tags/personalization',
    component: ComponentCreator('/blog/tags/personalization', '72e'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', '4b3'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '033'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'a44'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'a61'),
            routes: [
              {
                path: '/docs/chapter1',
                component: ComponentCreator('/docs/chapter1', 'b63'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', 'aed'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '480'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
