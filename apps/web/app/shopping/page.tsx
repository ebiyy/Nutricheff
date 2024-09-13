import { Suspense } from 'react';
import { headers } from 'next/headers';
import Sidebar from '../../components/Sidebar';
import ShoppingListGenerator from '../../components/ShoppingListGenerator';
import { getShoppingList } from '../api/shopping/route';

async function ShoppingPage() {
  const headersList = headers();
  const userId = headersList.get('x-user-id');

  if (!userId) {
    return <div className="text-red-500">エラー: ユーザーIDが見つかりません。</div>;
  }

  const shoppingList = await getShoppingList(userId);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">買い物リスト</h1>
        <Suspense fallback={<div>読み込み中...</div>}>
          <ShoppingListGenerator initialList={shoppingList} />
        </Suspense>
      </main>
    </div>
  );
}

export default ShoppingPage;