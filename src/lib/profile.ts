// 联系方式与社交链接:关于页与页脚共用同一份数据(规格第三节)。
// 全部占位,等用户提供真实内容。邮箱拆成两段存放,配合构建出的小脚本拼装,
// 网页源码里不出现明文地址(防爬,规格第四节)。

export const email = {
  user: 'hello', // 占位
  domain: 'example.com', // 占位
};

/** href 为空 = 待补:页面显示灰字,不出链接 */
export const socials: { label: string; href: string }[] = [
  { label: 'Instagram', href: '' },
  { label: 'Behance', href: '' },
  { label: '小红书', href: '' },
];
