import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FC, FormEvent } from "react";
import { TCustomer } from "@/utils/supabase/Types";
import { supabase } from "@/utils/supabase/SetupSupabase";

interface AddCustomerProps {
  setRefreshCustomers: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCustomer: FC<AddCustomerProps> = ({ setRefreshCustomers }) => {
  async function handleNewCustomer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { firstName, lastName, email } = e.currentTarget;

    const customer: Pick<TCustomer, "first_name" | "last_name" | "email"> = {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
    };

    const { error } = await supabase.from("customers").insert(customer);

    if (error) {
      console.error(error);
      alert("this email already exists 🙏");
    }

    firstName.value = "";
    lastName.value = "";
    email.value = "";

    setRefreshCustomers((prev) => !prev);
  }

  return (
    <>
      <h2 className="font-semibold text-xl text-yellow-100">Add Customer</h2>
      <form onSubmit={handleNewCustomer} className="flex gap-4">
        <Input
          name="firstName"
          type="text"
          placeholder="First Name"
          className="w-40"
        />
        <Input
          name="lastName"
          type="text"
          placeholder="Last Name"
          className="w-40"
        />
        <Input name="email" type="email" placeholder="Email" className="w-40" />
        <Button variant="outline">Add</Button>
      </form>
    </>
  );
};

export default AddCustomer;
