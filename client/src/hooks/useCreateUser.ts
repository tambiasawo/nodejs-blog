import { useCallback, useState, useEffect } from "react";

const createUser = (userDetails: {
  signUpEmail: string;
  signUpPassword: string;
  name: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [newUser, setNewUser] = useState(null);

  

  return { newUser, loading, error };
};

export default createUser;
