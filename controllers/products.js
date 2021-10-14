const db = require("../db/connection");

exports.createProduct = async (req, res) => {
  const { name, description, price, tags } = req.body;
  const userId = req.user;

  await db.query(
    "INSERT INTO products (name, description, price, tags, user_id, created_date) VALUES($1, $2,$3, $4, $5, NOW())",
    [name, description, price, tags, userId]
  );
  res.json("Succesfully created product");

  try {
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllProductsFromUser = async (req,res)=>{
    const {userId} = req.params

    try {
        const {rows} = await db.query("SELECT * FROM products INNER JOIN people USING(user_id) WHERE products.user_id = $1", [userId])
        res.json(rows[0])
    } catch (error) {
        res.status(500).json(error)
    }

}

exports.getAllProductsByName = async (req, res)=>{
    const {name} = req.body

    try {
        const {rows} = await db.query(`SELECT * FROM products WHERE name LIKE '%${name}%'`) //Not a safe way to execute?
        const output = !rows[0] ? "No results" : rows[0]
        res.json(output)
    } catch (error) {
        res.status(500).json(error)
    }
}