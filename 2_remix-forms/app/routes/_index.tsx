import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, useActionData } from "@remix-run/react";
import { z } from "zod";

const Schema = z.object({
  email: z.string({ required_error: "Votre email est requis." }).email({ message: "Email invalide." }),
  name: z.string({ required_error: "Votre nom est requis."}).min(3, { message: "Votre nom doit contenir au moins 3 caractères." }),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: Schema })

  // Send the submisiion back to the client if the status is not successful
  if (submission.status !== "success") return json({ result: submission.reply() });
  const { email, name } = submission.value;
  console.log({ email, name });

  return json({ result: submission.reply() });
};

export default function Index() {
  const data = useActionData<typeof action>();
  const [form, fields] = useForm({
    constraint: getZodConstraint(Schema),
    lastResult: data?.result,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: Schema,
      })
    },
    shouldValidate: "onSubmit",
  })

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="leading text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Welcome to Remix!
      </h1>
      <Form className="text-white flex flex-col gap-2" method="POST" {...getFormProps(form)} >
        <input className="text-black px-1" {...getInputProps(fields.email, {
          type: "email",
        })} placeholder="Email" />
        <div className="text-red-600">{fields.email.errors}</div>
        <input className="text-black px-1" {...getInputProps(fields.name, {
          type: "text",
        })} placeholder="Nom" />
         <div className="text-red-600">{fields.name.errors}</div>
        <button className="border bg-teal-300 rounded text-black p-1">Soumettre</button>
        <div className="text-red-600">{form.errors}</div>
      </Form>
    </div>
  );
}