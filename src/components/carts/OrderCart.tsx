import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FC, FormEvent } from "react";
import { supabase } from "@/utils/supabase/SetupSupabase";
interface OrderCartProps {
  setRefreshOrder: React.Dispatch<React.SetStateAction<boolean>>;
}
const OrderCart: FC<OrderCartProps> = ({ setRefreshOrder }) => {
  async function orderCart(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { customer_id } = e.currentTarget;

    try {
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({ customer_id: customer_id.value })
        .select("id")
        .single();

      if (orderError) throw orderError;
      const newOrderId = orderData.id;

      const { data: cartItems, error: cartError } = await supabase
        .from("cart_items")
        .select("*, items(name, price)")
        .eq("customer_id", customer_id.value);

      if (cartError) throw cartError;

      const orderItemsData = cartItems.map((item) => ({
        order_id: newOrderId,
        item_name: item.items.name,
        item_price: item.items.price,
        item_quantity: item.quantity,
      }));

      const { error: orderItemsError } = await supabase
        .from("order_items")
        .insert(orderItemsData);

      if (orderItemsError) throw orderItemsError;

      const { error: emptyCartError } = await supabase
        .from("carts")
        .delete()
        .eq("customer_id", customer_id.value);

      if (emptyCartError) throw emptyCartError;

      console.log("Order placed successfully!");
    } catch (error) {
      console.error("Error processing order:", error);
    } finally {
      customer_id.value = "";
      setRefreshOrder((prev) => !prev);
    }
  }

  return (
    <>
      <h2 className="font-semibold text-xl text-yellow-100">Order Cart </h2>
      <form onSubmit={orderCart} className="flex gap-4">
        <Input
          name="customer_id"
          type="number"
          placeholder="Customer ID"
          min={0}
          className="w-40"
        />
        <Button variant="outline">Order</Button>
      </form>
    </>
  );
};

export default OrderCart;
