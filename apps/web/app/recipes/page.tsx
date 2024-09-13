import { Suspense } from 'react';
import Sidebar from '@/components/Sidebar';
import RecipeRecommender from '@/components/RecipeRecommender';
import { getRecipes } from '@/app/api/recipes/route';

async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">レシピ推奨</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <Suspense fallback={<div>レシピを読み込み中...</div>}>
            <RecipeRecommender recipes={recipes} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default RecipesPage;