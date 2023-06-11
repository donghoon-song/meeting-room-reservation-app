export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      reservations: {
        Row: {
          end_time: string
          id: string
          room_id: string
          start_time: string
          status: string
          user_id: string
        }
        Insert: {
          end_time?: string
          id?: string
          room_id: string
          start_time?: string
          status: string
          user_id: string
        }
        Update: {
          end_time?: string
          id?: string
          room_id?: string
          start_time?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_room_id_fkey"
            columns: ["room_id"]
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      rooms: {
        Row: {
          capacity: number
          description: string | null
          id: string
          location: string | null
          name: string
        }
        Insert: {
          capacity: number
          description?: string | null
          id?: string
          location?: string | null
          name: string
        }
        Update: {
          capacity?: number
          description?: string | null
          id?: string
          location?: string | null
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string
          id: string
          name: string
        }
        Insert: {
          email: string
          id: string
          name: string
        }
        Update: {
          email?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
