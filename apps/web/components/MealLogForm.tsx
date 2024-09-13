'use client';

import React, { useState } from 'react';
import { Utensils, Search, Clock, Plus } from 'lucide-react';

type FoodItem = {
  name: string;
  quantity: number;
  unit: string;
  calories: number;
};

const MealLogForm: React.FC = () => {
  const [mealType, setMealType] = useState<string>('');
  const [mealTime, setMealTime] = useState<string>('');
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAddFoodItem = () => {
    if (searchTerm.trim() === '') {
      setError('食品名を入力してください');
      return;
    }
    // 実際のアプリケーションでは、ここで食品データベースを検索し、
    // 栄養情報を取得する処理を実装します。
    const newItem: FoodItem = {
      name: searchTerm,
      quantity: 1,
      unit: 'サービング',
      calories: 100, // ダミーデータ
    };
    setFoodItems([...foodItems, newItem]);
    setSearchTerm('');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mealType === '' || mealTime === '' || foodItems.length === 0) {
      setError('すべての必須項目を入力してください');
      return;
    }
    // ここで食事記録をサーバーに送信する処理を実装します
    console.log('食事記録を送信:', { mealType, mealTime, foodItems });
    // フォームをリセット
    setMealType('');
    setMealTime('');
    setFoodItems([]);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">食事記録</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mealType">
          食事タイプ
        </label>
        <div className="relative">
          <select
            id="mealType"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="">選択してください</option>
            <option value="朝食">朝食</option>
            <option value="昼食">昼食</option>
            <option value="夕食">夕食</option>
            <option value="間食">間食</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <Utensils size={20} />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mealTime">
          食事時間
        </label>
        <div className="relative">
          <input
            type="time"
            id="mealTime"
            value={mealTime}
            onChange={(e) => setMealTime(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <Clock size={20} />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foodSearch">
          食品検索
        </label>
        <div className="flex">
          <input
            type="text"
            id="foodSearch"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="食品名を入力"
          />
          <button
            type="button"
            onClick={handleAddFoodItem}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">追加された食品</h3>
        <ul className="bg-gray-100 rounded p-2">
          {foodItems.map((item, index) => (
            <li key={index} className="mb-2 p-2 bg-white rounded shadow">
              {item.name} - {item.quantity} {item.unit} ({item.calories} kcal)
            </li>
          ))}
        </ul>
      </div>
      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          記録を保存
        </button>
      </div>
    </form>
  );
};

export default MealLogForm;