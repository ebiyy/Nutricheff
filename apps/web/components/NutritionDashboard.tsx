'use client';

import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Utensils, Zap, Award } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

type NutrientData = {
  name: string;
  actual: number;
  recommended: number;
};

const NutritionDashboard = () => {
  const [nutrients, setNutrients] = useState<NutrientData[]>([]);
  const [balanceScore, setBalanceScore] = useState(0);

  useEffect(() => {
    // 実際のアプリケーションでは、APIからデータを取得します
    const mockData: NutrientData[] = [
      { name: 'タンパク質', actual: 65, recommended: 70 },
      { name: '炭水化物', actual: 250, recommended: 300 },
      { name: '脂質', actual: 55, recommended: 60 },
      { name: '食物繊維', actual: 18, recommended: 20 },
    ];
    setNutrients(mockData);

    // 栄養バランススコアの計算（簡易版）
    const score = mockData.reduce((acc, curr) => {
      return acc + (curr.actual / curr.recommended) * 25;
    }, 0);
    setBalanceScore(Math.min(Math.round(score), 100));
  }, []);

  const barChartData = {
    labels: nutrients.map(n => n.name),
    datasets: [
      {
        label: '実際の摂取量',
        data: nutrients.map(n => n.actual),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: '推奨摂取量',
        data: nutrients.map(n => n.recommended),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  const doughnutData = {
    labels: ['バランススコア', '改善の余地'],
    datasets: [
      {
        data: [balanceScore, 100 - balanceScore],
        backgroundColor: ['#4CAF50', '#FFA000'],
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">栄養ダッシュボード</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Utensils className="mr-2" />
            栄養素別摂取量
          </h3>
          <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Zap className="mr-2" />
            栄養バランススコア
          </h3>
          <div className="flex justify-center items-center h-64">
            <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
          <p className="text-center mt-4 text-lg font-semibold">
            スコア: {balanceScore}/100
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Award className="mr-2" />
          改善提案
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          {nutrients.map(nutrient => (
            nutrient.actual < nutrient.recommended && (
              <li key={nutrient.name} className="text-gray-700">
                {nutrient.name}の摂取量を増やしましょう。目標まであと{nutrient.recommended - nutrient.actual}gです。
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NutritionDashboard;