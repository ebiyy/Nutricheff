'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import GoalSetting from '@/components/GoalSetting'
import ProgressTracker from '@/components/ProgressTracker'
import { Goal, Progress } from '@/types'

export default function GoalsPage() { 
  const [goals, setGoals] = useState<Goal[]>([])
  const [progress, setProgress] = useState<Progress[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGoalsAndProgress = async () => {
      try {
        // API経由でデータを取得
        const goalsResponse = await fetch('/api/goals')
        const progressResponse = await fetch('/api/progress')

        if (!goalsResponse.ok || !progressResponse.ok) {
          throw new Error('データの取得に失敗しました')
        }

        const goalsData = await goalsResponse.json()
        const progressData = await progressResponse.json()

        setGoals(goalsData)
        setProgress(progressData)
      } catch (err) {
        setError('データの読み込み中にエラーが発生しました')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGoalsAndProgress()
  }, [])

  const handleGoalUpdate = async (updatedGoal: Goal) => {
    try {
      const response = await fetch('/api/goals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGoal),
      })

      if (!response.ok) {
        throw new Error('目標の更新に失敗しました')
      }

      setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal))
    } catch (err) {
      setError('目標の更新中にエラーが発生しました')
      console.error(err)
    }
  }

  const getEncouragement = (progress: number) => {
    if (progress >= 90) return '素晴らしい進捗です！目標達成まであと一歩です！'
    if (progress >= 70) return '順調に進んでいます。このまま頑張りましょう！'
    if (progress >= 50) return '半分以上達成しました。あきらめずに続けましょう！'
    return '一歩ずつ前進しています。小さな成功を積み重ねていきましょう！'
  }

  if (isLoading) return <div className="flex justify-center items-center h-screen">読み込み中...</div>
  if (error) return <div className="text-red-500 text-center">{error}</div>

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">目標設定と進捗管理</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">目標設定</h2>
            <GoalSetting goals={goals} onUpdateGoal={handleGoalUpdate} />
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">進捗状況</h2>
            <ProgressTracker progress={progress} />
          </section>
        </div>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">励ましメッセージ</h2>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-lg">{getEncouragement(progress[0]?.percentage || 0)}</p>
          </div>
        </section>
      </main>
    </div>
  )
}