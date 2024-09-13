export type Goal =  {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Progress = {
    id: string;
    goalId: string;
    percentage: number;
    createdAt: Date;
    updatedAt: Date;
}