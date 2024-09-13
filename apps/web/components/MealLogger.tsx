'use client';

import React, { useState } from 'react';
import { Camera, Search, Plus } from 'lucide-react';

type FoodItem = {
  name: string;
  quantity: number;
  unit: string;
  calories: number;
};

const MealLogger: React.FC = () => {
  const [mealType, setMealType] = useState<string>('朝食');
  const [mealTime, setMealTime] = useState<string>('');
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [photo, setPhoto] = useState<File | null>(null);

  const handleAddFoodItem = () => {
    if (searchTerm.trim() !== '') {
      const newItem: FoodItem = {
        name: searchTerm,
        quantity: 1,
        unit: 'g',
        calories: 0, // 仮の値、実際には栄養情報APIから取得する
      };
      setFoodItems([...foodItems, newItem]);
      setSearchTerm('');
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // ここで食事記録をサーバーに送信する処理を実装
    console.log('食事記録:', { mealType, mealTime, foodItems, photo });
    // 送信後、フォームをリセット
    setFoodItems([]);
    setPhoto(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">食事記録</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            食事の種類
          </label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="朝食">朝食</option>
            <option value="昼食">昼食</option>
            <option value="夕食">夕食</option>
            <option value="間食">間食</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            食事時間
          </label>
          <input
            type="time"
            value={mealTime}
            onChange={(e) => setMealTime(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            食品を追加
          </label>
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="食品名を入力"
              className="flex-grow px-3 py-2 border rounded-l-md"
            />
            <button
              type="button"
              onClick={handleAddFoodItem}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">追加された食品</h3>
          <ul className="space-y-2">
            {foodItems.map((item, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <span>{item.name}</span>
                <span>{item.quantity}{item.unit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            写真をアップロード（オプション）
          </label>
          <div className="flex items-center">
            <label className="flex items-center justify-center w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300">
              <Camera size={20} className="mr-2" />
              写真を選択
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
            {photo && <span className="ml-2 text-sm text-gray-600">{photo.name}</span>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          記録を保存
        </button>
      </form>
    </div>
  );
};

export default MealLogger;