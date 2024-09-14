import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, useActionData } from "@remix-run/react";
import { z } from "zod";

const Schema = z.object({
  email: z.string({ required_error: "Votre email est requis." }).email({ message: "Email invalide." }),
  name: z.string({ required_error: "Votre nom est requis."}).min(3, { message: "Votre nom doit contenir au moins 3 caractères." }),
});

export const action = async ({ request }: ActionFunctionArgs) => {
 const formData = await request.formData();
 const object = Object.fromEntries(formData);
 const { email } = Schema.parse(object);
  console.log(email);

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