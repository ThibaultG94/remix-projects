import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type User = {
    id: number;
    name: string;
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const userId = params.userId;
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = await response.json() as User;
    return user;
};

const UserPage = () => {
    const user = useLoaderData<typeof loader>();
    return (
        <div>
            <ul className="text-xl">
                {user.name}
            </ul>
        </div>
    );
};

export default UserPage;