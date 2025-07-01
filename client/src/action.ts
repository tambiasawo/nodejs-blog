export const createNewUser = async (userDetails: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE}/v1/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(userDetails),
      }
    );
    const user = await response.json();
    if (!user) return { error: "No user created" };
    return user;
  } catch (e) {
    console.error(e);
  }
};

export const signInUser = async (userDetails: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE}/v1/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(userDetails),
      }
    );
    const user = await response.json();
    if (!user) return { error: "No user created" };
    return user;
  } catch (e) {
    console.error(e);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE}/v1/auth/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      }
    );
    const user = await response.json();
    if (!user) return { error: "No user found" };
    return user;
  } catch (e) {
    console.error(e);
  }
};

export const signOut = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}/v1/auth/signout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const addPost = async (post: { title: string; body: string }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE}/v1/posts/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(post),
      }
    );
    const data = await response.json();
    if (!data) return { error: "No post created" };
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const searchPost = async (searchTerm: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE}/v1/posts/search`,
      {
        method: "POST",
        credentials: "include", // send cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTerm }), // wrap in an object
      }
    );
    if (!response.ok) {
      throw new Error(
        `Server error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.error("searchPost failed:", err);
    return { error: err instanceof Error ? err.message : "Unexpected error" };
  }
};
