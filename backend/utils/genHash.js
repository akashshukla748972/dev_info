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
    return null;
  }
};

export const verifyPassword = async (password, hash) => {
  try {
    if (!password || !hash) {
      console.error("Password not found");
      return null;
    }

    const verifyHash = await bcrypt.compare(password, hash);
    return verifyHash;
  } catch (error) {
    console.error("Error while verifying hash password");
    return null;
  }
};
