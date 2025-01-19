import { supabase } from "@/utils/supabase/SetupSupabase";
import { TCustomer } from "@/utils/supabase/Types";
import { FC, useEffect, useState } from "react";

interface CustomerListProps {
  refreshCustomers: boolean;
}

const CustomerList: FC<CustomerListProps> = ({ refreshCustomers }) => {
  const [customers, setCustomers] = useState<TCustomer[] | []>([]);
  async function getCustomerList() {
    const { error, data } = await supabase.from("customers").select();

    if (error) {
      console.error(error);
    }
    if (data) {
      setCustomers(data);
    }
  }
  useEffect(() => {
    getCustomerList();
  }, [refreshCustomers]);

  return (
    <>
      <h2 className="font-semibold text-xl text-yellow-100">
        Customer List ({customers.length})
      </h2>
      <ul>
        {customers?.map((singleCustomer: TCustomer) => (
          <li key={singleCustomer.id}>
            <span className="font-bold text-green-200">id:</span>{" "}
            {singleCustomer.id}{" "}
            <span className="font-bold text-green-200">full name:</span>{" "}
            {singleCustomer.first_name} {singleCustomer.last_name}{" "}
            <span className="font-bold text-green-200">email:</span>{" "}
            {singleCustomer.email}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CustomerList;
