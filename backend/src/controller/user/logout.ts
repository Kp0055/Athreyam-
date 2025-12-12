
//logout  api 


 const logout = (req: any, res: any) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out' });
};

export default logout
