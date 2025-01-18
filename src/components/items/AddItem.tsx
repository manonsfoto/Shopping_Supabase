import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { TItem } from "@/utils/supabase/Types";
import { supabase } from "@/utils/supabase/SetupSupabase";

const AddItem = () => {
  async function handleNewItem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { itemName, description, price } = e.currentTarget;

    const item: Pick<TItem, "name" | "description" | "price"> = {
      name: itemName.value,
      description: description.value,
      price: price.value,
    };

    const { error } = await supabase.from("items").insert(item);

    if (error) {
      console.error(error);
      alert("this item name already exists 🙏");
    }

    itemName.value = "";
    description.value = "";
    price.value = "";
  }
  return (
    <>
      <h2 className="font-semibold text-xl text-yellow-100">Add Item</h2>
      <form onSubmit={handleNewItem} className="flex gap-4">
        <Input
          name="itemName"
          type="text"
          placeholder="Item Name"
          className="w-40"
        />
        <Input
          name="description"
          type="text"
          placeholder="Description"
          className="w-40"
        />
        <Input
          name="price"
          type="number"
          placeholder="Price"
          min={0}
          className="w-40"
        />
        <Button variant="outline">Add</Button>
      </form>
    </>
  );
};

export default AddItem;
