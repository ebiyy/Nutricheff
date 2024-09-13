'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book, ShoppingCart, PieChart, Utensils, List, Target, LayoutDashboard, User } from 'lucide-react';

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const navItems = [
    { name: 'ダッシュボード', path: '/dashboard', icon: LayoutDashboard },
    { name: '食事記録', path: '/meals', icon: Book },
    { name: '食材在庫', path: '/ingredients', icon: ShoppingCart },
    { name: '栄養分析', path: '/nutrition', icon: PieChart },
    { name: 'レシピ推奨', path: '/recipes', icon: Utensils },
    { name: '買い物リスト', path: '/shopping-list', icon: List },
    { name: '目標管理', path: '/goals', icon: Target },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-800 text-white w-64 py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center">NutriChef</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path}>
                <span
                  className={`flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors ${
                    activeLink === item.path ? 'bg-gray-700' : ''
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <div className="flex items-center p-4 bg-gray-700 rounded-lg">
          <User className="h-8 w-8 mr-3" />
          <div>
            <p className="font-semibold">ユーザー名</p>
            <p className="text-sm text-gray-300">user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;