import Link from 'next/link';
import { forwardRef } from 'react';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  className?: string;
  activeClassName?: string;
  children?: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, className, activeClassName, children, ...props }, ref) => {
    const router = useRouter();
    const isActive = router.asPath === href || router.asPath.startsWith(href + '/');

    return (
      <Link href={href} {...props} legacyBehavior>
        <a ref={ref} className={cn(className, isActive && activeClassName)}>
          {children}
        </a>
      </Link>
    );
  }
);

NavLink.displayName = 'NavLink';

export { NavLink };
