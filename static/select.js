export const data = [
  {
    label: '表演艺术类',
    value: 'performance',
    children: [
      {
        label: '歌手类',
        value: 'singer',
        children: [
          { label: '音乐剧', value: 'musical' },
          { label: '通俗', value: 'pop' },
          { label: '美声', value: 'bel_canto' },
          { label: '民歌', value: 'folk_song' },
          { label: '民族', value: 'ethnic' },
          { label: '流行', value: 'popular' },
          { label: '说唱', value: 'rap' },
        ],
      },
      {
        label: '乐队类',
        value: 'band',
        children: [
          { label: '民乐', value: 'folk_music' },
          { label: '流行音乐', value: 'popular_music' },
        ],
      },
      {
        label: '舞蹈',
        value: 'dance',
        children: [
          { label: '民族舞', value: 'ethnic_dance' },
          { label: '古典舞', value: 'classical_dance' },
          { label: '芭蕾舞', value: 'ballet' },
          { label: '爵士舞', value: 'jazz_dance' },
          { label: '现代舞', value: 'modern_dance' },
          { label: '流行热舞', value: 'hot_dance' },
        ],
      },
      {
        label: '非遗',
        value: 'intangible_cultural_heritage',
        children: [
          { label: '国家级', value: 'national' },
          { label: '省级', value: 'provincial' },
          { label: '其他', value: 'other' },
        ],
      },
      {
        label: '器乐',
        value: 'instrumental',
        children: [
          { label: '西洋乐器', value: 'western_instruments' },
          { label: '中国民乐', value: 'chinese_folk_music' },
        ],
      },
      { label: '戏曲', value: 'opera' },
      { label: '特技/绝技绝活', value: 'stunts' },
      {
        label: '杂技',
        value: 'acrobatics',
        children: [
          { label: '高空', value: 'aerial' },
          { label: '传统', value: 'traditional' },
        ],
      },
      {
        label: '魔术',
        value: 'magic',
        children: [
          { label: '大型魔术', value: 'grand_magic' },
          { label: '近景魔术', value: 'close_up_magic' },
          { label: '互动魔术', value: 'interactive_magic' },
        ],
      },
      {
        label: '武术',
        value: 'martial_arts',
        children: [
          { label: '武术套路', value: 'routines' },
          { label: '拳', value: 'fist' },
          { label: '太极', value: 'taichi' },
          { label: '剑', value: 'sword' },
          { label: '刀', value: 'knife' },
          { label: '棍', value: 'stick' },
          { label: '枪', value: 'spear' },
        ],
      },
      { label: '戏剧表演', value: 'drama' },
    ],
  },
  {
    label: '技术支持类',
    value: 'technical_support',
    children: [
      { label: '舞美设计', value: 'stage_design' },
      {
        label: '灯光师',
        value: 'lighting',
        children: [
          { label: '灯光设计', value: 'lighting_design' },
          { label: '灯光技师', value: 'lighting_technician' },
        ],
      },
      {
        label: '音响师',
        value: 'sound',
        children: [
          { label: '音响设计', value: 'sound_design' },
          { label: '音响技师', value: 'sound_technician' },
        ],
      },
      { label: '服装设计', value: 'costume_design' },
      { label: '服装管理', value: 'costume_management' },
      { label: '多媒体', value: 'multimedia' },
      { label: '场务', value: 'stage_management' },
    ],
  },
];