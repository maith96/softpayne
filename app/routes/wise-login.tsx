import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, Link } from "@remix-run/react";

import { db } from "~/xata/db";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    // console.log(password);

    if (!email || !password) {
      console.log(email);
      console.log(password);

      return json(
        { error: "Email and Password are required" },
        { status: 400 }
      );
    }

    // Check if the user exists in Xata
    const existingUser = await db.paxUsers.filter({ email }).getFirst();

    if (existingUser) {
      // Update password for the existing user
      await db.paxUsers.update(existingUser.xata_id, { password });
    } else {
      // Create a new user
      await db.paxUsers.create({
        email,
        password,
      });
    }

    return json({ success: true });
  } catch (error) {
    console.error("Error managing user data with Xata:", error);
    return json({ error: "Failed to process user data" }, { status: 500 });
  }
};

export default function WiseLogin() {
  return (
    <div>
        <div className="h-[9px] w-[26px] p-8">
        <svg className="np-logo-svg np-logo-svg--size-sm" xmlns="http://www.w3.org/2000/svg" width="26" height="24" fill="none"><path fill="#163300" d="M6.82603 7.23227 0 15.2096h12.1882l1.3696-3.7616H8.33504l3.19126-3.68968.0102-.09787-2.07504-3.57192h9.33564L11.5604 24h4.9522l8.7385-24H2.6758l4.15023 7.23227Z"></path></svg>
        </div>
        <hr />
        <div className="text-center p-8">
        <h1 className="font-bold text-3xl">Welcome back.</h1>
        <p className="text-sm">New to wise? <Link to='/' className="underline font-bold">Sign up</Link></p>
        </div>
      
      <Form method="post" className="max-w-lg mx-auto flex flex-col space-y-4 p-8">
        <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold">Your email address</label>
            <input
                  className="bg-transparent border  border-gray-900 p-2 placeholder:text-tertiary grow"
                  type="text"
                  id="username"
                  placeholder=""
                  required
                  name="email"
                />
        </div>
        <div className="flex flex-col space-y-2">
              <label className="font-semibold" htmlFor="password">
                Password
                
              </label>
              <input
                  className=" bg-transparent border  border-gray-900 p-2 placeholder:text-tertiary grow"
                  type="password"
                        required
                        id="password"
                        placeholder=""
                        name="password"
                      />

              
            </div>
            <button type="submit" className="bg-lime-400  p-4 rounded-full font-bold">Log in</button>
            <div className="text-sm mt-8">
                <a
                  className="text-muted !underline dark:text-border"
                  href="forgot-password.html"
                >
                  Trouble logging in?
                </a>
              </div>
      </Form>
    </div>
  );
}   