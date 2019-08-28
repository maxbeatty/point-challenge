const store = require("./store");

// tests are sequential given singleton of `store`
const userUID = "abc123";

test("returns null if no messages", () => {
  expect(store.getMessagesForUser(userUID)).toBe(null);
});

test("createMessage", async () => {
  const msg = await store.createMessage(userUID, "testing");
  expect(msg.status).toBe("testing");
});

test("returns messages for user", () => {
  const msgs = store.getMessagesForUser(userUID);
  expect(msgs).not.toBe(null);
  expect(msgs).toHaveLength(1);
});

test("editMessage", async () => {
  const msg = await store.createMessage(userUID, "alpha");
  const edited = store.editMessage(userUID, msg.uid, "bravo");
  expect(edited.status).toBe("bravo");
  expect(edited.updatedAt.getTime()).toBeGreaterThan(
    edited.createdAt.getTime()
  );
});
