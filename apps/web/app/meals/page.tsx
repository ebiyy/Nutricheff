import { Suspense } from 'react';
import { getMeals } from '@/app/api/meals/route';
import Sidebar from '@/components/Sidebar';
import MealLogger from '@/components/MealLogger';
import MealHistory from '@/components/MealHistory';

export const dynamic = 'force-dynamic';

async function MealsPage() {
  const meals = await getMeals();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">食事記録管理</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">新しい食事を記録</h2>
            <Suspense fallback={<div>読み込み中...</div>}>
              <MealLogger />
            </Suspense>
          </section>

          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">栄養摂取サマリー</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">総カロリー:</span>
                <span className="text-lg">{calculateTotalCalories(meals)} kcal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">タンパク質:</span>
                <span className="text-lg">{calculateTotalProtein(meals)} g</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">炭水化物:</span>
                <span className="text-lg">{calculateTotalCarbs(meals)} g</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">脂質:</span>
                <span className="text-lg">{calculateTotalFat(meals)} g</span>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">食事記録履歴</h2>
          <Suspense fallback={<div>読み込み中...</div>}>
            <MealHistory meals={meals} />
          </Suspense>
        </section>
      </main>
    </div>
  );
}

function calculateTotalCalories(meals) {
  return meals.reduce((total, meal) => total + (meal.calories || 0), 0);
}

function calculateTotalProtein(meals) {
  return meals.reduce((total, meal) => total + (meal.protein || 0), 0);
}

function calculateTotalCarbs(meals) {
  return meals.reduce((total, meal) => total + (meal.carbs || 0), 0);
}

function calculateTotalFat(meals) {
  return meals.reduce((total, meal) => total + (meal.fat || 0), 0);
}

export default MealsPage;