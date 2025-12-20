import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/first-book/__docusaurus/debug',
    component: ComponentCreator('/first-book/__docusaurus/debug', 'e25'),
    exact: true
  },
  {
    path: '/first-book/__docusaurus/debug/config',
    component: ComponentCreator('/first-book/__docusaurus/debug/config', 'cc9'),
    exact: true
  },
  {
    path: '/first-book/__docusaurus/debug/content',
    component: ComponentCreator('/first-book/__docusaurus/debug/content', '94e'),
    exact: true
  },
  {
    path: '/first-book/__docusaurus/debug/globalData',
    component: ComponentCreator('/first-book/__docusaurus/debug/globalData', 'bbb'),
    exact: true
  },
  {
    path: '/first-book/__docusaurus/debug/metadata',
    component: ComponentCreator('/first-book/__docusaurus/debug/metadata', '147'),
    exact: true
  },
  {
    path: '/first-book/__docusaurus/debug/registry',
    component: ComponentCreator('/first-book/__docusaurus/debug/registry', '57c'),
    exact: true
  },
  {
    path: '/first-book/__docusaurus/debug/routes',
    component: ComponentCreator('/first-book/__docusaurus/debug/routes', '15b'),
    exact: true
  },
  {
    path: '/first-book/blog',
    component: ComponentCreator('/first-book/blog', 'e2d'),
    exact: true
  },
  {
    path: '/first-book/blog/archive',
    component: ComponentCreator('/first-book/blog/archive', '115'),
    exact: true
  },
  {
    path: '/first-book/blog/authors',
    component: ComponentCreator('/first-book/blog/authors', '1af'),
    exact: true
  },
  {
    path: '/first-book/blog/tags',
    component: ComponentCreator('/first-book/blog/tags', '1c5'),
    exact: true
  },
  {
    path: '/first-book/blog/tags/ai',
    component: ComponentCreator('/first-book/blog/tags/ai', '720'),
    exact: true
  },
  {
    path: '/first-book/blog/tags/education',
    component: ComponentCreator('/first-book/blog/tags/education', '1ec'),
    exact: true
  },
  {
    path: '/first-book/blog/tags/personalization',
    component: ComponentCreator('/first-book/blog/tags/personalization', '615'),
    exact: true
  },
  {
    path: '/first-book/blog/welcome',
    component: ComponentCreator('/first-book/blog/welcome', '7af'),
    exact: true
  },
  {
    path: '/first-book/docs',
    component: ComponentCreator('/first-book/docs', '00b'),
    routes: [
      {
        path: '/first-book/docs',
        component: ComponentCreator('/first-book/docs', 'de5'),
        routes: [
          {
            path: '/first-book/docs',
            component: ComponentCreator('/first-book/docs', 'aa8'),
            routes: [
              {
                path: '/first-book/docs/chapter1',
                component: ComponentCreator('/first-book/docs/chapter1', 'b62'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/first-book/docs/intro',
                component: ComponentCreator('/first-book/docs/intro', '94c'),
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
    path: '/first-book/',
    component: ComponentCreator('/first-book/', '5f4'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
