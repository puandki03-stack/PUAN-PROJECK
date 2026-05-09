'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Strict interface for the Todo item being created
export interface TodoInsertData {
  task: string
  user_id: string
  status: 'pending' | 'completed'
}

export async function createTodo(task: string) {
  try {
    const supabase = await createClient()

    // Retrieve user and check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      throw new Error('Unauthorized: You must be logged in to create a task.')
    }

    const todoData: TodoInsertData = {
      task,
      user_id: user.id,
      status: 'pending'
    }

    // Insert data to the 'todos' table
    const { error: insertError } = await supabase
      .from('todos')
      .insert([todoData])

    if (insertError) {
      console.error('Error inserting todo:', insertError)
      throw new Error(`Failed to create task: ${insertError.message}`)
    }

    // Revalidate dashboard so fresh data is loaded
    revalidatePath('/dashboard')

    return { success: true, message: 'Task created successfully' }
  } catch (error: any) {
    console.error('Server Action Error - createTodo:', error)
    return { success: false, error: error.message || 'An unexpected error occurred' }
  }
}
