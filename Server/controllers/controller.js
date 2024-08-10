const Home = (req, res) => {
  res.status(200).json({ Message: "This is Home Page." });
};

export { Home };
