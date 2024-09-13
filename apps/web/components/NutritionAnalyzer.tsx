'use client';

import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

type NutritionData = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  vitamins: { [key: string]: number };
  minerals: { [key: string]: number };
};

type Goal = {
  type: string;
  target: number;
  current: number;
};

const NutritionAnalyzer: React.FC = () => {
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    // ここでAPIからデータを取得する想定
    const fetchData = async () => {
      // APIコール等のロジックをここに実装
      const dummyData: NutritionData = {
        calories: 2000,
        protein: 75,
        carbs: 250,
        fat: 65,
        fiber: 25,
        vitamins: { A: 80, C: 90, D: 70, E: 85 },
        minerals: { calcium: 75, iron: 80, magnesium: 70 }
      };
      setNutritionData(dummyData);

      const dummyGoals: Goal[] = [
        { type: 'カロリー', target: 2200, current: 2000 },
        { type: 'タンパク質', target: 80, current: 75 },
        { type: '食物繊維', target: 30, current: 25 },
      ];
      setGoals(dummyGoals);
    };

    fetchData();
  }, []);

  if (!nutritionData) {
    return <div className="text-center p-4">データを読み込んでいます...</div>;
  }

  const macroNutrientData = {
    labels: ['タンパク質', '炭水化物', '脂質'],
    datasets: [
      {
        data: [nutritionData.protein, nutritionData.carbs, nutritionData.fat],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  const vitaminMineralData = {
    labels: [...Object.keys(nutritionData.vitamins), ...Object.keys(nutritionData.minerals)],
    datasets: [
      {
        label: '摂取率 (%)',
        data: [...Object.values(nutritionData.vitamins), ...Object.values(nutritionData.minerals)],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const evaluateNutrition = () => {
    const issues = [];
    if (nutritionData.protein < 50) issues.push('タンパク質が不足しています');
    if (nutritionData.fiber < 20) issues.push('食物繊維が不足しています');
    if (nutritionData.fat > 70) issues.push('脂質の摂取が多すぎます');
    return issues;
  };

  const nutritionIssues = evaluateNutrition();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">栄養分析</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">マクロ栄養素バランス</h3>
          <div className="w-full h-64">
            <Doughnut data={macroNutrientData} />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">ビタミン・ミネラル摂取率</h3>
          <div className="w-full h-64">
            <Bar
              data={vitaminMineralData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">栄養評価と改善提案</h3>
        {nutritionIssues.length > 0 ? (
          <ul className="list-disc pl-5">
            {nutritionIssues.map((issue, index) => (
              <li key={index} className="text-red-600 flex items-center">
                <AlertTriangle className="mr-2" size={20} />
                {issue}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-600 flex items-center">
            <CheckCircle className="mr-2" size={20} />
            栄養バランスは良好です。このまま続けましょう！
          </p>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">目標と進捗</h3>
        {goals.map((goal, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-medium">{goal.type}</h4>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {Math.round((goal.current / goal.target) * 100)}%
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1 flex items-center">
              <TrendingUp className="mr-1" size={16} />
              目標: {goal.target} / 現在: {goal.current}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionAnalyzer;