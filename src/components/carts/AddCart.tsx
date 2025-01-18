import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { TCart } from "@/utils/supabase/Types";
import { supabase } from "@/utils/supabase/SetupSupabase";

const AddCart = () => {
  async function handleNewCart(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { customerId } = e.currentTarget;

    const cart: Pick<TCart, "customer_id"> = {
      customer_id: customerId.value,
    };

    const { error } = await supabase.from("carts").insert(cart);

    if (error) {
      console.error(error);
      alert("this customer ID already exists or does not exist 🙏");
    }

    customerId.value = "";
  }
  return (
    <>
      <h2 className="font-semibold text-xl text-yellow-100">Add Cart</h2>{" "}
      <form onSubmit={handleNewCart} className="flex gap-4">
        <Input
          name="customerId"
          type="number"
          placeholder="Customer ID"
          min={0}
          className="w-40"
        />
        <Button variant="outline">Add</Button>
      </form>
    </>
  );
};

export default AddCart;
