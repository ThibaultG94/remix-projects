import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, useActionData } from "@remix-run/react";

export const action = async ({ request }: ActionFunctionArgs) => {
 const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  console.log({ name, email });
  const isValid = email === "tibo@guilty.fr";
  return json({ isValid });
};

export default function Index() {
  const data = useActionData<typeof action>();
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="leading text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Welcome to Remix!
      </h1>
      <Form className="text-white flex flex-col gap-2" method="POST">
        <input type="email" className="text-black px-1" name="email" placeholder="Email" />
        {data?.isValid === false && (
          <p className="text-red-500">Email invalide</p>
        )}
        <input type="text" className="text-black px-1" name="name" minLength={3} placeholder="Nom" />
        <button className="border bg-teal-300 rounded text-black p-1">Soumettre</button>
      </Form>
    </div>
  );
}