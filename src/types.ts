export type Priority = 'low' | 'medium' | 'high'

export interface Todo {
  id: string
  text: string
  isCompleted: boolean
  createdAt: Date
  priority: Priority
}
