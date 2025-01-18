import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { TCartItems } from "@/utils/supabase/Types";
import { supabase } from "@/utils/supabase/SetupSupabase";

const FillCart = () => {
  async function handleExistedCart(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { cart_id, item_id, customer_id, quantity } = e.currentTarget;

    const cartItems: TCartItems = {
      cart_id: cart_id.value,
      item_id: item_id.value,
      customer_id: customer_id.value,
      quantity: quantity.value,
    };

    const { error } = await supabase.from("cart_items").insert(cartItems);

    if (error) {
      console.error(error);
    }

    cart_id.value = "";
    item_id.value = "";
    customer_id.value = "";
    quantity.value = "";
  }

  return (
    <>
      <h2 className="font-semibold text-xl text-yellow-100">Fill Cart</h2>
      <form onSubmit={handleExistedCart} className="flex gap-4">
        <Input
          name="cart_id"
          type="number"
          placeholder="Cart id"
          min={0}
          className="w-40"
        />
        <Input
          name="customer_id"
          type="number"
          placeholder="Customer id"
          min={0}
          className="w-40"
        />{" "}
        <Input
          name="item_id"
          type="number"
          placeholder="Item id"
          min={0}
          className="w-40"
        />
        <Input
          name="quantity"
          type="number"
          placeholder="quantity"
          min={0}
          className="w-40"
        />
        <Button variant="outline">Fill</Button>
      </form>
    </>
  );
};

export default FillCart;
