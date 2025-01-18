import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { supabase } from "@/utils/supabase/SetupSupabase";
import { TOrder } from "@/utils/supabase/Types";

const OrderCart = () => {
  const [orders, setOrders] = useState<TOrder[] | []>([]);
  function orderCart(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { customer_id } = e.currentTarget;

    async function addOrders() {
      const { error, data } = await supabase
        .from("orders")
        .insert({ customer_id: customer_id.value })
        .select();

      if (error) {
        console.error(error);
      }
      if (data) {
        setOrders(data);
      }
    }

    async function emptyCart() {
      await supabase
        .from("cart_items")
        .delete()
        .eq("customer_id", customer_id.value);
    }

    // async function addOrderItems() {
    //   if (orders) {
    //     const { error } = await supabase
    //       .from("order_items")
    //       .insert({
    //         order_id: orders[0].id,
    //         item_name: "bose",
    //         item_price: "777",
    //         item_quantity: "2",
    //       });

    //     if (error) {
    //       console.error(error);
    //     }
    //   }
    // }

    addOrders();
    // addOrderItems();
    emptyCart();
    customer_id.value = "";
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
