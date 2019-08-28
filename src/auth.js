const { auth } = require("./firebase");

module.exports = method => async (req, res) => {
  const { email, password } = req.body;
  console.debug(`handling ${method} ${email}`);

  try {
    const { user } = await auth[
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
