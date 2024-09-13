// app/inventory/page.tsx

import { Suspense } from 'react';
import Sidebar from '@/components/Sidebar';
import InventoryManager from '@/components/InventoryManager';
import { getInventory } from '@/app/api/inventory/route';

export default async function InventoryPage() {
  const inventory = await getInventory();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">食材在庫管理</h1>
        <Suspense fallback={<div>読み込み中...</div>}>
          <InventoryManager initialInventory={inventory} />
        </Suspense>
      </main>
    </div>
  );
}