import { Suspense } from 'react';
import { getNutritionData } from '../api/nutrition/route';
import NutritionAnalyzer from '../../components/NutritionAnalyzer';
import Sidebar from '../../components/Sidebar';

async function NutritionPage() {
  const nutritionData = await getNutritionData();

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">栄養分析</h1>
        <Suspense fallback={<div>栄養データを読み込んでいます...</div>}>
          <NutritionAnalyzer data={nutritionData} />
        </Suspense>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">栄養バランスの評価と改善提案</h2>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="mb-4">
              あなたの栄養バランスは全体的に良好ですが、以下の点で改善の余地があります：
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>タンパク質の摂取量が推奨量より少ない傾向にあります。魚や肉、豆類の摂取を増やすことをおすすめします。</li>
              <li>ビタミンCの摂取量が不足しています。柑橘類や緑黄色野菜を積極的に取り入れましょう。</li>
            </ul>
            <p>
              これらの点に注意して食事を調整することで、より健康的な栄養バランスを達成できます。
            </p>
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">目標設定と進捗管理</h2>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-medium mb-3">現在の目標</h3>
            <div className="mb-4">
              <p className="font-medium">1日のカロリー摂取量: 2000kcal</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">進捗: 75% (1500kcal / 2000kcal)</p>
            </div>
            <div>
              <p className="font-medium">タンパク質摂取量: 60g</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">進捗: 80% (48g / 60g)</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NutritionPage;