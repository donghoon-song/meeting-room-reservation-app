import { Database } from "./supabase";

export type Reservation = Database["public"]["Tables"]["reservations"]["Row"];
