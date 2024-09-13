import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import MealLogForm from '@/components/MealLogForm';
import MealLogList from '@/components/MealLogList';

async function getMealLogs() {
  const res = await fetch('http://localhost:3000/api/meals', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch meal logs');
  }
  return res.json();
}

async function getNutritionSummary() {
  const res = await fetch('http://localhost:3000/api/nutrition/summary', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch nutrition summary');
  }
  return res.json();
}

export default async function MealLogPage() {
  let mealLogs;
  let nutritionSummary;

  try {
    [mealLogs, nutritionSummary] = await Promise.all([getMealLogs(), getNutritionSummary()]);
  } catch (error) {
    console.error('Error fetching data:', error);
    notFound();
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8">食事記録</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">新しい食事を記録</h2>
          <Suspense fallback={<div>読み込み中...</div>}>
            <MealLogForm />
          </Suspense>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">過去の食事記録</h2>
          <Suspense fallback={<div>読み込み中...</div>}>
            <MealLogList meals={mealLogs} />
          </Suspense>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">栄養摂取サマリー</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium mb-4">本日の摂取量</h3>
            <ul>
              <li>カロリー: {nutritionSummary.calories} kcal</li>
              <li>タンパク質: {nutritionSummary.protein} g</li>
              <li>炭水化物: {nutritionSummary.carbs} g</li>
              <li>脂質: {nutritionSummary.fat} g</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}