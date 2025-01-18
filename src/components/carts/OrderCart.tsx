import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { TCart } from "@/utils/supabase/Types";
import { supabase } from "@/utils/supabase/SetupSupabase";

const OrderCart = () => {
  async function orderCart(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { cart_id } = e.currentTarget;

    const cart: Pick<TCart, "customer_id"> = {
      customer_id: cart_id.value,
    };

    const { error } = await supabase.from("carts").insert(cart);

    if (error) {
      console.error(error);
      alert("this customer ID already exists or does not exist 🙏");
    }

    cart_id.value = "";
  }

  return (
    <>
      <h2 className="font-semibold text-xl text-yellow-100">Order Cart </h2>
      <form onSubmit={orderCart} className="flex gap-4">
        <Input
          name="cart_id"
          type="number"
          placeholder="Cart ID"
          min={0}
          className="w-40"
        />
        <Button variant="outline">Order</Button>
      </form>
    </>
  );
};

export default OrderCart;
