import { z } from "zod";

const userSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    name: z.string(),
});

const usersSchema = z.array(userSchema);

export const getUsers = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    const json = await data.json();
    return usersSchema.parse(json);
};