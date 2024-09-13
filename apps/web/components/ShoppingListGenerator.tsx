'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Share2 } from 'lucide-react';

type ShoppingItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
};

const ShoppingListGenerator: React.FC = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, unit: '個' });

  useEffect(() => {
    // 在庫不足食材の自動リスト化（仮のデータ）
    const lowStockItems: ShoppingItem[] = [
      { id: '1', name: '牛乳', quantity: 1, unit: 'L' },
      { id: '2', name: '卵', quantity: 1, unit: 'パック' },
    ];
    setShoppingList(lowStockItems);
  }, []);

  const addItem = () => {
    if (newItem.name) {
      setShoppingList([...shoppingList, { ...newItem, id: Date.now().toString() }]);
      setNewItem({ name: '', quantity: 1, unit: '個' });
    }
  };

  const removeItem = (id: string) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };

  const saveList = () => {
    // ここでリストの保存処理を実装（例：ローカルストレージに保存）
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    alert('買い物リストを保存しました');
  };

  const shareList = () => {
    // ここでリストの共有処理を実装（例：クリップボードにコピー）
    const listText = shoppingList.map(item => `${item.name} ${item.quantity}${item.unit}`).join('\n');
    navigator.clipboard.writeText(listText);
    alert('買い物リストをクリップボードにコピーしました');
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-gray-200">
        <h2 className="text-xl font-bold text-gray-800">買い物リスト</h2>
      </div>
      <div className="p-4">
        <ul className="mb-4">
          {shoppingList.map(item => (
            <li key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name} - {item.quantity}{item.unit}</span>
              <button onClick={() => removeItem(item.id)} className="text-red-500">
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex mb-4">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="食材名"
            className="flex-grow mr-2 p-2 border rounded"
          />
          <input
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
            min="1"
            className="w-16 mr-2 p-2 border rounded"
          />
          <select
            value={newItem.unit}
            onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
            className="w-20 mr-2 p-2 border rounded"
          >
            <option value="個">個</option>
            <option value="g">g</option>
            <option value="ml">ml</option>
            <option value="パック">パック</option>
          </select>
          <button onClick={addItem} className="bg-blue-500 text-white p-2 rounded">
            <Plus size={18} />
          </button>
        </div>
        <div className="flex justify-between">
          <button onClick={saveList} className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
            <Save size={18} className="mr-2" /> 保存
          </button>
          <button onClick={shareList} className="bg-purple-500 text-white px-4 py-2 rounded flex items-center">
            <Share2 size={18} className="mr-2" /> 共有
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListGenerator;