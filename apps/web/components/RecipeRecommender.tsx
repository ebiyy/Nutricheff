'use client';

import React, { useState, useEffect } from 'react';
import { Utensils, Heart, ChevronDown, ChevronUp } from 'lucide-react';

type Recipe = {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
};

const RecipeRecommender: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [expandedRecipes, setExpandedRecipes] = useState<string[]>([]);

  useEffect(() => {
    // ここで実際にはAPIからレシピデータを取得します
    const fetchRecipes = async () => {
      // モックデータを使用
      const mockRecipes: Recipe[] = [
        {
          id: '1',
          name: '鶏肉と野菜の炒め物',
          ingredients: ['鶏むね肉', '玉ねぎ', 'ピーマン', '人参'],
          instructions: [
            '野菜を切る',
            '鶏肉を一口大に切る',
            'フライパンで炒める',
            '調味料で味付けする'
          ],
          nutritionInfo: {
            calories: 300,
            protein: 25,
            carbs: 15,
            fat: 10
          }
        },
        // 他のレシピも同様に追加
      ];
      setRecipes(mockRecipes);
    };

    fetchRecipes();
  }, []);

  const toggleFavorite = (recipeId: string) => {
    setFavorites(prev => 
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const toggleExpand = (recipeId: string) => {
    setExpandedRecipes(prev =>
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">おすすめレシピ</h2>
      <div className="space-y-4">
        {recipes.map(recipe => (
          <div key={recipe.id} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{recipe.name}</h3>
              <button
                onClick={() => toggleFavorite(recipe.id)}
                className={`p-2 rounded-full ${
                  favorites.includes(recipe.id) ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                <Heart />
              </button>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <Utensils className="mr-2" size={16} />
              <span>{recipe.ingredients.length}種類の材料</span>
            </div>
            <div className="mt-2">
              <button
                onClick={() => toggleExpand(recipe.id)}
                className="flex items-center text-blue-500"
              >
                {expandedRecipes.includes(recipe.id) ? (
                  <>
                    詳細を隠す
                    <ChevronUp className="ml-1" size={16} />
                  </>
                ) : (
                  <>
                    詳細を見る
                    <ChevronDown className="ml-1" size={16} />
                  </>
                )}
              </button>
            </div>
            {expandedRecipes.includes(recipe.id) && (
              <div className="mt-4">
                <h4 className="font-semibold">材料：</h4>
                <ul className="list-disc list-inside">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h4 className="font-semibold mt-2">調理手順：</h4>
                <ol className="list-decimal list-inside">
                  {recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
                <h4 className="font-semibold mt-2">栄養情報：</h4>
                <p>カロリー: {recipe.nutritionInfo.calories}kcal</p>
                <p>タンパク質: {recipe.nutritionInfo.protein}g</p>
                <p>炭水化物: {recipe.nutritionInfo.carbs}g</p>
                <p>脂質: {recipe.nutritionInfo.fat}g</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeRecommender;