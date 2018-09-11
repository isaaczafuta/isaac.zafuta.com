const getUser = async () => {
  const response = await fetch("/api/user", {
    credentials: 'same-origin',
  });
  if (!response.ok) {
    throw Error(response.status.toString());
  } else {
    return await response.json();
  }
};


const signIn = async (username, password) => {
  const formData = new FormData();
  formData.set("username", username);
  formData.set("password", password);

  const response = await fetch("/api/signin", {
    credentials: "same-origin",
    method: "post",
    body: formData
  });
  if (!response.ok) {
    throw Error(response.status.toString());
  } else {
    return await response.json();
  }
};


const signOut = async () => {
  return await fetch("/api/signout", {
    method: "post",
    credentials: "same-origin",
  });
};


export {
  getUser,
  signIn,
  signOut,
}
