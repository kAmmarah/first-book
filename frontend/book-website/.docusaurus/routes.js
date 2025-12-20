import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'df4'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/authors',
    component: ComponentCreator('/blog/authors', '0b7'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/ai',
    component: ComponentCreator('/blog/tags/ai', '90f'),
    exact: true
  },
  {
    path: '/blog/tags/education',
    component: ComponentCreator('/blog/tags/education', '57a'),
    exact: true
  },
  {
    path: '/blog/tags/personalization',
    component: ComponentCreator('/blog/tags/personalization', 'cc0'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', 'bbd'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'a89'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '4ca'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '4ab'),
            routes: [
              {
                path: '/docs/chapter1',
                component: ComponentCreator('/docs/chapter1', '397'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '61d'),
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
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
