import { supabase } from "@/utils/supabase/SetupSupabase";
import { TCart } from "@/utils/supabase/Types";
import { FC, useEffect, useState } from "react";
interface CartListProps {
  refreshCarts: boolean;
}
const CartList: FC<CartListProps> = ({ refreshCarts }) => {
  const [carts, setCarts] = useState<TCart[] | []>([]);
  async function getCartList() {
    const { error, data } = await supabase.from("carts").select();

    if (error) {
      console.error(error);
    }
    if (data) {
      setCarts(data);
    }
  }
  useEffect(() => {
    getCartList();
  }, [refreshCarts]);

  return (
    <>
      <h2 className="font-semibold text-xl text-yellow-100">
        Cart List ({carts.length})
      </h2>
      <ul>
        {carts?.map((singleCart: TCart) => (
          <li key={singleCart.id}>
            <span className="font-bold text-green-200">id:</span>{" "}
            {singleCart.id}{" "}
            <span className="font-bold text-green-200">customer id:</span>{" "}
            {singleCart.customer_id}{" "}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CartList;
