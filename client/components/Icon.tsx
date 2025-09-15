import React from 'react';
import { cn } from '@/lib/utils';

import cart from '@/assets/icons/icon-cart.svg?raw';
import user from '@/assets/icons/icon-user.svg?raw';
import search from '@/assets/icons/icon-search.svg?raw';
import heart from '@/assets/icons/icon-heart.svg?raw';
import filter from '@/assets/icons/icon-filter.svg?raw';
import menu from '@/assets/icons/icon-menu.svg?raw';
import close from '@/assets/icons/icon-close.svg?raw';
import delivery from '@/assets/icons/icon-delivery.svg?raw';
import discount from '@/assets/icons/icon-discount.svg?raw';
import wholesale from '@/assets/icons/icon-wholesale.svg?raw';
import phone from '@/assets/icons/icon-phone.svg?raw';
import mail from '@/assets/icons/icon-mail.svg?raw';
import compare from '@/assets/icons/icon-compare.svg?raw';
import favorites from '@/assets/icons/icon-favorites.svg?raw';
import viewed from '@/assets/icons/icon-viewed.svg?raw';

const icons = {
  cart,
  user,
  search,
  heart,
  filter,
  menu,
  close,
  delivery,
  discount,
  wholesale,
  phone,
  mail,
  compare,
  favorites,
  viewed,
} as const;

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
  const svg = icons[name];
  return (
    <span
      className={cn('inline-block align-middle', className)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svg }}
      aria-hidden="true"
    />
  );
};

export default Icon;
