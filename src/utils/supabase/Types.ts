import { Tables } from "./TypeSupabase";

export type TCustomer = Tables<"customers">;
export type TItem = Tables<"items">;
export type TCart = Tables<"carts">;
export type TOrder = Tables<"orders">;
export type TCartItems = Tables<"cart_items">;
export type TOrderItems = Tables<"order_items">;

export type TJoinedCartItems = TCartItems & {
  items: Pick<TItem, "name" | "price">;
};
