import { supabase } from "@/utils/supabase/SetupSupabase";
import { TJoinedOrderItems } from "@/utils/supabase/Types";

import { FC, useEffect, useState } from "react";
interface OrderListProps {
  refreshOrder: boolean;
}

const OrderList: FC<OrderListProps> = ({ refreshOrder }) => {
  const [orders, setOrders] = useState<TJoinedOrderItems[] | []>([]);

  async function getOrderList() {
    const { error, data } = await supabase
      .from("order_items")
      .select(`*,orders(customer_id)`);

    if (error) {
      console.error(error);
    }
    if (data) {
      setOrders(data);
    }
  }
  useEffect(() => {
    getOrderList();
  }, [refreshOrder]);
  return (
    <>
      <h2 className="font-semibold text-xl text-yellow-100">
        Order List ({orders.length})
      </h2>
      <ul>
        {orders?.map((singleOrder: TJoinedOrderItems) => (
          <li key={singleOrder.id}>
            <span className="font-bold text-green-200">Order id:</span>{" "}
            {singleOrder.id}{" "}
            <span className="font-bold text-green-200">Customer id:</span>{" "}
            {singleOrder.orders.customer_id}{" "}
            <span className="font-bold text-green-200">Ordered at:</span>{" "}
            {singleOrder.ordered_at}{" "}
            <span className="font-bold text-green-200">Item Name:</span>{" "}
            {singleOrder.item_name}{" "}
            <span className="font-bold text-green-200">Price:</span>{" "}
            {singleOrder.item_price}{" "}
            <span className="font-bold text-green-200">Quantity:</span>{" "}
            {singleOrder.item_quantity}{" "}
          </li>
        ))}
      </ul>
    </>
  );
};

export default OrderList;
