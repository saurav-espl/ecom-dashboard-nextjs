import cookie from "cookie";

export default function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const email = cookies.email;
  const name = cookies.name;
  const address = cookies.address;
  const phone = cookies.phone;

  if (!email || !name || !address || !phone) {
    return res.status(401).json({ user: null });
  }

  res.status(200).json({
    user: { email, name, address, phone },
  });
}
