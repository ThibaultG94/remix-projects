import { Form } from "@remix-run/react";

export const action = async () => {
 return null;
};

export default function Index() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="leading text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Welcome to Remix!
      </h1>
      <Form className="text-white" method="POST">
        <input type="text" className="text-black" name="name" minLength={3} />
        <button className="border bg-teal-300 rounded text-black p-1 ml-2">Soumettre</button>
      </Form>
    </div>
  );
}