import AddCart from "./components/carts/AddCart";
import CartList from "./components/carts/CartList";
import FillCart from "./components/carts/FillCart";
import OrderCart from "./components/carts/OrderCart";
import AddCustomer from "./components/customers/AddCustomer";
import CustomerList from "./components/customers/CustomerList";
import AddItem from "./components/items/AddItem";
import ItemList from "./components/items/ItemList";
import OrderList from "./components/orders/OrderList";

function App() {
  return (
    <>
      <section>
        <h1>Customers</h1>
        <AddCustomer />
        <CustomerList />
      </section>
      <section>
        <h1>Items</h1>
        <AddItem />
        <ItemList />
      </section>
      <section>
        <h1>Carts</h1>
        <AddCart />
        <CartList />
        <FillCart />
        <OrderCart />
      </section>
      <section>
        <h1>Orders</h1>
        <OrderList />
      </section>
    </>
  );
}

export default App;
