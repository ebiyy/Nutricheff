// lib/supabase.ts

import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// 認証関連の関数
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// 食事記録のCRUD操作
export const getMeals = async (userId: string) => {
  const { data, error } = await supabase
    .from('meals')
    .select('*')
    .eq('user_id', userId)
  return { data, error }
}

export const addMeal = async (meal: any) => {
  const { data, error } = await supabase
    .from('meals')
    .insert(meal)
  return { data, error }
}

export const updateMeal = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('meals')
    .update(updates)
    .eq('id', id)
  return { data, error }
}

export const deleteMeal = async (id: string) => {
  const { error } = await supabase
    .from('meals')
    .delete()
    .eq('id', id)
  return { error }
}

// 食材在庫のCRUD操作
export const getIngredients = async (userId: string) => {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .eq('user_id', userId)
  return { data, error }
}

export const addIngredient = async (ingredient: any) => {
  const { data, error } = await supabase
    .from('ingredients')
    .insert(ingredient)
  return { data, error }
}

export const updateIngredient = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('ingredients')
    .update(updates)
    .eq('id', id)
  return { data, error }
}

export const deleteIngredient = async (id: string) => {
  const { error } = await supabase
    .from('ingredients')
    .delete()
    .eq('id', id)
  return { error }
}

// ユーザー情報のCRUD操作
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error }
}

export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
  return { data, error }
}

// その他の必要なCRUD操作をここに追加