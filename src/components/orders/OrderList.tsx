import { supabase } from "@/utils/supabase/SetupSupabase";
import { TOrder } from "@/utils/supabase/Types";

import { useEffect, useState } from "react";

const OrderList = () => {
  const [orders, setOrders] = useState<TOrder[] | []>([]);
  async function getOrderList() {
    const { error, data } = await supabase.from("orders").select();

    if (error) {
      console.error(error);
    }
    if (data) {
      setOrders(data);
      console.log("Order Data:", data);
    }
  }
  useEffect(() => {
    getOrderList();
  }, [setOrders]);
  return (
    <>
      <h2 className="font-semibold text-xl text-yellow-100">
        Order List ({orders.length})
      </h2>
      <ul>
        {orders?.map((singleOrder: TOrder) => (
          <li key={singleOrder.id}>
            <span className="font-bold text-green-200">order id:</span>{" "}
            {singleOrder.id}{" "}
            <span className="font-bold text-green-200">customer id:</span>{" "}
            {singleOrder.customer_id}{" "}
            <span className="font-bold text-green-200">ordered at:</span>{" "}
            {singleOrder.ordered_at}{" "}
            <span className="font-bold text-green-200">item name:</span>{" "}
            {singleOrder.ordered_at}{" "}
            <span className="font-bold text-green-200">quantity:</span>{" "}
            {singleOrder.ordered_at}{" "}
            <span className="font-bold text-green-200">price:</span>{" "}
            {singleOrder.ordered_at}{" "}
          </li>
        ))}
      </ul>
    </>
  );
};

export default OrderList;
