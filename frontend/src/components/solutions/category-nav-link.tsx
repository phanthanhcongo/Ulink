'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { setPendingCategoryFilter } from '@/lib/filter-session';

interface CategoryNavLinkProps {
  categorySlug?: string;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function CategoryNavLink({
  categorySlug,
  href = '/solutions/listProduct',
  className,
  children
}: CategoryNavLinkProps) {
  const handleClick = () => {
    if (categorySlug) {
      setPendingCategoryFilter(categorySlug);
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
