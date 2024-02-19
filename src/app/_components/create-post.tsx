"use client";

// Importing the useRouter hook from Next.js for navigation
import { useRouter } from "next/navigation";
// Importing the useState hook from React for state management
import { useState } from "react";

// Importing the api object from the tRPC React library, this for client-side queries and mutations
import { api } from "~/trpc/react";

// This is a React component for creating a new post
export function CreatePost() {
  // Using the useRouter hook to get the router object
  const router = useRouter();
  // Using the useState hook to manage the name of the new post
  const [name, setName] = useState("");

  // Using the create mutation from the post API
  // When the mutation is successful, it refreshes the page and resets the name
  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  // The component returns a form for creating a new post
  return (
    <form
      // When the form is submitted, it prevents the default form submission behavior
      // and calls the createPost mutation with the current name
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        // When the input changes, it updates the name
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        // The button is disabled while the createPost mutation is loading
        disabled={createPost.isLoading}
      >
        {/* The button text changes based on whether the createPost mutation is loading */}
        {createPost.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}