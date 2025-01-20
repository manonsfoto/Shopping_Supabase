import { supabase } from "@/utils/supabase/SetupSupabase";
import { TJoinedCartItems } from "@/utils/supabase/Types";
import { FC, useEffect, useState } from "react";
interface CartItemsListProps {
  refreshCartItems: boolean;
  refreshOrder: boolean;
}
const CartItemsList: FC<CartItemsListProps> = ({
  refreshCartItems,
  refreshOrder,
}) => {
  const [cartItems, setCartItems] = useState<TJoinedCartItems[] | []>([]);
  async function getCartItemsList() {
    const { error, data } = await supabase
      .from("cart_items")
      .select(`*,items(name,price)`);

    if (error) {
      console.error(error);
    }
    if (data) {
      setCartItems(data);
    }
  }
  useEffect(() => {
    getCartItemsList();
  }, [refreshCartItems, refreshOrder]);

  return (
    <>
      <h2 className="font-semibold text-xl text-yellow-100">
        Cart Items List ({cartItems.length})
      </h2>
      <ul>
        {cartItems?.map((singleCartItems: TJoinedCartItems) => (
          <li key={singleCartItems.cart_id + singleCartItems.item_id}>
            <span className="font-bold text-green-200">Cart id:</span>{" "}
            {singleCartItems.cart_id}{" "}
            <span className="font-bold text-green-200">Customer id:</span>{" "}
            {singleCartItems.customer_id}{" "}
            <span className="font-bold text-green-200">Item id:</span>{" "}
            {singleCartItems.item_id}{" "}
            <span className="font-bold text-green-200">Item Name:</span>{" "}
            {singleCartItems.items.name}{" "}
            <span className="font-bold text-green-200">Item Price:</span>{" "}
            {singleCartItems.items.price} €{" "}
            <span className="font-bold text-green-200">Quantity:</span>{" "}
            {singleCartItems.quantity}{" "}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CartItemsList;
