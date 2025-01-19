import { useState } from "react";
import AddCart from "./components/carts/AddCart";
import CartItemsList from "./components/carts/CartItemsList";
import CartList from "./components/carts/CartList";
import FillCart from "./components/carts/FillCart";
import OrderCart from "./components/carts/OrderCart";
import AddCustomer from "./components/customers/AddCustomer";
import CustomerList from "./components/customers/CustomerList";
import AddItem from "./components/items/AddItem";
import ItemList from "./components/items/ItemList";
import OrderList from "./components/orders/OrderList";

function App() {
  const [refreshCustomers, setRefreshCustomers] = useState(false);
  const [refreshItems, setRefreshItems] = useState(false);
  const [refreshCarts, setRefreshCarts] = useState(false);
  const [refreshCartItems, setRefreshCartItems] = useState(false);
  const [refreshOrder, setRefreshOrder] = useState(false);

  return (
    <main className="flex flex-col gap-5 p-10">
      <section className="p-5 border-solid border-2 border-stone-200 rounded-2xl flex flex-col gap-4">
        <h1 className="font-bold text-2xl mb-5">Customers</h1>
        <AddCustomer setRefreshCustomers={setRefreshCustomers} />
        <CustomerList refreshCustomers={refreshCustomers} />
      </section>
      <section className="p-5 border-solid border-2 border-stone-200 rounded-2xl flex flex-col gap-4">
        <h1 className="font-bold text-2xl mb-5">Items</h1>
        <AddItem setRefreshItems={setRefreshItems} />
        <ItemList refreshItems={refreshItems} />
      </section>
      <section className="p-5 border-solid border-2 border-stone-200 rounded-2xl flex flex-col gap-4">
        <h1 className="font-bold text-2xl mb-5">Carts</h1>
        <AddCart setRefreshCarts={setRefreshCarts} />
        <CartList refreshCarts={refreshCarts} />
        <FillCart setRefreshCartItems={setRefreshCartItems} />
        <CartItemsList refreshCartItems={refreshCartItems} />
        <OrderCart setRefreshOrder={setRefreshOrder} />
      </section>
      <section className="p-5 border-solid border-2 border-stone-200 rounded-2xl flex flex-col gap-4">
        <h1 className="font-bold text-2xl mb-5">Orders</h1>
        <OrderList refreshOrder={refreshOrder} />
      </section>
    </main>
  );
}

export default App;
