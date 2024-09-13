import { useState } from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'
import { ArrowUpDown, Calendar, Filter } from 'lucide-react'

type Meal = Database['public']['Tables']['meals']['Row']
type NutritionLog = Database['public']['Tables']['nutrition_logs']['Row']

export default async function MealHistory() {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const { data: meals, error: mealsError } = await supabase
    .from('meals')
    .select('*')
    .order('date', { ascending: false })

  const { data: nutritionLogs, error: nutritionError } = await supabase
    .from('nutrition_logs')
    .select('*')

  if (mealsError || nutritionError) {
    return <div className="text-red-500">エラーが発生しました。データを取得できません。</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">食事履歴</h1>
      
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <button className="btn btn-outline btn-sm">
            <Calendar className="w-4 h-4 mr-2" />
            日付フィルター
          </button>
          <button className="btn btn-outline btn-sm">
            <Filter className="w-4 h-4 mr-2" />
            食事タイプフィルター
          </button>
        </div>
        <button className="btn btn-outline btn-sm">
          <ArrowUpDown className="w-4 h-4 mr-2" />
          並べ替え
        </button>
      </div>

      <div className="space-y-8">
        {meals?.map((meal) => (
          <div key={meal.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{formatDate(meal.date)}</h2>
              <span className="badge badge-primary">{meal.meal_type}</span>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">食事内容:</h3>
              <p>{JSON.stringify(meal.content)}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">栄養摂取量サマリー:</h3>
              {nutritionLogs?.find(log => log.date === meal.date) ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>カロリー: {getNutritionValue(nutritionLogs, meal.date, 'calories')} kcal</div>
                  <div>タンパク質: {getNutritionValue(nutritionLogs, meal.date, 'protein')} g</div>
                  <div>炭水化物: {getNutritionValue(nutritionLogs, meal.date, 'carbs')} g</div>
                  <div>脂質: {getNutritionValue(nutritionLogs, meal.date, 'fat')} g</div>
                </div>
              ) : (
                <p>栄養情報が見つかりません</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getNutritionValue(logs: NutritionLog[] | null, date: string, key: string): number {
  const log = logs?.find(log => log.date === date)
  return log?.nutrition_data[key] || 0
}