import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryFunctionContext,
} from "@tanstack/react-query";
import { api } from "@/lib/api";

/* ---------- Tipos ---------- */
export interface Evento {
  id: string;
  titulo: string;
  resumo?: string | null;
  link?: string | null;
  data_inicio?: string | null;
  data_fim?: string | null;
}

type NewEvent = Omit<Evento, "id">;

/* ---------- Queries ---------- */

export const useEvents = () =>
  useQuery<Evento[]>({
    queryKey: ["events"],
    queryFn: () => api<Evento[]>("/events"),
  });

export const useEvent = (id: string | undefined) =>
  useQuery<Evento>({
    queryKey: ["events", id],
    queryFn: ({ queryKey }: QueryFunctionContext) =>
      api<Evento>(`/events/${queryKey[1]}`),
    enabled: Boolean(id),
  });

/* ---------- Mutations ---------- */

export const useAddEvent = () => {
  const qc = useQueryClient();
  return useMutation<Evento, Error, NewEvent>({
    mutationFn: (body) =>
      api<Evento>("/events", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
};

export const useUpdateEvent = () => {
  const qc = useQueryClient();
  return useMutation<Evento, Error, { id: string } & Partial<NewEvent>>({
    mutationFn: ({ id, ...rest }) =>
      api<Evento>(`/events/${id}`, {
        method: "PUT",
        body: JSON.stringify(rest),
      }),
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: ["events", id] });
      qc.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useDeleteEvent = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) =>
      api<void>(`/events/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
};
