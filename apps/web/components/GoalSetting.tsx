import {  Goal } from '@/types'



type Props = {
  goals: Goal[]
  onUpdateGoal: (updatedGoal: Goal) => Promise<void>
};

export default function GoalSetting({ goals,onUpdateGoal }: Props) {
  return <div>GoalSetting</div>;
}

