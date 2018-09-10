const getUser = async () => {
  const response = await fetch("/api/user", {
    credentials: 'same-origin',
  });
  if (!response.ok) {
    throw Error(response.status);
  } else {
    return await response.json();
  }
};

const signIn = async (username, password) => {
  const formData = new FormData();
  formData.set("username", username);
  formData.set("password", password);

  const response = await fetch("/api/signin", {
    credentials: 'same-origin',
    method: "post",
    body: formData
  });
  if (!response.ok) {
    throw Error(response.status);
  } else {
    return await response.json();
  }
};



export {
  getUser,
  signIn,
}
