
module.exports = {
  title: '皮卡丘的前端体系',
  base: '/sy-fontend-system/', // 设置站点根目录
  description: '飘飘乎如遗世独立 羽化而登仙',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/pkq.jpeg'
      } 
    ]
  ],
  themeConfig: {
    editLinkText: '在 GitHub 上编辑此页',
    nav: [
      { 
        text: '前端',
        items: [
          {
            text: 'JavaScript基础知识',
            link: '/fontEnd/JS/'
          },
          {
            text: 'JS功能函数',
            link: '/fontEnd/functionMap/'
          },
          {
            text: 'node',
            link: '/fontEnd/Node/'
          },
          {
            text: 'JS提升阶段',
            link: '/fontEnd/Improve/'
          },
          {
            text: 'element-ui使用',
            link: '/fontEnd/ElementUI/'
          },
          {
            text: 'JavaScript的技巧',
            link: '/fontEnd/Skills/'
          },
          {
            text: '正则表达式',
            link: '/fontEnd/RegExr/'
          },
          {
            text: 'CSS',
            link: '/fontEnd/CSS/'
          },
        ]
      },
      {
        text: '计算机基础',
        items: [
          {
            text: '计算机基础',
            link: '/computerBasics/basic/'
          },
          {
            text: '数据结构和算法',
            link: '/computerBasics/algorithm/'
          },
          {
            text: 'leetcode算法',
            link: '/computerBasics/leetcode/'
          },
        ]
      },
      {
        text: '原生方法',
        items: [
          {
            text: 'Object',
            link: '/Native/Object/'
          },
          {
            text: 'JSON',
            link: '/Native/JSON/'
          },
        ]
      },
      // {
      //   text: 'python',
      //   link: '/python/'
      // },
      {
        text: '其他',
        items: [
          { text: '英文', link: '/Other/English/' },
          { text: '面试', link: '/Other/Interview/' },
          { text: '前端知乎好文连接', link: '/Other/fontendLink/' },
          {
            text: 'git指南',
            link: '/Other/Git/'
          }
        ]
      }
    ],
    sidebar: {
      '/fontEnd/JS/' : [
        {
          title: 'JavaScript基础知识',
          collapsable: false,
          children: [
            '/fontEnd/JS/'
          ]
        }
      ],
      '/fontEnd/functionMap/': [
        {
          title: 'JS功能函数',
          collapsable: false,
          children: [
            '/fontEnd/functionMap/'
          ]
        }
      ],
      '/fontEnd/Improve/': [
        {
          title: 'Js提升阶段',
          collapsable: false,
          children: [
            '/fontEnd/Improve/'
          ]
        }
      ],
      '/Native/Object/': [
        {
          title: 'Object',
          collapsable: false,
          children: [
            '/Native/Object/'
          ]
        }
      ],
      '/fontEnd/ElementUI/': [
        {
          title: 'ElementUI的使用',
          collapsable: false,
          children: [
            '/fontEnd/ElementUI/'
          ]
        }
      ],
      '/fontEnd/Skills/': [
        {
          title: 'JavaScript开发技巧',
          collapsable: false,
          children: [
            '/fontEnd/Skills/'
          ]
        }
      ],
      '/fontEnd/RegExr/': [
        {
          title: '正则表达式',
          collapsable: false,
          link: '/fontEnd/RegExr/'
        }
      ],
      '/Other/English/': [
        {
          title: '英文',
          collapsable: false,
          children: [
            '/Other/English/'
          ]
        }
      ],
      '/Other/Interview/': [
        {
          title: '面试',
          collapsable: false,
          children: [
            '/Other/Interview/'
          ]
        }
      ],
      '/Other/fontendLink/': [
        {
          title: '前端知乎好文链接',
          collapsable: false,
          children: [
            '/Other/fontendLink/'
          ]
        }
      ],
      '/computerBasics/basic/': [
        {
          title: '计算机基础',
          collapsable: false,
          children: [
            '/computerBasics/basic/'
          ]
        }
      ],
      '/computerBasics/algorithm/': [
        {
          title: '数据结构和算法',
          collapsable: false,
          children: [
            '/computerBasics/algorithm/'
          ]
        }
      ],
      '/computerBasics/leetcode/': [
        {
          title: 'leetcode算法题',
          collapsable: false,
          children: [
            '/computerBasics/leetcode/'
          ]
        }
      ],
      '/fontEnd/CSS/': [
        {
          title: 'CSS',
          collapsable: false,
          children: [
            '/fontEnd/CSS/'
          ]
        }
      ],
      '/Native/JSON/': [
        {
          title: 'JSON',
          collapsable: false,
          children: [
            '/Native/JSON/'
          ]
        }
      ],
      '/Other/Git/': [
        {
          title: 'Git',
          collapsable: false,
          children: [
            '/Other/Git/'
          ]
        }
      ]
    },
    repo: 'facebook201/sy-fontend-system', // github 地址
    docsRepo: 'facebook201/sy-fontend-system',
    docsDir: 'docs',
    editLinks: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@public': './public'
      }
    }
  }
};

