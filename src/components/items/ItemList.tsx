import { supabase } from "@/utils/supabase/SetupSupabase";
import { TItem } from "@/utils/supabase/Types";
import { useEffect, useState } from "react";

const ItemList = () => {
  const [items, setItems] = useState<TItem[] | []>([]);
  async function getItemList() {
    const { error, data } = await supabase.from("items").select();

    if (error) {
      console.error(error);
    }
    if (data) {
      setItems(data);
    }
  }
  useEffect(() => {
    getItemList();
  }, [items]);

  return (
    <>
      <h2 className="font-semibold text-xl text-yellow-100">
        Item List ({items.length})
      </h2>
      <ul>
        {items?.map((singleItem: TItem) => (
          <li key={singleItem.id}>
            <span className="font-bold text-green-200">id:</span>{" "}
            {singleItem.id}{" "}
            <span className="font-bold text-green-200">item name:</span>{" "}
            {singleItem.name}{" "}
            <span className="font-bold text-green-200">price:</span>{" "}
            {singleItem.price} €{" "}
            <span className="font-bold text-green-200">description:</span>{" "}
            {singleItem.description}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ItemList;
