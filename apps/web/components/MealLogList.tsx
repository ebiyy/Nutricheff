import { useState } from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { ChevronDown, ChevronUp, Edit, Trash2 } from 'lucide-react';

// 型定義
type Meal = {
  id: string;
  date: string;
  mealType: string;
  foodItems: { name: string; quantity: number; unit: string }[];
  totalCalories: number;
};

type MealLogListProps = {
  meals: Meal[];
};

export default function MealLogList({ meals }: MealLogListProps) {
  // 日付でグループ化された食事記録を作成
  const groupedMeals = meals.reduce((acc, meal) => {
    const date = meal.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date]!.push(meal);
    return acc;
  }, {} as Record<string, Meal[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedMeals).map(([date, dateMeals]) => (
        <div key={date} className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            {format(new Date(date), 'yyyy年M月d日（E）', { locale: ja })}
          </h2>
          <div className="space-y-4">
            {dateMeals.map((meal) => (
              <MealItem key={meal.id} meal={meal} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MealItem({ meal }: { meal: Meal }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{meal.mealType}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <button className="text-blue-500 hover:text-blue-700">
            <Edit size={20} />
          </button>
          <button className="text-red-500 hover:text-red-700">
            <Trash2 size={20} />
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-600">
            総カロリー: {meal.totalCalories} kcal
          </p>
          <ul className="list-disc list-inside">
            {meal.foodItems.map((item, index) => (
              <li key={index} className="text-sm">
                {item.name} - {item.quantity} {item.unit}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}