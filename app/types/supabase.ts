export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      albums: {
        Row: {
          created_at: string;
          id: number;
          release_date: string | null;
          title: string | null;
          user_id: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          release_date?: string | null;
          title?: string | null;
          user_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          release_date?: string | null;
          title?: string | null;
          user_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "albums_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      liked_albums: {
        Row: {
          album_id: number | null;
          created_at: string;
          id: number;
          user_id: number | null;
        };
        Insert: {
          album_id?: number | null;
          created_at?: string;
          id?: number;
          user_id?: number | null;
        };
        Update: {
          album_id?: number | null;
          created_at?: string;
          id?: number;
          user_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "liked_albums_album_id_fkey";
            columns: ["album_id"];
            isOneToOne: false;
            referencedRelation: "albums";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "liked_albums_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      liked_songs: {
        Row: {
          created_at: string;
          id: number;
          song_id: number | null;
          user_id: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          song_id?: number | null;
          user_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          song_id?: number | null;
          user_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "liked_songs_song_id_fkey";
            columns: ["song_id"];
            isOneToOne: false;
            referencedRelation: "songs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "liked_songs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      songs: {
        Row: {
          album_id: number | null;
          created_at: string;
          id: number;
          title: string | null;
        };
        Insert: {
          album_id?: number | null;
          created_at?: string;
          id?: number;
          title?: string | null;
        };
        Update: {
          album_id?: number | null;
          created_at?: string;
          id?: number;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "songs_album_id_fkey";
            columns: ["album_id"];
            isOneToOne: false;
            referencedRelation: "albums";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string | null;
          first_name: string | null;
          id: number;
          last_name: string | null;
          pass_hash: string | null;
          username: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          id?: number;
          last_name?: string | null;
          pass_hash?: string | null;
          username?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          id?: number;
          last_name?: string | null;
          pass_hash?: string | null;
          username?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
