'use client';

import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, ShoppingCart, AlertTriangle } from 'lucide-react';

type Ingredient = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
};

type Props = {
  initialInventory: Ingredient[]
}

const InventoryManager: React.FC<Props> = ({ initialInventory }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialInventory);
  const [newIngredient, setNewIngredient] = useState<Omit<Ingredient, 'id'>>({
    name: '',
    quantity: 0,
    unit: '',
    expiryDate: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Fetch ingredients from API
    const dummyIngredients: Ingredient[] = [
      { id: '1', name: 'トマト', quantity: 5, unit: '個', expiryDate: '2023-06-30' },
      { id: '2', name: '牛乳', quantity: 1, unit: 'L', expiryDate: '2023-06-25' },
    ];
    setIngredients(dummyIngredients);
  }, []);

  const addIngredient = () => {
    // TODO: API call to add ingredient
    const id = Math.random().toString(36).substr(2, 9);
    setIngredients([...ingredients, { id, ...newIngredient }]);
    setNewIngredient({ name: '', quantity: 0, unit: '', expiryDate: '' });
  };

  const updateIngredient = (id: string) => {
    // TODO: API call to update ingredient
    setIngredients(ingredients.map(ing => ing.id === id ? { ...ing, ...newIngredient } : ing));
    setEditingId(null);
    setNewIngredient({ name: '', quantity: 0, unit: '', expiryDate: '' });
  };

  const deleteIngredient = (id: string) => {
    // TODO: API call to delete ingredient
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const generateShoppingList = () => {
    const lowStockIngredients = ingredients.filter(ing => ing.quantity <= 2);
    // TODO: Generate and display shopping list
    console.log('買い物リスト:', lowStockIngredients);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">食材在庫管理</h1>

      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">新しい食材を追加</h2>
        <div className="flex flex-wrap -mx-2">
          <input
            type="text"
            placeholder="食材名"
            value={newIngredient.name}
            onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
            className="m-2 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="数量"
            value={newIngredient.quantity}
            onChange={(e) => setNewIngredient({ ...newIngredient, quantity: Number(e.target.value) })}
            className="m-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="単位"
            value={newIngredient.unit}
            onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
            className="m-2 p-2 border rounded"
          />
          <input
            type="date"
            value={newIngredient.expiryDate}
            onChange={(e) => setNewIngredient({ ...newIngredient, expiryDate: e.target.value })}
            className="m-2 p-2 border rounded"
          />
          <button
            onClick={editingId ? () => updateIngredient(editingId) : addIngredient}
            className="m-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editingId ? '更新' : '追加'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">食材名</th>
              <th className="p-3 text-left">数量</th>
              <th className="p-3 text-left">単位</th>
              <th className="p-3 text-left">消費期限</th>
              <th className="p-3 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient) => (
              <tr key={ingredient.id} className="border-t">
                <td className="p-3">{ingredient.name}</td>
                <td className="p-3">{ingredient.quantity}</td>
                <td className="p-3">{ingredient.unit}</td>
                <td className="p-3">{ingredient.expiryDate}</td>
                <td className="p-3">
                  <button
                    onClick={() => {
                      setEditingId(ingredient.id);
                      setNewIngredient(ingredient);
                    }}
                    className="mr-2 text-blue-500 hover:text-blue-700"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => deleteIngredient(ingredient.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={generateShoppingList}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
        >
          <ShoppingCart size={18} className="mr-2" />
          買い物リスト生成
        </button>
        {ingredients.some(ing => ing.quantity <= 2) && (
          <div className="text-yellow-600 flex items-center">
            <AlertTriangle size={18} className="mr-2" />
            一部の食材の在庫が少なくなっています
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryManager;