export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_actions: {
        Row: {
          action_type: string
          admin_id: string
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          target_id: string | null
          target_type: string
        }
        Insert: {
          action_type: string
          admin_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          target_id?: string | null
          target_type: string
        }
        Update: {
          action_type?: string
          admin_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          target_id?: string | null
          target_type?: string
        }
        Relationships: []
      }
      categorias_doacoes: {
        Row: {
          cor: string | null
          created_at: string
          descricao: string | null
          icone: string | null
          id: string
          nome: string
        }
        Insert: {
          cor?: string | null
          created_at?: string
          descricao?: string | null
          icone?: string | null
          id?: string
          nome: string
        }
        Update: {
          cor?: string | null
          created_at?: string
          descricao?: string | null
          icone?: string | null
          id?: string
          nome?: string
        }
        Relationships: []
      }
      doacoes_fisicas_novas: {
        Row: {
          avaliacao_beneficiario: number | null
          avaliacao_doador: number | null
          beneficiario_id: string | null
          categoria_id: string | null
          comentario_avaliacao: string | null
          created_at: string
          data_disponivel: string | null
          data_entrega: string | null
          data_reserva: string | null
          descricao: string | null
          doador_id: string | null
          endereco_coleta: string | null
          endereco_entrega: string | null
          fotos: string[] | null
          id: string
          localizacao: string | null
          observacoes: string | null
          observacoes_entrega: string | null
          quantidade: number
          status: string
          tipo_entrega: string | null
          titulo: string
          unidade: string
          updated_at: string
        }
        Insert: {
          avaliacao_beneficiario?: number | null
          avaliacao_doador?: number | null
          beneficiario_id?: string | null
          categoria_id?: string | null
          comentario_avaliacao?: string | null
          created_at?: string
          data_disponivel?: string | null
          data_entrega?: string | null
          data_reserva?: string | null
          descricao?: string | null
          doador_id?: string | null
          endereco_coleta?: string | null
          endereco_entrega?: string | null
          fotos?: string[] | null
          id?: string
          localizacao?: string | null
          observacoes?: string | null
          observacoes_entrega?: string | null
          quantidade?: number
          status?: string
          tipo_entrega?: string | null
          titulo: string
          unidade?: string
          updated_at?: string
        }
        Update: {
          avaliacao_beneficiario?: number | null
          avaliacao_doador?: number | null
          beneficiario_id?: string | null
          categoria_id?: string | null
          comentario_avaliacao?: string | null
          created_at?: string
          data_disponivel?: string | null
          data_entrega?: string | null
          data_reserva?: string | null
          descricao?: string | null
          doador_id?: string | null
          endereco_coleta?: string | null
          endereco_entrega?: string | null
          fotos?: string[] | null
          id?: string
          localizacao?: string | null
          observacoes?: string | null
          observacoes_entrega?: string | null
          quantidade?: number
          status?: string
          tipo_entrega?: string | null
          titulo?: string
          unidade?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "doacoes_fisicas_novas_beneficiario_fkey"
            columns: ["beneficiario_id"]
            isOneToOne: false
            referencedRelation: "doadores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doacoes_fisicas_novas_categoria_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_doacoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doacoes_fisicas_novas_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_doacoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doacoes_fisicas_novas_doador_fkey"
            columns: ["doador_id"]
            isOneToOne: false
            referencedRelation: "doadores"
            referencedColumns: ["id"]
          },
        ]
      }
      doadores: {
        Row: {
          created_at: string | null
          documento: string | null
          email: string | null
          endereco: string | null
          id: string
          nome: string
          telefone: string | null
        }
        Insert: {
          created_at?: string | null
          documento?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome: string
          telefone?: string | null
        }
        Update: {
          created_at?: string | null
          documento?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome?: string
          telefone?: string | null
        }
        Relationships: []
      }
      eventos: {
        Row: {
          created_at: string | null
          data_fim: string | null
          data_inicio: string | null
          id: string
          link: string | null
          resumo: string | null
          titulo: string
        }
        Insert: {
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          id?: string
          link?: string | null
          resumo?: string | null
          titulo: string
        }
        Update: {
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          id?: string
          link?: string | null
          resumo?: string | null
          titulo?: string
        }
        Relationships: []
      }
      mensagens_doacoes: {
        Row: {
          created_at: string
          destinatario_id: string
          doacao_id: string
          id: string
          lida: boolean | null
          mensagem: string
          remetente_id: string
        }
        Insert: {
          created_at?: string
          destinatario_id: string
          doacao_id: string
          id?: string
          lida?: boolean | null
          mensagem: string
          remetente_id: string
        }
        Update: {
          created_at?: string
          destinatario_id?: string
          doacao_id?: string
          id?: string
          lida?: boolean | null
          mensagem?: string
          remetente_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mensagens_doacoes_doacao_id_fkey"
            columns: ["doacao_id"]
            isOneToOne: false
            referencedRelation: "doacoes_fisicas_novas"
            referencedColumns: ["id"]
          },
        ]
      }
      notificacoes_doacoes: {
        Row: {
          created_at: string
          doacao_id: string | null
          id: string
          lida: boolean | null
          mensagem: string
          tipo: string
          titulo: string
          usuario_id: string
        }
        Insert: {
          created_at?: string
          doacao_id?: string | null
          id?: string
          lida?: boolean | null
          mensagem: string
          tipo: string
          titulo: string
          usuario_id: string
        }
        Update: {
          created_at?: string
          doacao_id?: string | null
          id?: string
          lida?: boolean | null
          mensagem?: string
          tipo?: string
          titulo?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notificacoes_doacoes_doacao_id_fkey"
            columns: ["doacao_id"]
            isOneToOne: false
            referencedRelation: "doacoes_fisicas_novas"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          aprovado: boolean | null
          created_at: string | null
          depoimento: string
          id: string
          nome: string
        }
        Insert: {
          aprovado?: boolean | null
          created_at?: string | null
          depoimento: string
          id?: string
          nome: string
        }
        Update: {
          aprovado?: boolean | null
          created_at?: string | null
          depoimento?: string
          id?: string
          nome?: string
        }
        Relationships: []
      }
      voluntarios: {
        Row: {
          ativo: boolean | null
          email: string | null
          id: string
          nascimento: string | null
          nome: string | null
          role: string | null
          senha_hash: string | null
          telefone: string | null
          theme: string | null
        }
        Insert: {
          ativo?: boolean | null
          email?: string | null
          id?: string
          nascimento?: string | null
          nome?: string | null
          role?: string | null
          senha_hash?: string | null
          telefone?: string | null
          theme?: string | null
        }
        Update: {
          ativo?: boolean | null
          email?: string | null
          id?: string
          nascimento?: string | null
          nome?: string | null
          role?: string | null
          senha_hash?: string | null
          telefone?: string | null
          theme?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_estatisticas_impacto: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      has_admin_access: {
        Args: { user_id?: string }
        Returns: boolean
      }
      is_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
      is_own_profile: {
        Args: { user_id?: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
