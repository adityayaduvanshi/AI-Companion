'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Plus, Settings } from 'lucide-react';
import { useProModal } from '@/hooks/use-pro-modal';

const routes = [
  { icon: Home, href: '/', label: 'Home', pro: false },
  { icon: Plus, href: '/companion/new', label: 'Create', pro: true },
  { icon: Settings, href: '/settings', label: 'Settings', pro: false },
];

interface SidebarProps {
  isPro: boolean;
}

const Sidebar = ({ isPro }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const proModal = useProModal();

  const onNavigate = (url: string, pro: boolean) => {
    if (pro && !isPro) {
      return proModal.onOpen();
    }

    return router.push(url);
  };
  return (
    <div className=" space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-3 flex flex-1 justify-center">
        <div className=" space-y-2 ">
          {routes.map((route) => (
            <div
              className={cn(
                'text-muted-foreground text-xs group flex p-3 w-full justify-start cursor-pointer font-medium hover:text-primary hover:bg-primary/10 rounded-lg transition',
                pathname === route.href && 'bg-primary/10 text-primary'
              )}
              key={route.href}
              onClick={() => onNavigate(route.href, route.pro)}
            >
              <div className=" flex flex-col  gap-y-2 items-center flex-1 ">
                <route.icon className="h-5 w-5" />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
