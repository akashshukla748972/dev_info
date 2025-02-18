import bcrypt from "bcrypt";

export const genHash = async (password) => {
  try {
    if (!password) {
      console.error("Password not found");
      return null;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error("Error while generating hash");
  }
};
