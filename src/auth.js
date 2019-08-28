const { firebase } = require("./firebase");

exports.createHandler = method => async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user } = await firebase
      .auth()
      [
        method === "create"
          ? "createUserWithEmailAndPassword"
          : "signInWithEmailAndPassword"
      ](email, password);

    res.json({ token: await user.getIdToken() });
  } catch (error) {
    console.error(error);

    res.json({ error });
  }
};
