import { Metadata } from 'next'
import Sidebar from '@/components/Sidebar'
import { getRecentMeals, getNutritionSummary, getLowStockIngredients, getRecommendedRecipes } from '@/app/api/dashboard/route'

export const metadata: Metadata = {
  title: 'ダッシュボード - NutriChef',
  description: 'NutriChefのダッシュボード - あなたの食生活を一目で確認',
}

export default async function DashboardPage() {
  const recentMeals = await getRecentMeals()
  const nutritionSummary = await getNutritionSummary()
  const lowStockIngredients = await getLowStockIngredients()
  const recommendedRecipes = await getRecommendedRecipes()

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8">ダッシュボード</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 最近の食事記録サマリー */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">最近の食事記録</h2>
            <ul>
              {recentMeals.map((meal, index) => (
                <li key={index} className="mb-2">
                  {meal.date}: {meal.description}
                </li>
              ))}
            </ul>
          </section>

          {/* 栄養摂取状況の概要グラフ */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">栄養摂取状況</h2>
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              {/* ここに実際のグラフコンポーネントを挿入 */}
              <p className="text-gray-500">栄養摂取状況グラフ</p>
            </div>
            <ul className="mt-4">
              {Object.entries(nutritionSummary).map(([nutrient, value]) => (
                <li key={nutrient} className="flex justify-between">
                  <span>{nutrient}</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 食材在庫の警告表示 */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">食材在庫警告</h2>
            {lowStockIngredients.length > 0 ? (
              <ul className="text-red-500">
                {lowStockIngredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            ) : (
              <p className="text-green-500">在庫は十分です</p>
            )}
          </section>

          {/* 推奨レシピへのクイックアクセス */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">おすすめレシピ</h2>
            <ul>
              {recommendedRecipes.map((recipe, index) => (
                <li key={index} className="mb-2">
                  <a href={`/recipes/${recipe.id}`} className="text-blue-600 hover:underline">
                    {recipe.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}